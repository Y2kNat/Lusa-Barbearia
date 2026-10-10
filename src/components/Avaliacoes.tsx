import { Star } from 'lucide-react'
import { avaliacoes } from '@/data/avaliacoes'
import { barbearia } from '@/data/barbearia'

export function Avaliacoes() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-6">
        <span className="font-display text-5xl font-semibold tabular-nums md:text-6xl">
          {barbearia.nota.toFixed(1).replace('.', ',')}
        </span>
        <span className="flex items-center gap-1" aria-label={`${barbearia.nota} de 5 estrelas`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" strokeWidth={1.5} />
          ))}
        </span>
        <span className="text-sm text-muted-foreground">
          {barbearia.totalAvaliacoes} avaliações no Google
        </span>
      </div>

      <ul className="mt-2">
        {avaliacoes.map((a) => (
          <li key={a.autor} className="border-b border-border py-6 last:border-0">
            <blockquote className="measure font-display text-lg leading-snug tracking-tight md:text-xl">
              <p>{a.texto}</p>
            </blockquote>
            <p className="mt-3 font-data text-xs text-muted-foreground">
              {a.autor}, {a.quando}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
