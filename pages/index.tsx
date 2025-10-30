import Experiencia from "@/components/sections/experiencia";
import Formacao from "@/components/sections/formacao";
import Inicio from "@/components/sections/inicio";
import Sobre from "@/components/sections/sobre";
import Footer from "@/components/sections/footer";
import BackToTop from "@/components/ui/back-to-top";
import { getStaticProps } from "@/utils/getPageStaticProps";

import { HomePageProps  } from "@/types";
import Header from "@/components/sections/header";
import Contato from "@/components/sections/contato";

export { getStaticProps };

export default function Home({ data }: { data: HomePageProps  }) {
  return (
    <div className="">
      <Header/>
      <Inicio {...data.inicio} />
      <div className="main-content">
        <Sobre {...data.sobre} />
        <Experiencia {...data.experiencia} />
        <Formacao {...data.formacao} />
        <Contato />
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
}
