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
import { basicRepo, getInfo } from "../helpers/getInfo";

export default class MyDocument extends Document<{
  name: string;
  repos: basicRepo[];
  currentRepo?: string;
}> {
  static getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    const { name, repos } = await getInfo();
    return { name, repos, ...initialProps, currentRepo: ctx.query.name };
  };
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-cyan-600">
          <Header
            name={this.props.name}
            repos={this.props.repos}
            currentRepo={this.props.currentRepo}
          />
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
