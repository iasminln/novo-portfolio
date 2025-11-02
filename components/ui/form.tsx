"use client";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Button from "./button";
import { IconSendMessage } from "../icons/icon-send-message";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    if (!form.current) return;
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form.current!,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      setSubmitStatus("success");
      form.current?.reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    })
    .catch((error) => {
      console.error(error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="contact-form">
      <h3 className="contact-form__title">Envie sua mensagem</h3>
      
      <form ref={form} onSubmit={sendEmail} className="contact-form__form">
        <div className="contact-form__field">
          <label htmlFor="from_name" className="contact-form__label">
            Nome *
          </label>
          <input 
            type="text" 
            name="from_name" 
            id="from_name"
            placeholder="Seu nome completo" 
            required 
            className="contact-form__input"
          />
        </div>
        
        <div className="contact-form__field">
          <label htmlFor="from_email" className="contact-form__label">
            Email *
          </label>
          <input 
            type="email" 
            name="from_email" 
            id="from_email"
            placeholder="seu@email.com" 
            required 
            className="contact-form__input"
          />
        </div>
        
        <div className="contact-form__field">
          <label htmlFor="message" className="contact-form__label">
            Mensagem *
          </label>
          <textarea 
            name="message" 
            id="message"
            placeholder="Conte-me sobre seu projeto ou pergunta..." 
            required 
            className="contact-form__textarea"
          />
        </div>
        
        <div className="g-recaptcha" data-sitekey={process.env.RECAPTCHA_SITE_KEY!}></div>

        {/* Status messages */}
        {submitStatus === "success" && (
          <div className="contact-form__message contact-form__message--success">
            <svg className="contact-form__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Mensagem enviada com sucesso! Retornarei em breve.</span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="contact-form__message contact-form__message--error">
            <svg className="contact-form__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Erro ao enviar mensagem. Tente novamente.</span>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="contact-form__button"
        >
          {isSubmitting ? (
            <>
              <span className="contact-form__spinner"></span>
              Enviando...
            </>
          ) : (
            <>
              <div className="contact-form__button-content">
                <IconSendMessage color="var(--button-primary-text-color)" size={20} />
                Enviar Mensagem
              </div>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
