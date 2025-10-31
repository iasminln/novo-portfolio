// pages/contato.tsx
import { IconEmail } from "../icons/icon-email";
import { IconLinkedin } from "../icons/icon-linkedin";
import ContactForm from "../ui/form";
import { HomePageProps } from "@/types/index";

export default function Contato(data: HomePageProps["social"]) {
  return (
    <div id="contato" className="contact-section">
      <div className="container">
        <h2 className="contact-section__title">Vamos conversar<span className="title-dot">!</span></h2>
        <p className="contact-section__subtitle">
          Tem alguma pergunta ou projeto em mente? Adoraria ouvir de você!
        </p>
        <ContactForm />
        
        <div className="contact-info">
          <div className="contact-info__item">
            <IconEmail color="var(--main-color-stronger)" size={20} />
            <span>{data.email}</span>
          </div>
        </div>

        <div className="contact-actions">
          <a 
            href={data.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-button contact-button--linkedin"
          >
            <IconLinkedin color="white" size={25} />
            <span>LinkedIn</span>
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
    </div>
  );
}
