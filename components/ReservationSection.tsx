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
        "Szczegóły rezerwacji zostały skopiowane. Skontaktuj się telefonicznie lub przez Facebook, aby potwierdzić termin."
      );
    } catch {
      setStatusMessage(
        "Wypełnij formularz i skontaktuj się telefonicznie. Finalny sposób potwierdzania rezerwacji zależy od wybranego kanału kontaktu."
      );
    }
  }

  return (
    <section id="reservation" className="section-shell section-space">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Rezerwacje"
          title={content.title}
          description={content.description}
        />

        <div className="panel js-reveal">
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

            <div className="rounded-[1.5rem] border border-primary/20 bg-primary/5 p-4 text-sm leading-7 text-muted">
              Na obecnym etapie potwierdzenie rezerwacji odbywa się przez telefon albo Facebook.
              Formularz porządkuje dane i przygotowuje je do przekazania obsłudze.
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
