'use client';

import Image from "next/image";
import { renderRichText } from "@/utils/richText";
import { HomePageProps } from "@/types/index";
import Social from '../ui/social';
import { useStyle } from '@/contexts/StyleContext';

export default function Sobre(data: HomePageProps["sobre"] & HomePageProps["social"]) {
  const { currentStyle } = useStyle();

  const selectedImage = {
    default: data.imagem,
    futuristic: data.imagemFuturista,
  }

  return (
    <section id="sobre" className="container section section__sobre">
      <h2>Quem sou eu<span className="title-dot">.</span></h2>
      
      <div className={`sobre__content ${!data.imagem ? 'sobre__content--single' : ''}`}>
        <div className="sobre__text">
          {renderRichText(data.descricao, { as: 'p' })}
          <Social {...data} />
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
              src={selectedImage[currentStyle] || data.imagem}
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
