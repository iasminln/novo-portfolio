import { HomePageProps } from "@/types";
import Image from "next/image";

export default function Sobre(data: HomePageProps["sobre"]) {

  return (
    <section id="sobre" className="container section section__sobre">
      <h2>Quem sou eu</h2>
      
      <div className={`sobre__content ${!data.imagem ? 'sobre__content--single' : ''}`}>
        <div className="sobre__text">
          <p>{data.descricao}</p>
        </div>

        <div className="sobre__skills">
          <h3>Minhas Skills</h3>
          <div className="skills__container">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="skill__pill">
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
