// import App from "next/app";
import { AppBar, Link, Toolbar, Typography } from "@material-ui/core";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ top: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">
            <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
              Alexander Lavallee&apos;s Portfolio
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
