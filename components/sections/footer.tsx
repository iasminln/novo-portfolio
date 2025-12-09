import React, { useState } from 'react';
import CuriosidadesModal from '../ui/curiosidades-modal';
import { HomePageProps } from "@/types/index";
import Social from '../ui/social';

export default function Footer(data: HomePageProps["footer"] & HomePageProps["social"]) {
  const currentYear = new Date().getFullYear();
  const [isCuriosidadesOpen, setIsCuriosidadesOpen] = useState(false);
  const [isCuriosidadesClosing, setIsCuriosidadesClosing] = useState(false);

  const openCuriosidades = () => {
    setIsCuriosidadesClosing(false);
    setIsCuriosidadesOpen(true);
  };

  const closeCuriosidades = () => {
    setIsCuriosidadesClosing(true);
    window.setTimeout(() => {
      setIsCuriosidadesOpen(false);
      setIsCuriosidadesClosing(false);
    }, 260);
  };
 

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <h3 className="footer__title">Iasmin<span className="title-dot">.</span></h3>
            <p className="footer__description">
              Desenvolvedora Front-end especializada em React, TypeScript e otimização de performance.
            </p>
            <Social {...data} />
          </div>

          <div className="footer__links">
            <h4 className="footer__links-title">Navegação</h4>
            <ul className="footer__links-list">
              <li><a href="#sobre" className="footer__link">Sobre</a></li>
              <li><a href="#formacao" className="footer__link">Formação</a></li>
              <li><a href="#experiencia" className="footer__link">Experiência</a></li>
              <li><a href="#contato" className="footer__link">Contato</a></li>
              <li>
                <button
                  type="button"
                  className="footer__link footer__link--secret"
                  onClick={openCuriosidades}
                  aria-haspopup="dialog"
                  aria-controls="curiosidades-modal"
                >
                  Curiosidades ✨
                </button>
              </li>
            </ul>
          </div>

          <div className="footer__tech">
            <h4 className="footer__tech-title">Tecnologias</h4>
            <div className="footer__tech-tags">
              <span className="footer__tech-tag">React</span>
              <span className="footer__tech-tag">TypeScript</span>
              <span className="footer__tech-tag">Next.js</span>
              <span className="footer__tech-tag">CSS3</span>
              <span className="footer__tech-tag">JavaScript</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            Desenvolvido com ❤️ por Iasmin © {currentYear}
          </p>
          <p className="footer__note">
            Feito com Next.js e muito tererê 🧉
          </p>
        </div>
      </div>
      <CuriosidadesModal
        data={{ curiosidades: data.curiosidades || [] }}
        isOpen={isCuriosidadesOpen}
        isClosing={isCuriosidadesClosing}
        onClose={closeCuriosidades}
      />
    </footer>
  );
}
