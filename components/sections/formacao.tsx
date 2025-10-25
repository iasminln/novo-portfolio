import { HomePageProps } from "@/types";
import Image from "next/image";

// pages/formacao.tsx
export default function Formacao(data: HomePageProps["formacao"]) {
  return (
    <section id="formacao" className="education-section">
      <div className="container">
        <div className="education-header">
          <h2 className="education-title">Formação Acadêmica</h2>
          <p className="education-intro">{data.intro}</p>
        </div>

        <div className="education-content">
          {/* Pós-graduações - Destaque especial */}
          {data.pos_graduacoes && data.pos_graduacoes.length > 0 && (
            <div className="education-category">
              <h3 className="category-title">
                <span className="category-icon">🎓</span>
                Pós-graduações
              </h3>
              <div className="pos-graduation-grid">
                {data.pos_graduacoes.map((pos: HomePageProps["formacao"]["pos_graduacoes"][number], index: number) => (
                  <div key={`${pos.nome}-${index}`} className="pos-graduation-card">
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
                    
                    <p className="course-description">{pos.descricao}</p>
                    
                    <div className="course-highlights">
                      <h5>Principais disciplinas:</h5>
                      <div className="highlight-tags">
                        {pos.destaques.map((destaque: string, destIndex: number) => (
                          <span key={destIndex} className="highlight-tag">{destaque}</span>
                        ))}
                      </div>
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
                <span className="category-icon">🎓</span>
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
                          <span className="status">{graduacao.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="course-description">{graduacao.descricao}</p>
                    
                    <div className="course-highlights">
                      <h5>Áreas de estudo:</h5>
                      <div className="highlight-tags">
                        {graduacao.destaques.map((destaque: string, destIndex: number) => (
                          <span key={destIndex} className="highlight-tag">{destaque}</span>
                        ))}
                      </div>
                    </div>
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
