import Head from "next/head";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const title = data.seo?.title;
  const description = data.seo?.description;
  const image = data.seo?.image ? `${siteUrl}${data.seo?.image}` : `${siteUrl}${data.sobre?.imagem}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrl} />

        <meta name="author" content={data.seo?.author} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <meta name="keywords" content="desenvolvedora front-end, React, TypeScript, VTEX IO, Shopify, SEO técnico, desenvolvimento web" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": data.seo?.author,
              "jobTitle": "Desenvolvedora Front-end",
              "description": description,
              "image": image,
              "url": siteUrl,
              "sameAs": [data.social?.linkedin, data.social?.github, data.social?.instagram],
              "knowsAbout": data.sobre?.skills
            })
          }}
        />
      </Head>
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
    </>
  );
}
