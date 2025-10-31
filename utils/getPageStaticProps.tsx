import { GetStaticProps } from "next";
import { HomePageProps } from "@/types";

const SECTIONS = ["inicio", "sobre", "experiencia", "formacao", "seo", "footer", "social"] as const;

export const getStaticProps: GetStaticProps<{ data: HomePageProps }> = async () => {
  try {
    console.log("🔄 Carregando dados das seções...");

    const dataEntries = await Promise.all(
      SECTIONS.map(async (section) => {
        const modules = await import(`@/data/${section}.json`);
        console.log(`✅ Carregando ${section}... OK`);
        return [section, modules.default];
      })
    );

    const data = Object.fromEntries(dataEntries) as HomePageProps;

    console.log("📦 Dados carregados com sucesso!");

    return {
      props: { data },
    };
  } catch (error) {
    console.error("❌ Erro ao carregar os dados:", error);
    return {
      props: {
        data: {} as HomePageProps,
      },
    };
  }
};
