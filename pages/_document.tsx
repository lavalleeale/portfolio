// ./pages/_document.js
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getInfo } from "../helpers/getInfo";

export default class MyDocument extends Document<{
  name: string;
}> {
  static getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    const { name, repos } = await getInfo();
    return { name, ...initialProps };
  };
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-slate-100">
          <Header name={this.props.name} />
          <div className="mb-12">
            <Main />
          </div>
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
