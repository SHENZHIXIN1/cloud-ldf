export const metadata = {
    title: 'Linked Data Fragments',
    description: 'Query Wikidata by triple pattern using Next.js App Router',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
          {children}
        </body>
      </html>
    );
  }  