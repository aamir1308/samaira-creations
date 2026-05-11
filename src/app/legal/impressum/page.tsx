import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Impressum | SamAira Creations",
  description: "Legal information and contact details for SamAira Creations",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Impressum
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Legal information according to German law
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p><strong>SamAira Creations</strong></p>
                  <p>Musterstraße 123</p>
                  <p>12345 Musterstadt</p>
                  <p>Deutschland</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Kontakt
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>E-Mail: hello@samaira-creations.de</p>
                  <p>WhatsApp: +49 176 323 33257</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>[Name des Verantwortlichen]</p>
                  <p>Musterstraße 123</p>
                  <p>12345 Musterstadt</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Handelsregister
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>Registergericht: Amtsgericht Musterstadt</p>
                  <p>Registernummer: HRB 123456</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Umsatzsteuer-Identifikationsnummer
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>DE 123456789</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Streitschlichtung
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr/" className="text-[var(--brand-teal)] ml-1 underline">
                      https://ec.europa.eu/consumers/odr/
                    </a>
                  </p>
                  <p>
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                  </p>
                  <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                    Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Haftung für Inhalte
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach 
                    den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter 
                    jedoch nicht unter Umständen verpflichtet, übermittelte oder gespeicherte fremde Informationen 
                    zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p>
                    Unsere Verpflichtung zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                    allgemeinen Gesetzen aufgrund von Gerichtsentscheidungen bleibt hiervon unberührt.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Haftung für Links
                </h2>
                <div className="text-[var(--body)] space-y-2">
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
