import { HomePageProps } from "@/types";


export default function Inicio(data: HomePageProps["inicio"]) {

  return (
    <section className="section__initial">
      <div className="container">
        <h1>
        
          {data.titles.map((title: string) => (
            <span key={title}>{title}</span>
          ))}
        </h1>

        <h2>
          Desenvolvimento. Otimização. Evolução. Manutenção.
        </h2>

        <div className="button-container">
          <button className="button">Veja meu trabalho</button>
          <button className="button-secondary">Entre em contato</button>
        </div>
      </div>
    </section>
  );
}
