import { HomePageProps } from "@/types";

export default function Sobre(data: HomePageProps["sobre"]) {
  console.log("datinha", data)
  return (
    <section className="container section section__sobre">
      <h2>Quem sou eu</h2>
      <p>{data.descricao}</p>
    </section>
  );
}
