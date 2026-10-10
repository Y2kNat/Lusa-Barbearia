import { SiteHeader } from '@/components/SiteHeader'
import { HeroCanvas } from '@/components/HeroCanvas'
import { HeroContent } from '@/components/HeroContent'
import { ServicosTable } from '@/components/ServicosTable'
import { Equipe } from '@/components/Equipe'
import { Avaliacoes } from '@/components/Avaliacoes'
import { InfoLocal } from '@/components/InfoLocal'
import { SiteFooter } from '@/components/SiteFooter'

export default function App() {
  return (
    <>
      <SiteHeader />
      <main id="topo">
        <HeroCanvas>
          <HeroContent />
        </HeroCanvas>

        <section id="servicos" className="border-b border-border bg-background py-20 md:py-28">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <h2 className="font-display text-display-sm font-semibold">Serviços e preços</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                Toque em um serviço para ver o que está incluído. A maioria leva menos de uma hora.
              </p>
            </div>
            <ServicosTable />
            <p className="mt-6 text-sm text-muted-foreground">
              Valores e durações conferidos na página da Booksy.
            </p>
          </div>
        </section>

        <section id="equipe" className="border-b border-border bg-card py-20 md:py-28">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <h2 className="font-display text-display-sm font-semibold">Quem corta</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                Dois barbeiros, e os clientes voltam falando o nome de um deles.
              </p>
            </div>
            <Equipe />
          </div>
        </section>

        <section id="avaliacoes" className="border-b border-border bg-card py-20 md:py-28">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <h2 className="font-display text-display-sm font-semibold">Quem já foi</h2>
            </div>
            <Avaliacoes />
          </div>
        </section>

        <section id="visite" className="bg-background py-20 md:py-28">
          <div className="container">
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-display-sm font-semibold">Onde estamos</h2>
            </div>
            <InfoLocal />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
