import { Clock, CalendarOff } from 'lucide-react'
import { horarios } from '@/data/barbearia'
import { feriadoDe, minutos } from '@/lib/feriados'

type Horario = (typeof horarios)[number]

function proximoAberto(indice: number, incluirHoje: boolean): Horario | null {
  for (let k = 0; k < 7; k++) {
    const idx = (indice + k) % 7
    const h = horarios[idx]
    if (h.fecha === null) continue
    if (k === 0 && !incluirHoje) continue
    return h
  }
  return null
}

function avaliar() {
  const agora = new Date()
  const indice = (agora.getDay() + 6) % 7
  const hoje = horarios[indice]
  const agoraMin = agora.getHours() * 60 + agora.getMinutes()

  const proximo = proximoAberto(indice + 1, true)
  const quandoProximo = proximo ? `Abre ${proximo.dia.toLowerCase()} às ${proximo.abre}` : 'Fale com a gente pelo WhatsApp'

  if (feriadoDe(agora)) {
    return { aberto: false, texto: 'Fechado hoje, é feriado', detalhe: 'Confirme pelo WhatsApp antes de vir', icone: 'feriado' as const }
  }

  if (hoje.fecha !== null && agoraMin >= minutos(hoje.abre) && agoraMin < minutos(hoje.fecha)) {
    return { aberto: true, texto: 'Aberto agora', detalhe: `Fecha às ${hoje.fecha}`, icone: 'relogio' as const }
  }

  const depoisDoHorario = hoje.fecha === null || agoraMin >= minutos(hoje.fecha)
  const seguinte = depoisDoHorario
    ? proximoAberto(indice + 1, true)
    : hoje

  return {
    aberto: false,
    texto: 'Fechado agora',
    detalhe: seguinte
      ? `Abre ${seguinte.dia.toLowerCase()} às ${seguinte.abre}`
      : quandoProximo,
    icone: 'relogio' as const,
  }
}

export function StatusAberto({ className = '', onDark = false }: { className?: string; onDark?: boolean }) {
  const s = avaliar()
  const Icon = s.icone === 'feriado' ? CalendarOff : Clock

  return (
    <div
      className={[
        'inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm',
        onDark ? 'text-primary-foreground/90' : 'text-muted-foreground',
        className,
      ].join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-1.5 font-medium">
        <Icon className="size-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
        <span>{s.texto}</span>
      </span>
      <span aria-hidden="true" className={onDark ? 'text-primary-foreground/40' : 'text-border'}>
        |
      </span>
      <span>{s.detalhe}</span>
    </div>
  )
}
