import { HomePageProps } from "@/types";
import Image from "next/image";
import { IconGraduation } from "../icons/icon-graduation";
import { IconArrow } from "../icons/icon-arrow";
import Button from "../ui/button";
import { IconCaret } from "../icons/icon-caret";

// "2025-11-11" -> "11/11/2025" (sem new Date para evitar desvio de fuso horário)
function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return dia && mes ? `${dia}/${mes}/${ano}` : data;
}

// pages/formacao.tsx
export default function Formacao(data: HomePageProps["formacao"]) {
  return (
    <section id="formacao" className="education-section">
      <div className="container">
        <div className="education-header">
          <h2 className="education-title">Formação Acadêmica<span className="title-dot">.</span></h2>
          <p className="education-intro">{data.intro}</p>
        </div>

        <div className="education-content">
          {data.pos_graduacoes && data.pos_graduacoes.length > 0 && (
            <div className="education-category">
              <h3 className="category-title">
                <IconGraduation color="var(--main-color-stronger)" size={25} />
                Pós-graduação
              </h3>
              <div className="pos-graduation-grid">
                {data.pos_graduacoes.map((pos: HomePageProps["formacao"]["pos_graduacoes"][number], index: number) => (
                  <div key={`${pos.nome}-${index}`} className="pos-graduation-item">
                    <div className="pos-graduation-card">
                      <div className="education-card-header">
                        <div className="university-logo">
                          {pos.logo ? (
                            <Image src={pos.logo} alt={pos.universidade} width={60} height={60} />
                          ) : (
                            <div className="logo-placeholder">🎓</div>
                          )}
                        </div>
                        <div className="education-info">
                          <h4 className="course-name">{pos.nome}</h4>
                          <p className="university-name">{pos.universidade}</p>
                          <div className="education-meta">
                            <span className="year">{pos.ano}</span>
                            {pos.carga_horaria && (
                              <span className="workload">{pos.carga_horaria}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {pos.descricao && <p className="course-description">{pos.descricao}</p>}

                      {pos.destaques && pos.destaques.length > 0 && (
                        <div className="course-highlights">
                          <h5 className="education-card-subtitle">Áreas de estudo:</h5>
                          <div className="highlight-tags">
                            {pos.destaques.map((destaque: string, destIndex: number) => (
                              <span key={destIndex} className="highlight-tag">{destaque}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {((pos.certificados && pos.certificados.length > 0) || pos.certificado_final?.certificado) && (
                        <div className="course-certifications">
                          {pos.certificados && pos.certificados.length > 0 && (
                            <div className="certifications-column">
                              <h5 className="education-card-subtitle">Micro certificados:</h5>
                              <div className="certifications-list">
                                {pos.certificados.map((certificado: HomePageProps["formacao"]["pos_graduacoes"][number]["certificados"][number], certificadoIndex: number) => (
                                  <details key={certificadoIndex} className="dropdown certification-dropdown">
                                    <summary className="dropdown__summary">
                                      <h6 className="certification-name">{certificado.nome}</h6>
                                      <span className="dropdown__caret">
                                        <IconCaret size={16} color="var(--main-color-stronger)" />
                                      </span>
                                    </summary>
                                    <div className="dropdown__panel certification-card">
                                      {certificado.modulo && (
                                        <span className="certification-module">{certificado.modulo}</span>
                                      )} 
                                      {certificado.emissao && (
                                        <p className="certification-meta">
                                          Emitido em <time dateTime={certificado.emissao}>{formatarData(certificado.emissao)}</time>
                                        </p>
                                      )}
                                      <Button
                                        href={certificado.certificado}
                                        variant="primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                        ariaLabel={`Ver certificado ${certificado.nome} (abre em nova aba)`}
                                      >
                                        Ver certificado <IconArrow size={16} direction="right" />
                                      </Button>
                                    </div>
                                  </details>
                                ))}
                              </div>
                            </div>
                          )}

                          {pos.certificado_final?.certificado && (
                            <div className="certifications-column">
                              <h5 className="education-card-subtitle">Certificado de conclusão:</h5>
                              <div className="certification-card certification-card--final">
                                <h6 className="certification-name">{pos.certificado_final.nome}</h6>
                                {pos.certificado_final.emissao && (
                                  <p className="certification-meta">
                                    Emitido em <time dateTime={pos.certificado_final.emissao}>{formatarData(pos.certificado_final.emissao)}</time>
                                  </p>
                                )}
                                <Button
                                  href={pos.certificado_final.certificado}
                                  variant="primary"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="project-link"
                                  ariaLabel={`Ver certificado de conclusão ${pos.certificado_final.nome} (abre em nova aba)`}
                                >
                                  Ver certificado <IconArrow size={16} direction="right" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pos-graduation-card">
                      {pos.projetos_desenvolvidos && pos.projetos_desenvolvidos.length > 0 && (
                        <div className="course-projects">
                          <h5 className="education-card-subtitle">Projetos desenvolvidos:</h5>
                          <div className="projects-list">
                            {pos.projetos_desenvolvidos.map((projeto: { nome: string; descricao: string; tecnologias: string[]; link: string }, projetoIndex: number) => (
                              <div key={projetoIndex} className="project-card">
                                <div className="project-header">
                                  <h6 className="project-name">{projeto.nome}</h6>
                                  {projeto.link && (
                                    <Button
                                      href={projeto.link}
                                      variant="secondary"
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="project-link"
                                      ariaLabel={`Ver projeto ${projeto.nome} (abre em nova aba)`}
                                    >
                                      Ver projeto <IconArrow size={16} direction="right" />
                                    </Button>
                                  )}
                                  
                                </div>
                                {projeto.descricao && (
                                  <p className="project-description">{projeto.descricao}</p>
                                )}
                                
                                {projeto.tecnologias && projeto.tecnologias.length > 0 && (
                                  <div className="project-technologies">
                                    <div className="highlight-tags">
                                      {projeto.tecnologias.map((tech: string, techIndex: number) => (
                                        <span key={techIndex} className="highlight-tag">{tech}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Graduações */}
          {data.graduacoes && data.graduacoes.length > 0 && (
            <div className="education-category">
              <h3 className="category-title">
                <IconGraduation color="var(--main-color-stronger)" size={25} />
                Graduações
              </h3>
              <div className="graduation-grid">
                {data.graduacoes.map((graduacao: HomePageProps["formacao"]["graduacoes"][number], index: number) => (
                  <div key={`${graduacao.nome}-${index}`} className="graduation-card">
                    <div className="education-card-header">
                      <div className="university-logo">
                        {graduacao.logo ? (
                          <Image src={graduacao.logo} alt={graduacao.universidade} width={50} height={50} />
                        ) : (
                          <div className="logo-placeholder">🏛️</div>
                        )}
                      </div>
                      <div className="education-info">
                        <h4 className="course-name">{graduacao.nome}</h4>
                        <p className="university-name">{graduacao.universidade}</p>
                        <div className="education-meta">
                          <span className="year">{graduacao.ano}</span>
                        </div>
                      </div>
                    </div>

                    {graduacao.descricao && <p className="course-description">{graduacao.descricao}</p>}

                    {graduacao.destaques && graduacao.destaques.length > 0 && (
                      <div className="course-highlights">
                        <h5>Áreas de estudo:</h5><div className="highlight-tags">
                          {graduacao.destaques.map((destaque: string, destIndex: number) => (
                            <span key={destIndex} className="highlight-tag">{destaque}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 
