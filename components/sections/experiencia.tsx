import { useEffect, useRef, useState } from "react";
import { HomePageProps } from "@/types/index";
import { IconCheck } from "../icons/icon-check";
import { IconCaret } from "../icons/icon-caret";
import TechTags from "../ui/tech-tags";
import Button from "../ui/button";
import {
  calcularDuracao,
  formatarPeriodo,
  isEmpregoAtual,
} from "@/utils/experiencia";

type Emprego = HomePageProps["experiencia"]["empregos"][number];

// Quantos cards aparecem de início e quantos cada clique em "Carregar mais" adiciona
const EMPREGOS_POR_PAGINA = 3;

function EmpregoItem({ emprego, isNovo = false }: { emprego: Emprego; isNovo?: boolean }) {
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
    <div className={`timeline-item ${tipo}${isNovo ? " timeline-item--novo" : ""}`} tabIndex={-1}>
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
            {emprego.sobre_empresa ? (
              <details className="dropdown">
                <summary className="dropdown__summary">
                  <h3>{emprego.empresa}</h3>
                  <span className="dropdown__caret">
                    <IconCaret size={18} color="var(--main-color-stronger)" />
                  </span>
                </summary>
                <div className="dropdown__panel">
                  <p className="company-blurb">{emprego.sobre_empresa}</p>
                </div>
              </details>
            ) : (
              <h3>{emprego.empresa}</h3>
            )}
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
              {emprego.marcas && emprego.marcas.length > 0 && (
                <div className="brands">
                  <h5>Marcas atendidas:</h5>
                  <p className="brands-text">{emprego.marcas.join(", ")}</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experiencia(data: HomePageProps["experiencia"]) {
  const [visiveis, setVisiveis] = useState(EMPREGOS_POR_PAGINA);
  const itemsRef = useRef<HTMLDivElement>(null);
  const primeiroNovoRef = useRef<number | null>(null);

  const restantes = data.empregos.length - visiveis;

  // Leva o foco ao primeiro card carregado (quem usa teclado ou leitor de tela continua de onde parou)
  useEffect(() => {
    if (primeiroNovoRef.current === null) return;
    const item = itemsRef.current?.children[primeiroNovoRef.current] as HTMLElement | undefined;
    item?.focus({ preventScroll: true });
    primeiroNovoRef.current = null;
  }, [visiveis]);

  const carregarMais = () => {
    primeiroNovoRef.current = visiveis;
    setVisiveis((v) => v + EMPREGOS_POR_PAGINA);
  };

  return (
    <section id="experiencia" className="experience-section" aria-labelledby="experiencia-title">
      <div className="container">
        <div className="experience-header">
          <h2 id="experiencia-title">Trajetória<span className="title-dot" aria-hidden="true">.</span></h2>
          <p className="experience-intro">{data.intro}</p>

          <div className="experience-highlights">
            <h3>Principais Conquistas:</h3>
            <ul className="highlights-list" role="list">
              {data.destaques.map((destaque: string, index: number) => (
                <li key={index} className="highlight-item">
                  <span className="highlight-icon" aria-hidden="true">
                    <IconCheck color="var(--main-color-stronger)" size={20} />
                  </span>
                  {destaque}
                </li>
              ))}
            </ul>

            {data.tecnologias && data.tecnologias.length > 0 && (
              <div className="experience-technologies">
                <h3>Tecnologias:</h3>
                <TechTags tags={data.tecnologias} />
              </div>
            )}
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-line-detail"></div>
          <div ref={itemsRef} id="experiencia-items" className="timeline-items">
            {data.empregos.slice(0, visiveis).map((emprego, index) => (
              <EmpregoItem
                key={`${emprego.empresa}-${index}`}
                emprego={emprego}
                isNovo={index >= EMPREGOS_POR_PAGINA}
              />
            ))}
          </div>
        </div>

        {restantes > 0 && (
          <div className="experience-load-more">
            <Button variant="secondary" onClick={carregarMais} ariaControls="experiencia-items">
              Carregar mais experiências ({restantes})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
