import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../libs/createEmotionCache';
import '../styles/globals.scss';
import Head from 'next/head';
import { getPalette, getTypography } from '../libs/theme';
import { ColorModeProvider } from '../libs/colorMode';
import React from 'react';
import Header from '../common/components/Header/Header';
import Footer from '../common/components/Footer/Footer';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const [mode, setMode] = React.useState('dark');
	const colorMode = React.useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode) => prevMode === 'dark' ? 'light' : 'dark');
			},
		}),
		[],
	);

	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme({ ...getPalette(mode), ...getTypography() }), [mode]);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ColorModeProvider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Header colorMode={mode} setColorMode={setMode} />
					<Component {...pageProps} />
					<Footer />
				</ThemeProvider>
			</ColorModeProvider>
		</CacheProvider>
	);
}

export default MyApp;
