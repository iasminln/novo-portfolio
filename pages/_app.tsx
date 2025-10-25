import '../styles/globals.css';
import { Lora, Inter } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: any) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
