import Head from "next/head";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Button from "@/components/ui/button";
import { getStaticProps } from "@/utils/getPageStaticProps";

import { HomePageProps } from "@/types";

export { getStaticProps };

export default function NotFound({ data }: { data: HomePageProps }) {
  const favicon = data.seo?.favicon ?? "/images/favicon.png";

  return (
    <>
      <Head>
        <title>Página não encontrada | Iasmin Lisboa Nogueira</title>
        <meta name="description" content="A página que você procurou não existe ou mudou de endereço." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <link rel="icon" href={favicon} type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" sizes="180x180" />
      </Head>
      <a href="#main" className="skip-link">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="main">
        <section className="section__initial not-found" aria-labelledby="not-found-title">
          <div className="container">
            <p className="section__initial-title" aria-hidden="true">
              <span>404<span className="title-dot">.</span></span>
            </p>
            <h1 id="not-found-title" className="section__initial-subtitle">
              Ops, essa página não existe ou mudou de endereço.
            </h1>

            <div className="button-container">
              <Button href="/">Voltar para o início</Button>
              <Button variant="secondary" href="/#contato">Falar comigo</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer {...data.footer} {...data.social} />
    </>
  );
}
