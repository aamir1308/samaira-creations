import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie | SamAira Creations",
  description: "Informationen zur Verwendung von Cookies bei SamAira Creations",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20 bg-[var(--surface-soft)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink)] mb-4">
              Cookie-Richtlinie
            </h1>
            <p className="text-lg text-[var(--body)] max-w-2xl mx-auto">
              Informationen zur Verwendung von Cookies und ähnlichen Technologien
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Was sind Cookies?
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Cookies sind kleine Textdateien, die von Ihrem Browser auf Ihrem Gerät gespeichert 
                    werden, wenn Sie unsere Website besuchen. Cookies helfen uns, Ihre Erfahrung zu 
                    verbessern und die Website funktionsfähig zu halten.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Welche Cookies verwenden wir?
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <h3 className="text-xl font-medium text-[var(--ink)]">Notwendige Cookies</h3>
                  <p>
                    Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich. 
                    Sie ermöglichen es Ihnen, durch die Website zu navigieren und unsere Funktionen 
                    zu nutzen.
                  </p>
                  
                  <h3 className="text-xl font-medium text-[var(--ink)]">Analyse-Cookies</h3>
                  <p>
                    Wir verwenden optionale Analyse-Cookies, um zu verstehen, wie Besucher unsere 
                    Website nutzen. Diese Informationen helfen uns, die Website zu verbessern.
                  </p>

                  <h3 className="text-xl font-medium text-[var(--ink)]">Marketing-Cookies</h3>
                  <p>
                    Unsere Website verwendet derzeit keine Marketing-Cookies von Drittanbietern.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Cookie-Übersicht
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--hairline)]">
                        <th className="py-3 px-2 font-semibold text-[var(--ink)]">Name</th>
                        <th className="py-3 px-2 font-semibold text-[var(--ink)]">Zweck</th>
                        <th className="py-3 px-2 font-semibold text-[var(--ink)]">Dauer</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--body)]">
                      <tr className="border-b border-[var(--hairline-soft)]">
                        <td className="py-3 px-2">_ga</td>
                        <td className="py-3 px-2">Google Analytics</td>
                        <td className="py-3 px-2">2 Jahre</td>
                      </tr>
                      <tr className="border-b border-[var(--hairline-soft)]">
                        <td className="py-3 px-2">_gid</td>
                        <td className="py-3 px-2">Google Analytics</td>
                        <td className="py-3 px-2">24 Stunden</td>
                      </tr>
                      <tr className="border-b border-[var(--hairline-soft)]">
                        <td className="py-3 px-2">cookie_consent</td>
                        <td className="py-3 px-2">Speichert Ihre Cookie-Einwilligung</td>
                        <td className="py-3 px-2">1 Jahr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Cookie-Einwilligung
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Bei Ihrem ersten Besuch unserer Website bitten wir Sie um Ihre Einwilligung zur 
                    Verwendung von nicht-notwendigen Cookies. Sie können Ihre Entscheidung jederzeit 
                    ändern, indem Sie Ihre Browser-Einstellungen anpassen oder auf &quot;Cookie-Einstellungen&quot; 
                    am Ende der Seite klicken.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Cookies ablehnen
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Sie können Cookies in Ihren Browser-Einstellungen ablehnen oder blockieren. 
                    Bitte beachten Sie, dass einige Funktionen der Website möglicherweise nicht 
                    richtig funktionieren, wenn Sie Cookies deaktivieren.
                  </p>
                  <p>
                    Weitere Informationen zum Verwalten von Cookies finden Sie unter 
                    <a href="https://www.aboutcookies.org" className="text-[var(--brand-teal)] underline ml-1">
                      aboutcookies.org
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] mb-4">
                  Kontakt
                </h2>
                <div className="text-[var(--body)] space-y-4">
                  <p>
                    Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns unter:<br />
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
