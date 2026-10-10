import { Scissors } from 'lucide-react'
import { equipe } from '@/data/barbearia'

export function Equipe() {
  return (
    <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
      {equipe.map((p) => (
        <div key={p.nome} className="bg-card p-6 md:p-8">
          <Scissors className="size-5 text-madeira-forte" aria-hidden="true" strokeWidth={1.5} />
          <h3 className="mt-4 font-display text-xl font-medium tracking-tight">{p.nome}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.nota}</p>
        </div>
      ))}
    </div>
  )
}
