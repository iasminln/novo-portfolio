import { HomePageProps } from "@/types";
import Card from "../ui/card";
import Image from "next/image";

// pages/formacao.tsx
export default function Formacao(data: HomePageProps["formacao"]) {
  console.log("data.formacao", data)
  return (
    <section className="container section section__formacao">
      <h2>Formação</h2>
      <div className="cards-container">
        {data.cursos.map((curso: { nome: string; descricao: string; imagem: string; universidade: string; ano: string }, index: number) => (
          <Card key={`${curso.nome}-${index}`}>
            {curso.imagem && <Image src={curso.imagem} alt={curso.nome} width={100} height={100} className="card-image" />}
            <h2>{curso.nome}</h2>
            <h3>{curso.universidade}</h3>
            <p className="period">{curso.ano}</p>
            <p>{curso.descricao}</p>
          </Card>
        ))}
      </div>
    </section>
  );
} 
