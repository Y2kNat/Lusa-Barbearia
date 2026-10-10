import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StatusAberto } from '@/components/StatusAberto'
import { barbearia } from '@/data/barbearia'

export function HeroContent() {
  const raiz = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el.querySelectorAll('[data-anim]'), { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.from('[data-anim]', {
        opacity: 0,
        y: 26,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.15,
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={raiz} className="container flex h-full flex-col justify-end pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="max-w-3xl">
        <h1
          data-anim
          className="font-display text-display-lg font-semibold text-primary-foreground"
        >
          Lusa Barbearia
        </h1>
        <p
          data-anim
          className="mt-4 font-display text-display-sm font-medium leading-[1.15] text-primary-foreground/95"
        >
          Corte afiado. Presença marcante
        </p>
        <p data-anim className="measure mt-4 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
          Seu estilo começa na cadeira.
        </p>
        <div data-anim className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild variant="accent" size="lg">
            <a href={barbearia.whatsapp} target="_blank" rel="noopener noreferrer">
              Agendar no WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href="#servicos">Ver preços</a>
          </Button>
        </div>
        <div data-anim className="mt-7">
          <StatusAberto onDark />
        </div>
      </div>

      <a
        href="#servicos"
        data-anim
        className="mt-10 inline-flex items-center gap-2 self-start text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
      >
        <ArrowDown className="size-4 animate-bounce" aria-hidden="true" strokeWidth={1.75} />
        Role para ver os preços
      </a>
    </div>
  )
}
