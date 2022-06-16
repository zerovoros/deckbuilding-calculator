import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import styles from './Header.module.scss';

function Header({ colorMode, setColorMode }) {
	function toggleColorMode() {
		setColorMode(colorMode === 'dark' ? 'light' : 'dark');
	}

	return (
		<header className={styles.header}>
			<Container maxWidth='lg'>
				<Button
					color='primary'
					variant='outlined'
					onClick={toggleColorMode}
				>
					{colorMode == 'dark' ? (
						<LightModeOutlined color='accent' />
					) : (
						<DarkModeOutlined color='accent' />
					)}
				</Button>
			</Container>
		</header>
	);
}

export default Header;
