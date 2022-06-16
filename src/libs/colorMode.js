import React from 'react';

const ColorModeContext = React.createContext();

export const ColorModeProvider = ({ children }) => {
	const [colorMode, setColorMode] = React.useState('dark');
	return (
		<ColorModeContext.Provider value={{ colorMode, update: setColorMode }}>
			{children}
		</ColorModeContext.Provider>
	);
};

export const useColorMode = () => {
	const { colorMode, update } = React.useContext(ColorModeContext);
	return { colorMode, update };
};
