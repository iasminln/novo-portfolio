import { HomePageProps } from "@/types";
import Button from "@/components/ui/button";
import { renderRichText } from "@/utils/richText";

export default function Inicio(data: HomePageProps["inicio"]) {

  return (
    <section className="section__initial">
      <div className="container">
        <h1>
          {data.titles.map((title: string) => (
            <span key={title}>{renderRichText(title, { as: 'span' })}</span>
          ))}
        </h1>

        <h2>{data.subtitle}</h2>

        <div className="button-container">
          <Button href="#contato">Vamos conversar</Button>
          <Button variant="secondary" href="#sobre">Saiba mais</Button>
        </div>
      </div>
    </section>
  );
}
