import '../styles/globals.css';
import { Lora, Inter } from 'next/font/google';
import type { AppProps } from 'next/app';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
