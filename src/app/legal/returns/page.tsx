import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Rückgabe & Erstattung | SamAira Creations",
  description: "Informationen zu Rückgabe und Erstattung bei SamAira Creations",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Rückgabe & Erstattung
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Unser einfaches Rückgabeverfahren für Sie
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Rückgaberecht
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Sie haben das Recht, binnen <strong>14 Tagen</strong> ohne Angabe von Gründen 
                    den Vertrag zu widerrufen.
                  </p>
                  <p>
                    Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen 
                    benannter Dritter die letzte Ware in Besitz genommen haben.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Rückgabebedingungen
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>Um die Rückgabe reibungslos abzuwickeln, bitten wir Sie:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Die Ware unbenutzt und in Originalverpackung zurückzusenden</li>
                    <li>Alle Etiketten und Tags zu belassen</li>
                    <li>Das Rückgabeformular auszufüllen (erhalten Sie mit Ihrer Bestellung)</li>
                    <li>Die Ware gut zu verpacken, um Transportschäden zu vermeiden</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Rückgabeprozess
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    So einfach funktioniert die Rückgabe:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-teal)] text-white flex items-center justify-center font-semibold flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium text-[var(--ink)]">WhatsApp-Nachricht senden</p>
                        <p className="text-sm text-[var(--muted)]">Kontaktieren Sie uns via WhatsApp mit Ihrer Bestellnummer</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-teal)] text-white flex items-center justify-center font-semibold flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium text-[var(--ink)]">Rücksendeetikett erhalten</p>
                        <p className="text-sm text-[var(--muted)]">Wir senden Ihnen ein kostenloses DHL-Rücksendeetikett</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-teal)] text-white flex items-center justify-center font-semibold flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium text-[var(--ink)]">Paket abgeben</p>
                        <p className="text-sm text-[var(--muted)]">Geben Sie das Paket bei einer DHL-Filiale ab</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-teal)] text-white flex items-center justify-center font-semibold flex-shrink-0">4</div>
                      <div>
                        <p className="font-medium text-[var(--ink)]">Erstattung erhalten</p>
                        <p className="text-sm text-[var(--muted)]">Die Erstattung erfolgt nach Wareneingang innerhalb von 5 Werktagen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Erstattung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Die Erstattung erfolgt auf dasselbe Zahlungsmittel, das Sie bei der Bezahlung 
                    verwendet haben:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>PayPal:</strong> Erstattung innerhalb von 2-3 Werktagen</li>
                    <li><strong>Banküberweisung:</strong> Erstattung innerhalb von 5 Werktagen</li>
                  </ul>
                  <p>
                    Nach Erhalt und Prüfung Ihrer Rücksendung erhalten Sie eine Bestätigung per WhatsApp.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Umtausch
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Möchten Sie einen Artikel gegen eine andere Größe oder Farbe tauschen? 
                    Kein Problem! Kontaktieren Sie uns einfach via WhatsApp und wir organisieren 
                    den Umtausch für Sie.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Defekte oder falsche Ware
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Sollte ein Artikel defekt sein oder nicht der bestellten Ware entsprechen, 
                    übernehmen wir selbstverständlich die Kosten für die Rücksendung. Bitte 
                    senden Sie uns ein Foto des Problems via WhatsApp.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Kontakt
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Für alle Fragen rund um Rückgabe und Erstattung kontaktieren Sie uns:<br />
                    WhatsApp: Über unsere Website<br />
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
