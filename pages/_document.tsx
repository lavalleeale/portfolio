// ./pages/_document.js
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Header from "../components/Header";
import { getInfo, repo } from "../helpers/getInfo";

export default class MyDocument extends Document<{
  name: string;
  repos: repo[];
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
        <body className="bg-gray-50">
          <Header
            name={this.props.name}
            repos={this.props.repos}
            currentRepo={this.props.currentRepo}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
