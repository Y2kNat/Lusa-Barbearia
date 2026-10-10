import { MapPin, Phone, MessageCircle, Car, CreditCard, Accessibility, Wifi, Award, Snowflake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { barbearia, horarios } from '@/data/barbearia'
import { Button } from '@/components/ui/Button'

const COMODIDADES: { texto: string; icone: LucideIcon }[] = [
  { texto: 'Estacionamento no local', icone: Car },
  { texto: 'Cartão de crédito', icone: CreditCard },
  { texto: 'Acessível para cadeirantes', icone: Accessibility },
  { texto: 'Wi-Fi', icone: Wifi },
  { texto: 'Programa de fidelidade', icone: Award },
  { texto: 'Sala climatizada', icone: Snowflake },
]

export function InfoLocal() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <h3 className="font-display text-lg font-medium tracking-tight">Onde ficamos</h3>
        <address className="mt-4 not-italic leading-relaxed text-muted-foreground">
          <p>{barbearia.endereco}</p>
          <p>
            {barbearia.cidade}, {barbearia.uf}, {barbearia.cep}
          </p>
        </address>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="sm">
            <a href={barbearia.maps} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-4" aria-hidden="true" strokeWidth={1.75} />
              Abrir no mapa
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={barbearia.telefoneLink}>
              <Phone className="size-4" aria-hidden="true" strokeWidth={1.75} />
              {barbearia.telefone}
            </a>
          </Button>
        </div>

        <h3 className="mt-12 font-display text-lg font-medium tracking-tight">Comodidades</h3>
        <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {COMODIDADES.map(({ texto, icone: Icon }) => (
            <li key={texto} className="flex items-start gap-2.5 text-[0.9375rem] text-muted-foreground">
              <Icon className="mt-0.5 size-4 shrink-0 text-madeira-forte" aria-hidden="true" strokeWidth={1.5} />
              {texto}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-lg font-medium tracking-tight">Quando abrimos</h3>
        <table className="mt-4 w-full border-collapse text-[0.9375rem]">
          <caption className="sr-only">Horário de funcionamento por dia da semana</caption>
          <tbody>
            {horarios.map((h) => {
              const fechado = h.fecha === null
              return (
                <tr key={h.dia} className="border-b border-border last:border-0">
                  <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                    {h.dia}
                  </th>
                  <td className={`py-3 text-right font-data text-sm tabular-nums ${fechado ? 'text-muted-foreground' : ''}`}>
                    {fechado ? 'Fechado' : `${h.abre} às ${h.fecha}`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Em feriado a loja fecha, mesmo com horário normal. Se vier no dia, mande mensagem antes que a
          gente confirma.
        </p>

        <Button asChild variant="accent" size="lg" className="mt-6 w-full sm:w-auto">
          <a href={barbearia.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" strokeWidth={1.75} />
            Chamar no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  )
}
