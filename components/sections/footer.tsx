import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <h3 className="footer__title">Iasmin.</h3>
            <p className="footer__description">
              Desenvolvedora Front-end especializada em React, TypeScript e otimização de performance.
            </p>
            <div className="footer__social">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
              >
                <span className="footer__social-icon">📱</span>
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <span className="footer__social-icon">💼</span>
                LinkedIn
              </a>
              <a 
                href="mailto:contato@iasmin.com" 
                className="footer__social-link"
                aria-label="Email"
              >
                <span className="footer__social-icon">✉️</span>
                Email
              </a>
            </div>
          </div>

          <div className="footer__links">
            <h4 className="footer__links-title">Navegação</h4>
            <ul className="footer__links-list">
              <li><a href="#sobre" className="footer__link">Sobre</a></li>
              <li><a href="#formacao" className="footer__link">Formação</a></li>
              <li><a href="#experiencia" className="footer__link">Experiência</a></li>
              <li><a href="#contato" className="footer__link">Contato</a></li>
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
            Feito com Next.js e muito café ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
