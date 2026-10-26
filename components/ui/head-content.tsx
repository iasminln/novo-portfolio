import Head from "next/head";
import { HomePageProps } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iasmin.dev";

type Organization = {
  "@type": "Organization" | "EducationalOrganization";
  name: string;
};

interface PersonStructuredData {
  "@type": "Person";
  "@id": string;
  name?: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  description?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  email?: string;
  worksFor?: Organization[];
  alumniOf?: Organization[];
  address?: { "@type": "PostalAddress"; addressCountry: string };
}

interface ProfilePageStructuredData {
  "@type": "ProfilePage";
  "@id": string;
  url: string;
  name?: string;
  inLanguage: string;
  mainEntity: { "@id": string };
}

interface WebsiteStructuredData {
  "@type": "WebSite";
  "@id": string;
  name?: string;
  url?: string;
  inLanguage: string;
}

type StructuredData = {
  "@context": string;
  "@graph": (PersonStructuredData | ProfilePageStructuredData | WebsiteStructuredData)[];
};

function StructuredDataScript({ data }: { data: StructuredData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HeadContent({ data }: { data: HomePageProps }) {
  const siteUrl = SITE_URL.replace(/\/$/, "");
  const pageUrl = `${siteUrl}/`;
  const title = data.seo?.title ?? "";
  const description = data.seo?.description ?? "";
  const imagePath = data.seo?.image ?? "";
  const image = imagePath.startsWith("http")
    ? imagePath
    : `${siteUrl}${imagePath}`;
  const imageAlt = data.seo?.altImagem ?? title;
  const author = data.seo?.author ?? "";
  const favicon = data.seo?.favicon ?? "/images/favicon.png";
  const jobTitle = data.seo?.jobTitle;
  const keywords = data.seo?.keywords;

  const sameAs = [
    data.social?.linkedin,
    data.social?.github,
    data.social?.instagram,
  ].filter((url): url is string => Boolean(url && url.trim()));

  const knowsAbout = data.sobre?.skills?.length
    ? data.sobre.skills
    : undefined;

  const worksFor: Organization[] = (data.experiencia?.empregos ?? [])
    .filter((emprego) => emprego.fim === null)
    .map((emprego) => ({ "@type": "Organization", name: emprego.empresa }));

  const alumniOf: Organization[] = [
    ...(data.formacao?.pos_graduacoes ?? []),
    ...(data.formacao?.graduacoes ?? []),
  ].map((curso) => ({ "@type": "EducationalOrganization", name: curso.universidade }));

  const personData: PersonStructuredData = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: author,
    jobTitle,
    url: siteUrl,
    image,
    description,
    sameAs: sameAs.length ? sameAs : undefined,
    knowsAbout,
    email: data.social?.email || undefined,
    worksFor: worksFor.length ? worksFor : undefined,
    alumniOf: alumniOf.length ? alumniOf : undefined,
    address: { "@type": "PostalAddress", addressCountry: "BR" },
  };

  const profilePageData: ProfilePageStructuredData = {
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    name: title,
    inLanguage: "pt-BR",
    mainEntity: { "@id": personData["@id"] },
  };

  const websiteData: WebsiteStructuredData = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: author,
    url: siteUrl,
    inLanguage: "pt-BR",
  };

  const structuredData: StructuredData = {
    "@context": "https://schema.org",
    "@graph": [profilePageData, personData, websiteData],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href={favicon} type="image/png" sizes="512x512" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" sizes="180x180" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="profile" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Iasmin Lisboa" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <StructuredDataScript data={structuredData} />
    </Head>
  );
}
