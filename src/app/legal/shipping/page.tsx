import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Versandinformationen | SamAira Creations",
  description: "Informationen zu Versandarten, -kosten und -zeiten bei SamAira Creations",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Versandinformationen
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Alles Wichtige rund um Lieferung und Versand
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Versandarten
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>Wir versenden mit folgenden Partnern:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Deutsche Post / DHL</strong> - Standardversand innerhalb Deutschlands</li>
                    <li><strong>DHL International</strong> - Versand in die EU</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Versandkosten
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <div className="p-6 rounded-[16px] bg-[var(--surface-card)]">
                    <div className="flex justify-between items-center mb-3">
                      <span>Deutschland (ab €50 Bestellwert)</span>
                      <span className="font-semibold text-[var(--brand-teal)]">KOSTENLOS</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span>Deutschland (unter €50)</span>
                      <span>€4,90</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span>EU-Länder</span>
                      <span>€8,90</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Schweiz & andere Länder</span>
                      <span>€14,90</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Lieferzeiten
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Die Lieferung erfolgt in der Regel innerhalb von <strong>3-5 Werktagen</strong> nach 
                    Zahlungseingang.
                  </p>
                  <div className="p-6 rounded-[16px] bg-[var(--surface-card)]">
                    <table className="w-full text-left text-sm">
                      <tbody className="text-[var(--body)]">
                        <tr className="border-b border-[var(--hairline-soft)]">
                          <td className="py-3">Bestellung bis 14:00 Uhr (Mo-Fr)</td>
                          <td className="py-3 text-right font-medium">Versand am selben Tag</td>
                        </tr>
                        <tr className="border-b border-[var(--hairline-soft)]">
                          <td className="py-3">Deutschland</td>
                          <td className="py-3 text-right font-medium">2-3 Werktage</td>
                        </tr>
                        <tr className="border-b border-[var(--hairline-soft)]">
                          <td className="py-3">EU</td>
                          <td className="py-3 text-right font-medium">3-5 Werktage</td>
                        </tr>
                        <tr>
                          <td className="py-3">Außerhalb EU</td>
                          <td className="py-3 text-right font-medium">5-10 Werktage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Sendungsverfolgung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Sobald Ihre Bestellung versandt wird, erhalten Sie per WhatsApp eine Nachricht 
                    mit dem Tracking-Code und einem Link zur Sendungsverfolgung.
                  </p>
                  <p>
                    Sie können Ihre Sendung auch direkt auf 
                    <a href="https://www.dhl.de" className="text-[var(--brand-teal)] underline ml-1">
                      www.dhl.de
                    </a>
                    verfolgen.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Verpackung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Alle unsere Produkte werden sorgfältig verpackt in wiederverwertbaren Materialien 
                    versendet. Unsere Verpackungen sind plastikfrei und FSC-zertifiziert.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Kontakt
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Bei Fragen zum Versand kontaktieren Sie uns jederzeit über WhatsApp:<br />
                    E-Mail: hello@samaira-creations.de
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
