import Experiencia from "@/components/sections/experiencia";
import Formacao from "@/components/sections/formacao";
import Inicio from "@/components/sections/inicio";
import Sobre from "@/components/sections/sobre";
import Footer from "@/components/sections/footer";
import BackToTop from "@/components/ui/back-to-top";
import { getStaticProps } from "@/utils/getPageStaticProps";

import { HomePageProps } from "@/types";
import Header from "@/components/sections/header";
import Contato from "@/components/sections/contato";
import HeadContent from "@/components/ui/head-content";
import Marcas from "@/components/sections/marcas";

export { getStaticProps };

export default function Home({ data }: { data: HomePageProps }) {
  return (
    <>
      <HeadContent data={data} />
      <div className="">
        <Header />
        <Inicio {...data.inicio} />
        <div className="main-content">
          <Sobre {...data.sobre} {...data.social} />
          <Experiencia {...data.experiencia} />
          <Marcas {...data.marcas} />
          <Formacao {...data.formacao} />
          <Contato {...data.social} />
          <Footer {...data.footer} {...data.social} />
        </div>
        <BackToTop />
      </div>
    </>
  );
}
