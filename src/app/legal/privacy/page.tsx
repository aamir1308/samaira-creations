import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | SamAira Creations",
  description: "Informationen zum Datenschutz bei SamAira Creations",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Informationen zum Umgang mit Ihren personenbezogenen Daten
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <h3 className="text-xl font-medium text-[var(--ink)]">Allgemeine Hinweise</h3>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                    Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  2. Datenerfassung auf dieser Website
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <h3 className="text-xl font-medium text-[var(--ink)]">Wer ist verantwortlich?</h3>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
                    Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                  </p>
                  
                  <h3 className="text-xl font-medium text-[var(--ink)]">Wie erfassen wir Ihre Daten?</h3>
                  <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. über 
                    unser WhatsApp-Kontaktformular). Andere Daten werden automatisch beim Besuch der Website 
                    durch unsere IT-Systeme erfasst (z.B. technische Daten wie Browser, Betriebssystem 
                    o.ä.).
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  3. WhatsApp-Kontakt
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Wenn Sie uns über WhatsApp kontaktieren, verarbeiten wir Ihre Telefonnummer und die 
                    Nachrichten, die Sie uns senden. WhatsApp ist ein Dienst der Meta Platforms Ireland 
                    Limited, 4 Grand Canal Square, Dublin 2, Irland.
                  </p>
                  <p>
                    Bitte beachten Sie, dass WhatsApp Ihre Daten auch auf Servern in den USA verarbeiten 
                    kann. Weitere Informationen finden Sie in der{' '}
                    <a href="https://www.whatsapp.com/legal/privacy-policy" className="text-[var(--brand-teal)] underline">
                      WhatsApp-Datenschutzrichtlinie
                    </a>
                    .
                  </p>
                  <p>
                    Ihre Kontaktdaten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und 
                    nicht ohne Ihre explizite Einwilligung an Dritte weitergegeben.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  4. Ihre Rechte
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>Sie haben jederzeit das Recht:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
                    <li>Die Berichtigung unrichtiger Daten zu verlangen</li>
                    <li>Die Löschung Ihrer Daten zu fordern</li>
                    <li>Die Einschränkung der Verarbeitung zu beantragen</li>
                    <li>Der Verarbeitung zu widersprechen</li>
                    <li>Ihre Daten in einem gängigen Format zu erhalten (Datenübertragbarkeit)</li>
                  </ul>
                  <p>
                    Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde über unsere 
                    Datenverarbeitung zu beschweren.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  5. Hosting
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Diese Website wird bei einem externen Hostinganbieter gehostet (Hetzner Online GmbH, 
                    Industriestr. 25, 91710 Gunzenhausen). Die personenbezogenen Daten, die auf dieser 
                    Website erfasst werden, werden auf den Servern des Hostinganbieters gespeichert.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  6. SSL-/TLS-Verschlüsselung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine 
                    verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von{' '}
                    <code>http://</code> auf <code>https://</code> wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Kontakt zum Datenschutzbeauftragten
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Wenn Sie Fragen zum Datenschutz haben, kontaktieren Sie uns bitte unter:<br />
                    E-Mail: datenschutz@samaira-creations.de
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
