import { HomePageProps } from "@/types";
import Button from "@/components/ui/button";

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
          <Button href="#sobre">Veja meu trabalho</Button>
          <Button variant="secondary" href="#contato">Entre em contato</Button>
        </div>
      </div>
    </section>
  );
}
