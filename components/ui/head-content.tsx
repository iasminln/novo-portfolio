import Head from "next/head";
import { HomePageProps } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iasmin.dev";

interface PersonStructuredData {
  "@context": string;
  "@type": "Person";
  name?: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  description?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  email?: string;
}

interface WebsiteStructuredData {
  "@context": string;
  "@type": "WebSite";
  name?: string;
  url?: string;
}

type StructuredData = PersonStructuredData | WebsiteStructuredData;

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

  const personData: PersonStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    jobTitle,
    url: siteUrl,
    image,
    description,
    sameAs: sameAs.length ? sameAs : undefined,
    knowsAbout,
    email: data.social?.email || undefined,
  };

  const websiteData: WebsiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    url: siteUrl,
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href={favicon} type="image/png" />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Iasmin Lisboa" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <StructuredDataScript data={personData} />
      <StructuredDataScript data={websiteData} />
    </Head>
  );
}
