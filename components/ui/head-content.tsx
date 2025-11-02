import React from 'react';
import { HomePageProps } from '@/types';

interface PersonStructuredData {
  "@context": string;
  "@type": "Person";
  "name"?: string;
  "jobTitle"?: string;
  "url"?: string;
  "image"?: string;
  "description"?: string;
  "sameAs"?: (string | undefined)[];
  "knowsAbout"?: string;
}

interface SearchAction {
  "@type": "SearchAction";
  "target": string;
  "query-input": string;
}

interface WebsiteStructuredData {
  "@context": string;
  "@type": "WebSite";
  "name"?: string;
  "url"?: string;
  "potentialAction"?: SearchAction;
}

type StructuredData = PersonStructuredData | WebsiteStructuredData;

interface StructuredDataProps {
  data: StructuredData;
}

export default function HeadContent({ data }: { data: HomePageProps }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const title = data.seo?.title;
  const description = data.seo?.description;
  const image = `${siteUrl}${data.seo?.image}`;
  const keywords = data.seo?.keywords.join(", ");
  const author = data.seo?.author;
  const favicon = data.seo?.favicon;
  const skills = data.sobre?.skills.join(", ");
  const sameAs = [data.social?.linkedin, data.social?.github, data.social?.instagram];


  const personData: PersonStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author,
    "jobTitle": data.seo?.jobTitle,
    "url": siteUrl,
    "image": image,
    "description": description,
    "sameAs": sameAs,
    "knowsAbout": skills
  };

  const websiteData: WebsiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const StructuredData = ({ data }: StructuredDataProps) => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    )
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href={favicon} />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />

      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="keywords" content={keywords} />

      <StructuredData data={personData} />
      <StructuredData data={websiteData} />
    </>
  );
}
