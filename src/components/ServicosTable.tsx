import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { servicos } from '@/data/servicos'
import { cn } from '@/lib/utils'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const DUR = { abrir: 0.34, fechar: 0.24 }

type ConteudoProps = { aberto: boolean; children: ReactNode }

const Conteudo = forwardRef<HTMLDivElement, ConteudoProps>(function Conteudo(
  { aberto, children },
  forwarded,
) {
  const el = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = el.current
    if (!node) return

    gsap.killTweensOf(node)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(node, { clearProps: 'all', display: aberto ? 'block' : 'none' })
      return
    }

    if (aberto) {
      gsap.set(node, { display: 'block' })
      gsap.fromTo(
        node,
        { height: 0, opacity: 0, y: -6 },
        {
          height: node.scrollHeight,
          opacity: 1,
          y: 0,
          duration: DUR.abrir,
          ease: 'power3.out',
          onComplete: () => gsap.set(node, { height: 'auto' }),
        },
      )
    } else {
      const atual = node.getBoundingClientRect().height
      gsap.fromTo(
        node,
        { height: atual, opacity: 1, y: 0 },
        {
          height: 0,
          opacity: 0,
          y: -6,
          duration: DUR.fechar,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(node, { display: 'none' }),
        },
      )
    }
  }, [aberto])

  return (
    <div ref={(node) => { el.current = node; if (typeof forwarded === 'function') forwarded(node); else if (forwarded) forwarded.current = node }} className="overflow-hidden" style={{ display: 'none' }}>
      <div className="pb-5 pr-8">{children}</div>
    </div>
  )
})

const Campos = forwardRef<HTMLButtonElement, { nome: string; duracao: number; preco: number; comChevron: boolean }>(
  function Campos({ nome, duracao, preco, comChevron }, _ref) {
    return (
      <>
        <span className="flex-1 font-display text-lg font-medium tracking-tight md:text-xl">{nome}</span>
        <span className="font-data text-sm tabular-nums text-muted-foreground">{duracao} min</span>
        <span className="font-data text-base font-medium tabular-nums">{brl.format(preco)}</span>
        <span className={cn('w-4 shrink-0 self-center', !comChevron && 'invisible')} aria-hidden="true">
          <ChevronDown
            className="size-4 text-muted-foreground transition-transform duration-300 ease-entering group-data-[state=open]:rotate-180"
            strokeWidth={1.75}
          />
        </span>
      </>
    )
  },
)

export function ServicosTable() {
  const [aberto, setAberto] = useState('')

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={aberto}
      onValueChange={setAberto}
      className="w-full max-w-4xl"
    >
      {servicos.map((s) =>
        s.descricao ? (
          <Accordion.Item key={s.nome} value={s.nome} className="border-b border-border">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-baseline gap-4 py-5 text-left transition-colors hover:text-deep md:gap-8">
                <Campos nome={s.nome} duracao={s.duracao} preco={s.preco} comChevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content forceMount asChild>
              <Conteudo aberto={aberto === s.nome}>
                <p className="measure text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {s.descricao}
                </p>
              </Conteudo>
            </Accordion.Content>
          </Accordion.Item>
        ) : (
          <div key={s.nome} className="flex items-baseline gap-4 border-b border-border py-5 md:gap-8">
            <Campos nome={s.nome} duracao={s.duracao} preco={s.preco} comChevron={false} />
          </div>
        ),
      )}
    </Accordion.Root>
  )
}
