import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            #__next {
              display: flex;
              flex-wrap: wrap-reverse;
              flex-direction: row-reverse;
            }

            #__next > * {
              width: 100%;
              position: relative;
            }
          `}</style>
        </body>
      </Html>
    );
  }
}
