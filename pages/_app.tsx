// import App from "next/app";
import {
  AppBar,
  createMuiTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import type { AppProps } from "next/app";
import useDarkMode from "use-dark-mode";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { value } = useDarkMode(false, { storageKey: null, onChange: null });
  const theme = value ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">
            <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
              Alexander Lavallee&apos;s Portfolio
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
