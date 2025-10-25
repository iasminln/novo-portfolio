import Experiencia from "@/components/sections/experiencia";
import Formacao from "@/components/sections/formacao";
import Inicio from "@/components/sections/inicio";
import Sobre from "@/components/sections/sobre";
import Footer from "@/components/sections/footer";
import BackToTop from "@/components/ui/back-to-top";
import ScrollOpacity from "@/components/ui/scroll-opacity";
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
      <ScrollOpacity className="scroll-opacity-container">
        <Inicio {...data.inicio} />
      </ScrollOpacity>
      <div className="main-content">
        <Sobre {...data.sobre} />
        <Formacao {...data.formacao} />
        <Experiencia {...data.experiencia} />
        <Contato />
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
}
