// pages/contato.tsx
import { IconEmail } from "../icons/icon-email";
import { IconLinkedin } from "../icons/icon-linkedin";
import ContactForm from "../ui/form";
import { HomePageProps } from "@/types/index";

export default function Contato(data: HomePageProps["social"]) {
  return (
    <section id="contato" className="contact-section" aria-labelledby="contato-title">
      <div className="container">
        <h2 id="contato-title" className="contact-section__title">
          Vamos conversar<span className="title-dot" aria-hidden="true">!</span>
        </h2>
        <p className="contact-section__subtitle">
          Tem alguma pergunta ou projeto em mente? Adoraria ouvir de você!
        </p>
        <ContactForm />

        <div className="contact-info">
          <div className="contact-info__item">
            <IconEmail color="var(--main-color-stronger)" size={20} />
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </div>
        </div>

        <div className="contact-actions">
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button contact-button--linkedin"
            aria-label="LinkedIn (abre em nova aba)"
          >
            <IconLinkedin color="white" size={25} />
            <span aria-hidden="true">LinkedIn</span>
          </a>

          <a
            href={`mailto:${data.email}?subject=Contato via Portfolio&body=Olá Iasmin!%0D%0A%0D%0AEncontrei seu portfolio e gostaria de entrar em contato...%0D%0A%0D%0A`}
            className="contact-button contact-button--email"
          >
            <IconEmail color="white" size={25} />
            <span>E-mail</span>
          </a>
        </div>
      </div>
    </section>
  );
}
