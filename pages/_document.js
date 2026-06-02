import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Sturm Energie – Deutschlands moderner Energieversorger. 100% Ökostrom, faire Preise, digitaler Service. Jetzt wechseln und sparen." />
        <meta name="keywords" content="Ökostrom, Energieversorger, Stromanbieter, günstiger Strom, nachhaltiger Strom, Sturm Energie" />
        <meta property="og:title" content="Sturm Energie – Sauber. Intelligent. Transparent." />
        <meta property="og:description" content="100% Ökostrom, faire Preise ohne versteckte Kosten und digitaler Service der wirklich funktioniert." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#111314" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
