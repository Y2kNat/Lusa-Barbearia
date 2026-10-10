import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const TOTAL = 240
const PX_POR_FRAME = 22
const EAGER = 12
const AHEAD = 26
const ATRAS = 8
const BASE = 1.02

type Set = 'desktop' | 'mobile'

const cache = new Map<string, HTMLImageElement>()
const pending = new Set<string>()
let redraw = () => {}

function caminho(i: number, set: Set) {
  return `/frames-${set}/frame_${String(i + 1).padStart(3, '0')}.webp`
}

function pedir(i: number, set: Set) {
  const chave = `${set}/${i}`
  if (cache.has(chave) || pending.has(chave)) return
  pending.add(chave)
  const im = new Image()
  im.decoding = 'async'
  im.onload = () => {
    cache.set(chave, im)
    pending.delete(chave)
    redraw()
  }
  im.onerror = () => {
    pending.delete(chave)
  }
  im.src = caminho(i, set)
}

function escolherSet() {
  return window.innerWidth < 768 ? 'mobile' : 'desktop'
}

export function HeroCanvas({ children, className }: { children?: ReactNode; className?: string }) {
  const seqRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const barraRef = useRef<HTMLDivElement>(null)
  const progresso = useRef(0)
  const entrada = useRef(0)
  const alvo = useRef(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let set: Set = escolherSet()
    let W = 0
    let H = 0

    const desenhar = (i: number) => {
      const im = cache.get(`${set}/${i}`)
      if (!im || !W || !H) return false
      const iw = im.naturalWidth
      const ih = im.naturalHeight
      const escala = Math.max(W / iw, H / ih)
      const dw = iw * escala
      const dh = ih * escala
      ctx.drawImage(im, Math.round((W - dw) / 2), Math.round((H - dh) / 2), dw, dh)
      return true
    }

    const pintar = () => {
      const t = reduzido ? 0 : Math.max(0, Math.min(TOTAL - 1, Math.round(progresso.current * (TOTAL - 1))))
      if (t === alvo.current) return
      if (desenhar(t)) {
        alvo.current = t
        return
      }
      for (let k = t - 1; k >= Math.max(0, t - 60); k--) {
        if (desenhar(k)) {
          alvo.current = t
          return
        }
      }
      for (let k = t + 1; k < Math.min(TOTAL, t + AHEAD); k++) {
        if (desenhar(k)) {
          alvo.current = t
          return
        }
      }
    }

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      alvo.current = -1
      pintar()
    }

    redraw = pintar


    const proximo = new Set<Set>([set])
    let frame = 0
    const enfileirar = () => {
      if (frame >= TOTAL) return
      pedir(frame, proximo.values().next().value as Set)
      frame++
    }
    for (let i = 0; i < EAGER; i++) enfileirar()

    let ocioso: number | undefined
    const preencher = () => {
      if (frame < TOTAL) {
        enfileirar()
        ocioso = window.requestIdleCallback
          ? window.requestIdleCallback(preencher, { timeout: 400 })
          : window.setTimeout(preencher, 16)
      }
    }
    preencher()

    // a altura precisa existir antes do ScrollTrigger medir start/end
    if (seqRef.current) {
      seqRef.current.style.height = reduzido ? '100vh' : `${TOTAL * PX_POR_FRAME}px`
    }
    progresso.current = 0

    // ScrollTrigger le o progresso cru; o video segue com inercia.
    // Lerp normalizado por tempo: responde no primeiro quadro (sem atraso de
    // partida no wheel) e desacelera, independente de 60 ou 144 Hz.
    const destino = { p: 0 }
    const st = reduzido
      ? null
      : ScrollTrigger.create({
          trigger: seqRef.current!,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            destino.p = self.progress
            if (barraRef.current) barraRef.current.style.width = `${self.progress * 100}%`
            const atual = Math.round(self.progress * (TOTAL - 1))
            for (let i = atual; i < Math.min(TOTAL, atual + AHEAD); i++) pedir(i, set)
            for (let i = Math.max(0, atual - ATRAS); i <= atual; i++) pedir(i, set)
          },
        })

    const FORCA = 0.18
    let anterior = performance.now()
    let laco = 0
    const passo = (agora: number) => {
      const dt = Math.min((agora - anterior) / 1000, 0.1)
      anterior = agora
      const k = 1 - Math.pow(1 - FORCA, dt * 60)
      const d = destino.p - progresso.current
      if (Math.abs(d) > 0.00004) {
        progresso.current += d * k
      } else {
        progresso.current = destino.p
      }
      // enquadramento: entrada suave no load + drift com o scroll
      const escala = BASE + (1 - entrada.current) * 0.05 + (1 - progresso.current) * 0.025
      canvas.style.transform = `scale(${escala.toFixed(4)})`
      pintar()
      laco = requestAnimationFrame(passo)
    }
    if (!reduzido) laco = requestAnimationFrame(passo)

    const abertura = reduzido
      ? null
      : gsap.fromTo(
          entrada,
          { current: 0 },
          { current: 1, duration: 2.4, ease: 'power2.out', overwrite: true },
        )

    ajustar()
    ScrollTrigger.refresh()

    const onResize = () => {
      const nova = escolherSet()
      if (nova !== set) {
        set = nova
        frame = 0
        proximo.clear()
        proximo.add(set)
        for (let i = 0; i < EAGER; i++) enfileirar()
        preencher()
      }
      ajustar()
      ScrollTrigger.refresh()
      progresso.current = progresso.current
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (ocioso) window.cancelIdleCallback?.(ocioso)
      cancelAnimationFrame(laco)
      abertura?.kill()
      st?.kill()
      redraw = () => {}
    }
  }, [])

  return (
    <div ref={seqRef} className={cn('relative', className)}>
      <div className="sticky top-0 h-screen overflow-hidden bg-couro">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover blur-[2px]"
        />
        <div className="hero-veil pointer-events-none absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="relative z-10 h-full">{children}</div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary-foreground/15">
          <div
            ref={barraRef}
            className="h-full bg-accent transition-[width] duration-75 ease-linear"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  )
}
