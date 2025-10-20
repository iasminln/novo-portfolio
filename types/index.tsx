export type SectionData = {
  inicio: { 
    titles: string[] 
  }; 
  sobre: { 
    descricao: string; 
    skills: string[]; 
  };
  formacao: { 
    cursos: { 
      nome: string; 
      descricao: string; 
      universidade: string; 
      ano: string; 
      imagem: string 
    }[]; 
  };
  experiencia: { 
    empregos: { 
      empresa: string; 
      cargo: string; 
      periodo: string; 
      descricao: string 
    }[]; 
  };
  contato: { 
    email: string; 
    telefone: string 
  };
};

export type HomePageProps = {
  [K in keyof SectionData]: SectionData[K];
};
