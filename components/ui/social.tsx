import { IconEmail } from "../icons/icon-email";
import { IconLinkedin } from "../icons/icon-linkedin";
import { IconGithub } from "../icons/icon-github";
import { HomePageProps } from "@/types/index";

export default function Social(data: HomePageProps["social"]) {
  return ( 
    <div className="social">
      <a
        href={data.github}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label="GitHub"
      >
        <IconGithub color="var(--main-color-stronger)" size={22} />
        GitHub
      </a>
      <a
        href={data.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label="LinkedIn"
      >
        <IconLinkedin color="var(--main-color-stronger)" size={22} />
        LinkedIn
      </a>
      <a
        href={`mailto:${data.email}`}
        className="social-link"
        aria-label="Email"
      >
        <IconEmail color="var(--main-color-stronger)" size={22} />
        Email
      </a>
    </div>
  );
}