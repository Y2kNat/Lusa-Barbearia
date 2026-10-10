import { MessageCircle } from 'lucide-react'
import logo from '@/assets/logo-lusa.png'
import { barbearia } from '@/data/barbearia'
import { Button } from '@/components/ui/Button'

export function SiteFooter() {
  return (
    <footer className="bg-deep text-primary-foreground">
      <div className="container py-14 md:py-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <img src={logo} alt="Lusa Barbearia" width={96} height={96} className="size-24" decoding="async" />
          <div className="max-w-sm">
            <p className="font-display text-xl tracking-tight">Barbearia em Jardim Bonfiglioli</p>
            <address className="mt-3 not-italic leading-relaxed text-primary-foreground/70">
              {barbearia.endereco}
              <br />
              {barbearia.cidade}, {barbearia.uf}
            </address>
          </div>
          <Button asChild variant="accent">
            <a href={barbearia.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" strokeWidth={1.75} />
              Agendar no WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/55">
          <p>Seg a sex das 10:00 às 20:00, sábado das 09:00 às 18:00</p>
        </div>
      </div>
    </footer>
  )
}
