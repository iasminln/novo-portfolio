import { HomePageProps } from "@/types";
import Card from "../ui/card";

// pages/experiencia.tsx
export default function Experiencia(data: HomePageProps["experiencia"]) {

  try {
    if (!data) {
      console.error('Erro: Dados de experiência não foram fornecidos');
      return;
    }

    if (!data.empregos || !Array.isArray(data.empregos)) {
      console.error('Erro: Propriedade "empregos" não encontrada ou não é um array nos dados de experiência');
      return;
    }

    if (data.empregos.length === 0) {
      console.warn('Aviso: Lista de empregos está vazia');
      return;
    }

  } catch (error) {
    console.error('Erro inesperado ao processar dados de experiência:', error);
    return;
  }

  return (
    <section className="container section section__experiencia">
      <h2>Experiência</h2>
      <p>Tenho experiência em desenvolvimento front-end e SEO para diversas plataformas.</p>

      <div className="cards-container">
        {data.empregos.map((emprego: { empresa: string; cargo: string; periodo: string; descricao: string }, index: number) => (
          <Card key={`${emprego.empresa}-${index}`}>
            <h2>{emprego.empresa}</h2>
            <h3>{emprego.cargo}</h3>
            <p className="period">{emprego.periodo}</p>
            <p>{emprego.descricao}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
