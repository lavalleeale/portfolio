// import App from "next/app";
import {
  AppBar,
  createMuiTheme,
  CssBaseline,
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
            Alexander Lavallee&apos;s Portfolio
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
