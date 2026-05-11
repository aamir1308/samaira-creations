import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "AGB | SamAira Creations",
  description: "Allgemeine Geschäftsbedingungen von SamAira Creations",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Allgemeine Geschäftsbedingungen
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Die folgenden Bedingungen regeln die Nutzung unseres Online-Angebots
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  1. Geltungsbereich
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die über 
                    unsere WhatsApp-Schnittstelle aufgegeben werden. Die Bestellung erfolgt durch sending 
                    einer WhatsApp-Nachricht an unsere angegebene Kontaktnummer.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  2. Vertragspartner
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Der Kaufvertrag kommt zustande mit:<br />
                    SamAira Creations<br />
                    Musterstraße 123<br />
                    12345 Musterstadt<br />
                    Deutschland
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  3. Bestellvorgang und Vertragsschluss
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Die Präsentation unserer Produkte auf der Website stellt kein rechtlich bindendes 
                    Angebot dar, sondern eine Aufforderung zur Bestellung.
                  </p>
                  <p>
                    Durch das Senden einer WhatsApp-Nachricht mit Ihrer Produktauswahl geben Sie ein 
                    verbindliches Angebot zum Abschluss eines Kaufvertrags ab.
                  </p>
                  <p>
                    Der Kaufvertrag kommt zustande, wenn wir Ihre Bestellung per WhatsApp bestätigen 
                    und die Zahlungsmodalitäten klären.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  4. Preise und Versandkosten
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Alle Preise sind in Euro (€) und enthalten die gesetzliche Mehrwertsteuer.
                  </p>
                  <p>
                    Zusätzlich zu den angegebenen Produktprecen können Versandkosten anfallen. 
                    Die Versandkosten werden Ihnen vor Abschluss der Bestellung mitgeteilt.
                  </p>
                  <p>
                    Für Bestellungen ab €50 innerhalb Deutschlands bieten wir kostenlosen Versand an.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  5. Zahlungsbedingungen
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>Die Zahlung erfolgt nach Absprache über:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Banküberweisung (SEPA)</li>
                    <li>PayPal</li>
                  </ul>
                  <p>
                    Die Zahlungsabwicklung erfolgt direkt mit uns nach Bestätigung Ihrer Bestellung.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  6. Lieferung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Die Lieferung erfolgt innerhalb von 3-5 Werktagen nach Zahlungseingang. 
                    Bei Bestellungen von Montag bis Freitag vor 14:00 Uhr erfolgt der Versand 
                    am selben Tag.
                  </p>
                  <p>
                    Die Lieferung erfolgt an die von Ihnen angegebene Adresse in Deutschland 
                    oder in der Europäischen Union.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  7. Widerrufsrecht
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag zu widerrufen.
                  </p>
                  <p>
                    Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen 
                    benannter Dritter die letzte Ware in Besitz genommen haben.
                  </p>
                  <p>
                    Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen 
                    Erklärung (z.B. WhatsApp-Nachricht, E-Mail) über Ihren Entschluss informieren.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  8. Gewährleistung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Es gilt das gesetzliche Mängelhaftungsrecht. Bei Mängeln haben Sie Anspruch auf 
                    Nacherfüllung (Neulieferung oder Nachbesserung) und bei erheblichen Mängeln 
                    auf Rücktritt oder Minderung.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  9. Haftung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Wir haften für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Bei leicht 
                    fahrlässiger Verletzung wesentlicher Vertragspflichten haften wir nur für den 
                    vertragstypischen, vorhersehbaren Schaden.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  10. Gerichtsstand
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Gerichtsstand ist Musterstadt, soweit Sie Kaufmann oder Kaufmann sind oder 
                    keinen allgemeinen Gerichtsstand in Deutschland haben.
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
