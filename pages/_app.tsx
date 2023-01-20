import type { AppProps } from "next/app";
import "../node_modules/github-markdown-css/github-markdown-light.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
