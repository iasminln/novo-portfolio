import { HomePageProps } from "@/types";
import Button from "@/components/ui/button";
import { renderRichText } from "@/utils/richText";

export default function Inicio(data: HomePageProps["inicio"]) {
  return (
    <section className="section__initial" aria-label="Início">
      <div className="container">
        <p className="section__initial-title">{renderRichText(data.title, { as: 'span' })}</p>
        <h1 className="section__initial-subtitle">{data.subtitle}</h1>

        <div className="button-container">
          <Button href="#contato">Vamos conversar</Button>
          <Button variant="secondary" href="#sobre">Saiba mais</Button>
        </div>
      </div>
    </section>
  );
}
