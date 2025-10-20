import Experiencia from "@/components/sections/experiencia";
import Formacao from "@/components/sections/formacao";
import Inicio from "@/components/sections/inicio";
import Sobre from "@/components/sections/sobre";
import { getStaticProps } from "@/utils/getPageStaticProps";

import { HomePageProps  } from "@/types";
import Header from "@/components/sections/header";
import Contato from "@/components/sections/contato";

export { getStaticProps };


export default function Home({ data }: { data: HomePageProps  }) {

  console.log("data.inicio", {data})

  return (
    <div className="">
      <Header/>
      <Inicio {...data.inicio} />
      <Sobre {...data.sobre} />
      <Formacao {...data.formacao} />
      <Experiencia {...data.experiencia} />
      <Contato />
    </div>
  );
}
