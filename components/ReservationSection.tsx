import { FormEvent, useState } from "react";

import type { ClientProfile, SiteContent } from "@/lib/types";

import { SectionHeading } from "@/components/SectionHeading";

interface ReservationSectionProps {
  content: SiteContent["vip_reservations"];
  clientProfile: ClientProfile;
}

export function ReservationSection({ content, clientProfile }: ReservationSectionProps) {
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const summary = [
      `Rezerwacja: ${clientProfile.brand_name_preferred}`,
      `Imię i nazwisko: ${form.get("name")}`,
      `Telefon: ${form.get("phone")}`,
      `Liczba gości: ${form.get("people")}`,
      `Data: ${form.get("date")}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setStatusMessage(
        "Dane zostały skopiowane. Zadzwoń lub napisz na Facebooku, żeby potwierdzić stolik i godzinę wejścia."
      );
    } catch {
      setStatusMessage(
        "Wypełnij formularz i skontaktuj się telefonicznie. Potwierdzenie rezerwacji nadal odbywa się bezpośrednio z obsługą."
      );
    }
  }

  return (
    <section id="reservation" className="section-shell section-space">
      <div className="grid gap-8 xl:grid-cols-[0.84fr_1.16fr] xl:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Rezerwacje"
            title="Zbierz ekipę. Weź stolik."
            description={content.description}
          />

          <div className="poster-panel js-reveal space-y-5" data-parallax-y="18">
            <p className="section-kicker">Jak to działa</p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="poster-number !text-4xl !text-primary">01</span>
                <div>
                  <p className="text-lg text-text">Wrzucasz dane i termin.</p>
                  <p className="text-sm leading-6 text-muted">Bez zbędnych ekranów i bez udawania automatu.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="poster-number !text-4xl !text-secondary">02</span>
                <div>
                  <p className="text-lg text-text">Kopiujesz gotowy pakiet rezerwacji.</p>
                  <p className="text-sm leading-6 text-muted">Masz wszystko pod ręką do szybkiego potwierdzenia.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="poster-number !text-4xl !text-accent">03</span>
                <div>
                  <p className="text-lg text-text">Dzwonisz i zamykasz temat.</p>
                  <p className="text-sm leading-6 text-muted">Prosto, lokalnie i bez zgadywania.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel js-reveal" data-parallax-y="24">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-shell">
                <span>Imię i nazwisko</span>
                <input name="name" type="text" required placeholder="Twoje imię i nazwisko" className="field-input" />
              </label>
              <label className="field-shell">
                <span>Telefon</span>
                <input name="phone" type="tel" required placeholder="+48 000 000 000" className="field-input" />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-shell">
                <span>Liczba gości</span>
                <input name="people" type="number" min="1" required placeholder="4" className="field-input" />
              </label>
              <label className="field-shell">
                <span>Data</span>
                <input name="date" type="date" required className="field-input" />
              </label>
            </div>

            <div className="rounded-[1.5rem] border border-primary/20 bg-primary/8 p-4 text-sm leading-7 text-muted">
              Potwierdzenie rezerwacji odbywa się obecnie przez telefon albo Facebook.
              Formularz porządkuje dane i przyspiesza kontakt z obsługą.
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button type="submit" className="glow-button">
                {content.cta}
              </button>
              <a
                href={`tel:${clientProfile.contact.reservation_contact || clientProfile.contact.primary_phone}`}
                className="outline-button"
              >
                Zadzwoń teraz
              </a>
            </div>

            {statusMessage ? <p className="text-sm leading-6 text-muted">{statusMessage}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
