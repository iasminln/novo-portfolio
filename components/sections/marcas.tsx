import Image from "next/image";
import { HomePageProps } from "@/types";

export default function Marcas(data: HomePageProps["marcas"]) {
  return (
    <section id="marcas" className="brands-section">
      <div className="container">
        <h2 className="brands-title">
          {data.title}
          <span className="title-dot">.</span>
        </h2> 

        {data.subtitle ? <p className="brands-subtitle">{data.subtitle}</p> : null}

        <div className="brands-grid" role="list" aria-label="Marcas atendidas">
          {data.itens.map((item, index) => {
            const key = `${item.nome}-${index}`;

            const cardStyle = item.cor ? { backgroundColor: item.cor } : undefined;

            const content = item.logo ? (
              <div className="brand-logo-wrap">
                <Image
                  src={item.logo}
                  alt={item.nome}
                  fill
                  sizes="(max-width: 768px) 45vw, 160px"
                  className="brand-logo"
                />
              </div>
            ) : (
              <div className="brand-fallback" aria-hidden="true">
                {item.nome.slice(0, 2).toUpperCase()}
              </div>
            );

            return item.url ? (
              <a
                key={key}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-card"
                style={cardStyle}
                role="listitem"
                title={item.nome}
                aria-label={item.nome}
              >
                {content}
              </a>
            ) : (
              <div
                key={key}
                className="brand-card"
                role="listitem"
                aria-label={item.nome}
                style={cardStyle}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

