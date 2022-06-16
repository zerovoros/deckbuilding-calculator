export const getPalette = (mode) => ({
	palette: {
		mode,
		...(mode === 'light' ?
			{
				primary: {
					main: '#5865F2',
					contrastText: '#FFF',
				},
			}
			:
			{
				primary: {
					main: '#5865F2',
					contrastText: '#1C1B29',
				},
				background: {
					default: '#1C1B29',
					paper: '#1C1B29',
				},
				divider: '#312F51',
			}
		)
	},
});

export const getTypography = () => ({
	typography: {
		fontFamily: 'Oxygen, Roboto, Arial, sans-serif',
		h1: {
			fontSize: '48px',
			fontWeight: '700',
			lineHeight: '56px',
		},
		h2: {
			fontSize: '40px',
			fontWeight: '300',
			lineHeight: '48px',
		},
		h3: {
			fontSize: '32px',
			fontWeight: '300',
			lineHeight: '40px',
		},
		h4: {
			fontSize: '24px',
			fontWeight: '400',
			lineHeight: '32px',
		},
		h5: {
			fontSize: '16px',
			fontWeight: '400',
			lineHeight: '24px',
		},
		p: {
			fontSize: '24px',
			fontWeight: '300',
			lineHeight: '32px',
		},
	}
});
