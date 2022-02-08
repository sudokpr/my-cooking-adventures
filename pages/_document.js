import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
            integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
            crossOrigin="anonymous"
          />
          <style amp-custom>{`
						amp-story {
							font-family: 'Oswald',sans-serif;
								color: #000;
							}
						amp-story-page {
							background-color: #fff;
						}
						h1 {
							font-weight: bold;
							font-size: 2.875em;
							font-weight: normal;
							line-height: 1.174;
						}
						p {
							font-weight: normal;
							font-size: 1.3em;
							line-height: 1.5em;
							color: #000;
						}
						q {
							font-weight: 300;
							font-size: 1.1em;
						}
						amp-story-grid-layer.bottom {
							align-content:end;
						}
						amp-story-grid-layer.noedge {
							padding: 0px;
						}
						amp-story-grid-layer.center-text {
							align-content: center;
						}
						.wrapper {
							display: grid;
							grid-template-columns: 50% 50%;
							grid-template-rows: 50% 50%;
						}
						.banner-text {
							text-align: center;
							background-color: #fff;
							line-height: 2em;
						}
						amp-img.contain img {
							object-fit: contain;
						}
            .transparent-holder {
              background-color: #14b8a685;
              text-align: center;
            }
            .hero {
              font-size: 2.875em;
              line-height: 1.5em;
            }
					`}</style>
        </Head>
        <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
