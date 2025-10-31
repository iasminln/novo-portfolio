export type SectionData = {
  inicio: { 
    titles: string[] 
  }; 
  sobre: { 
    descricao: string; 
    imagem?: string;
    altImagem?: string;
    skills: string[]; 
    soft_skills: string[];
  };
  formacao: { 
    intro: string;
    pos_graduacoes: { 
      nome: string;
      descricao: string;
      universidade: string;
      ano: string;
      tipo: string;
      logo: string;
      destaques: string[];
      carga_horaria: string;
    }[];
    graduacoes: { 
      nome: string; 
      descricao: string; 
      universidade: string; 
      ano: string; 
      tipo: string;
      logo: string;
      destaques: string[];
    }[]; 
  };
  experiencia: {
    intro: string;
    destaques: string[];
    empregos: { 
      empresa: string;
      cargo: string;
      periodo: string;
      duracao: string;
      tipo: string;
      descricao: string;
      tecnologias: string[];
      destaques: string[];
      marcas: string[];
    }[];
  };
  seo: {
    title: string;
    description: string;
    image: string;
    altImagem: string;
    author: string;
  };
  social: {
    linkedin: string;
    github: string;
    instagram: string;
  };
};

export type HomePageProps = {
  [K in keyof SectionData]: SectionData[K];
};
