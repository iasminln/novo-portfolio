export type SectionData = {
  inicio: {
    title: string;
    subtitle: string;
  };
  sobre: {
    descricao: string;
    imagem?: string;
    imagemFuturista?: string;
    altImagem?: string;
    skills: string[];
    soft_skills: string[];
  };
  marcas: {
    title: string;
    subtitle: string;
    itens: {
      nome: string;
      logo?: string;
      url?: string;
      cor?: string;
    }[];
  };
  formacao: {
    intro: string;
    pos_graduacoes: {
      projetos_desenvolvidos: {
        nome: string;
        descricao: string;
        tecnologias: string[];
        link: string;
        certificado?: string;
      }[];
      nome: string;
      descricao: string;
      universidade: string;
      ano: string;
      tipo: string;
      logo: string;
      destaques: string[];
      carga_horaria: string;
      certificados: {
        nome: string;
        certificado: string;
      }[];
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
      /** Mês (1–12) e ano de início */
      inicio: { mes: number; ano: number };
      /** Mês/ano de saída, ou `null` se for o emprego atual */
      fim: { mes: number; ano: number } | null;
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
    jobTitle: string;
    keywords: string;
    favicon: string;
  };
  social: {
    linkedin: string;
    github: string;
    instagram: string;
    email: string;
  };
  footer: {
    curiosidades: string[];
  };
};

export type HomePageProps = {
  [K in keyof SectionData]: SectionData[K];
};
