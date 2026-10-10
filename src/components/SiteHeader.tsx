import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Menu, X, MessageCircle } from 'lucide-react'
import logo from '@/assets/logo-lusa.png'
import { barbearia } from '@/data/barbearia'
import { Button } from '@/components/ui/Button'

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#visite', label: 'Visite' },
]

export function SiteHeader() {
  const [solido, setSolido] = useState(false)
  const [aberto, setAberto] = useState(false)
  const painelRef = useRef<HTMLDivElement>(null)
  const montado = useRef(false)
  const iconeMenu = useRef<SVGSVGElement>(null)
  const iconeX = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const aoRolar = () => setSolido(window.scrollY > 40)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // painel do menu mobile: anima altura e itens, e some quando fecha
  useEffect(() => {
    const painel = painelRef.current
    if (!painel) return

    const itens = painel.querySelectorAll('[data-item]')
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const primeiro = !montado.current
    montado.current = true

    if (primeiro) {
      gsap.set(painel, { clearProps: 'all', display: aberto ? 'block' : 'none' })
      gsap.set(itens, { clearProps: 'all' })
      return
    }

    if (reduzir) {
      gsap.set(painel, { clearProps: 'all', display: aberto ? 'block' : 'none' })
      gsap.set(itens, { clearProps: 'all' })
      return
    }

    gsap.killTweensOf([painel, itens])
    if (aberto) {
      gsap.set(painel, { display: 'block', height: 'auto' })
      const alvo = painel.offsetHeight
      gsap.fromTo(
        painel,
        { height: 0, opacity: 0 },
        { height: alvo, opacity: 1, duration: 0.32, ease: 'power3.out', onComplete: () => gsap.set(painel, { height: 'auto' }) },
      )
      gsap.fromTo(
        itens,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.34, ease: 'power3.out', stagger: 0.045, delay: 0.06 },
      )
    } else {
      const atual = painel.getBoundingClientRect().height
      gsap.fromTo(
        painel,
        { height: atual, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.22,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(painel, { display: 'none' }),
        },
      )
    }
  }, [aberto])

  // icone alterna com cross-fade e rotacao, sem pular de um estado ao outro
  useEffect(() => {
    const m = iconeMenu.current
    const x = iconeX.current
    if (!m || !x) return

    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzir) {
      gsap.set(m, { clearProps: 'all', opacity: aberto ? 0 : 1, scale: 1, rotate: 0 })
      gsap.set(x, { clearProps: 'all', opacity: aberto ? 1 : 0, scale: 1, rotate: 0 })
      return
    }

    const dur = 0.22
    gsap.to(m, {
      opacity: aberto ? 0 : 1,
      scale: aberto ? 0.6 : 1,
      rotate: aberto ? -60 : 0,
      duration: dur,
      ease: 'power2.inOut',
      overwrite: true,
    })
    gsap.to(x, {
      opacity: aberto ? 1 : 0,
      scale: aberto ? 1 : 0.6,
      rotate: aberto ? 0 : 60,
      duration: dur,
      ease: 'power2.inOut',
      overwrite: true,
    })
  }, [aberto])

  useEffect(() => {
    if (!aberto) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [aberto])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-general',
        solido || aberto ? 'bg-deep/95 backdrop-blur-md' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="container flex h-16 items-center gap-6 md:h-20 lg:gap-8">
        <a href="#topo" className="flex shrink-0 items-center" aria-label="Lusa Barbearia, ir ao topo">
          <img src={logo} alt="" width={44} height={44} className="size-10 md:size-11" decoding="async" />
        </a>

        <nav
          aria-label="Seções"
          className="hidden items-center gap-6 border-l border-primary-foreground/20 pl-8 lg:flex"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <a href={barbearia.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" strokeWidth={1.75} />
              Agendar no WhatsApp
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex size-11 items-center justify-center text-primary-foreground lg:hidden"
          >
            <span className="relative flex size-5 items-center justify-center">
              <Menu
                ref={iconeMenu}
                className="absolute size-5"
                aria-hidden="true"
                strokeWidth={1.75}
              />
              <X
                ref={iconeX}
                className="absolute size-5"
                aria-hidden="true"
                strokeWidth={1.75}
                style={{ opacity: 0 }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={painelRef}
        style={{ display: 'none' }}
        className="overflow-hidden border-t border-primary-foreground/10 bg-deep lg:hidden"
      >
        <nav aria-label="Seções" className="container flex flex-col py-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              data-item
              href={l.href}
              onClick={() => setAberto(false)}
              className="border-b border-primary-foreground/10 py-3.5 text-primary-foreground/85 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div data-item className="my-4">
            <Button asChild variant="accent" className="w-full">
              <a href={barbearia.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" strokeWidth={1.75} />
                Agendar no WhatsApp
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
