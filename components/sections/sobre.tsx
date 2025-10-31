import { HomePageProps } from "@/types";
import Image from "next/image";

export default function Sobre(data: HomePageProps["sobre"]) {
  const paragrafos = data.descricao.split(/\n\n+/).filter(p => p.trim());

  return (
    <section id="sobre" className="container section section__sobre">
      <h2>Quem sou eu</h2>
      
      <div className={`sobre__content ${!data.imagem ? 'sobre__content--single' : ''}`}>
        <div className="sobre__text">
          {paragrafos.map((paragrafo, index) => (
            <p key={index}>{paragrafo.trim()}</p>
          ))}
        </div>

        <div className="sobre__skills">
          <h3>Skills</h3>
          <div className="skills__container">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="skill__pill">
                {skill}
              </span>
            ))}
            {data.soft_skills.map((skill: string, index: number) => (
              <span key={index} className="skill__pill soft_skill__pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {data.imagem && (
          <div className="sobre__image">
            <Image
              src={data.imagem}
              alt={data.altImagem || 'Imagem de perfil'}
              width={400}
              height={500}
              className="sobre__img"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
