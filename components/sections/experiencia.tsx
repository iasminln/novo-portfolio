import { useEffect, useState } from "react";
import { HomePageProps } from "@/types/index";
import { IconCheck } from "../icons/icon-check";
import {
  calcularDuracao,
  formatarPeriodo,
  isEmpregoAtual,
} from "@/utils/experiencia";

type Emprego = HomePageProps["experiencia"]["empregos"][number];

function EmpregoItem({ emprego }: { emprego: Emprego }) {
  const atual = isEmpregoAtual(emprego.fim);
  const [duracao, setDuracao] = useState(() =>
    calcularDuracao(emprego.inicio, emprego.fim)
  );

  // Emprego atual: recalcula com a data do visitante (evita mismatch de hidratação)
  useEffect(() => {
    if (!atual) return;
    setDuracao(calcularDuracao(emprego.inicio, emprego.fim, new Date()));
  }, [atual, emprego.inicio, emprego.fim]);

  const periodo = formatarPeriodo(emprego.inicio, emprego.fim);
  const tipo = atual ? "atual" : "passado";

  return (
    <div className={`timeline-item ${tipo}`}>
      <div className="timeline-marker-container">
        <div className="timeline-marker">
          <div className="marker-dot"></div>
          <div className="marker-line"></div>
        </div>
        <div className="timeline-initial-year">{emprego.inicio.ano}</div>
      </div>

      <div className="timeline-content">
        <div className="experience-card">
          <div className="experience-company">
            <h3 className="company-name">{emprego.empresa}</h3>
            {emprego.sobre_empresa ? (
              <p className="company-blurb">{emprego.sobre_empresa}</p>
            ) : null}
          </div>

          <div className="experience-role">
            <div className="experience-role-header">
              <h4 className="job-title">{emprego.cargo}</h4>
              <div className="job-period">
                <span className="period-text">{periodo}</span>
                <span className="duration-badge">{duracao}</span>
              </div>
            </div>

            {emprego.descricao ? (
              <p className="job-description">{emprego.descricao}</p>
            ) : null}

            <div className="job-details">
              {emprego.tecnologias && emprego.tecnologias.length > 0 && (
                <div className="technologies">
                  <h5>Tecnologias:</h5>
                  <div className="tech-tags">
                    {emprego.tecnologias.map((tech: string, techIndex: number) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {emprego.destaques && emprego.destaques.length > 0 && (
                <div className="highlights">
                  <h5>Destaques:</h5>
                  <div className="highlight-tags">
                    {emprego.destaques.map((destaque: string, destIndex: number) => (
                      <span key={destIndex} className="highlight-tag">{destaque}</span>
                    ))}
                  </div>
                </div>
              )}

              {emprego.marcas && emprego.marcas.length > 0 && (
                <div className="brands">
                  <h5>Marcas atendidas:</h5>
                  <p className="brands-text">{emprego.marcas.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experiencia(data: HomePageProps["experiencia"]) {
  return (
    <section id="experiencia" className="experience-section">
      <div className="container">
        <div className="experience-header">
          <h2 className="experience-title">Trajetória<span className="title-dot">.</span></h2>
          <p className="experience-intro">{data.intro}</p>

          <div className="experience-highlights">
            <h3>Principais Conquistas:</h3>
            <ul className="highlights-list">
              {data.destaques.map((destaque: string, index: number) => (
                <li key={index} className="highlight-item">
                  <span className="highlight-icon"><IconCheck color="var(--main-color-stronger)" size={20} /></span>
                  {destaque}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-line-detail"></div>
          <div className="timeline-items">
            {data.empregos.map((emprego, index) => (
              <EmpregoItem key={`${emprego.empresa}-${index}`} emprego={emprego} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
