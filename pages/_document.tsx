// ./pages/_document.js
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Header from "../components/Header";

export default class MyDocument extends Document<{ name: string }> {
  static getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    const { name } = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).json();
    return { name, ...initialProps };
  };
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-50">
          <Header name={this.props.name} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
