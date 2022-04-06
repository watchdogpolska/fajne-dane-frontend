import { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import nProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { SettingsButton } from '../components/settings-button';
import { SplashScreen } from '../components/splash-screen';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { gtmConfig } from '../config';
import { gtm } from '../lib/gtm';
import { store } from '../store';
import { createTheme } from '../theme';
import { plPL } from '@mui/material/locale';
import '../i18n';
import '../../styles/main.scss';

import { pl } from 'date-fns/locale'

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Fajne Dane
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
          <AuthProvider>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeProvider
                    theme={createTheme({
                      direction: settings.direction,
                      responsiveFontSizes: settings.responsiveFontSizes,
                      mode: settings.theme
                    })}
                  >
                      <CssBaseline />
                      <Toaster position="top-center" />
                      <AuthConsumer>
                        {(auth) => !auth.isInitialized
                          ? <SplashScreen />
                          : <Component {...pageProps} />}
                      </AuthConsumer>
                  </ThemeProvider>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
