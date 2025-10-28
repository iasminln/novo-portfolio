import { HomePageProps } from "@/types/index";


// pages/experiencia.tsx
export default function Experiencia(data: HomePageProps["experiencia"]) {

  return (
    <section id="experiencia" className="experience-section">
      <div className="container">
        <div className="experience-header">
          <h2 className="experience-title">Minha Trajetória</h2>
          <p className="experience-intro">{data.intro}</p>
          
          <div className="experience-highlights">
            <h3>Principais Conquistas:</h3>
            <ul className="highlights-list">
              {data.destaques.map((destaque: string, index: number) => (
                <li key={index} className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  {destaque}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-line-detail"></div>
          <div className="timeline-items">
            {data.empregos.map((emprego: HomePageProps["experiencia"]["empregos"][number], index: number) => (
              <div key={`${emprego.empresa}-${index}`} className={`timeline-item ${emprego.tipo}`}>
                <div className="timeline-marker-container">
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="timeline-initial-year">{emprego.periodo.split(' - ')[0].split(' ')[2]}</div>
                </div>
                
                <div className="timeline-content">
                  <div className="experience-card">
                    <div className="experience-card-header">
                      <div className="company-info">
                        <h3 className="company-name">{emprego.empresa}</h3>
                        <h4 className="job-title">{emprego.cargo}</h4>
                      </div>
                      <div className="job-period">
                        <span className="period-text">{emprego.periodo}</span>
                        <span className="duration-badge">{emprego.duracao}</span>
                      </div>
                    </div>
                    
                    <p className="job-description">{emprego.descricao}</p>
                    
                    <div className="job-details">
                      <div className="technologies">
                        <h5>Tecnologias:</h5>
                        <div className="tech-tags">
                          {emprego.tecnologias.map((tech: string, techIndex: number) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                      
                      {emprego.destaques && (
                        <div className="highlights">
                          <h5>Destaques:</h5>
                          <div className="highlight-tags">
                            {emprego.destaques.map((destaque: string, destIndex: number) => (
                              <span key={destIndex} className="highlight-tag">{destaque}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {emprego.marcas && (
                        <div className="brands">
                          <h5>Marcas atendidas:</h5>
                          <p className="brands-text">{emprego.marcas.join(", ")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
