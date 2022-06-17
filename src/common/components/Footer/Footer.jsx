import { GitHub } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './Footer.module.scss';

function Footer() {
	return (
		<footer className={styles.footer}>
			<Container maxWidth='xl'>
				<Typography variant='h5' component='p'>
					created by zerovoros
				</Typography>

				<Link href='https://github.com/zerovoros/deckbuilding-calculator'>
					<a target='_blank'>
						<GitHub />
					</a>
				</Link>
			</Container>
		</footer>
	);
}

export default Footer;
