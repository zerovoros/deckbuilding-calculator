import { Container, Typography } from '@mui/material';
import Head from 'next/head';
import styles from './Home.module.scss';
import React from 'react';
import HomeForm from './Form/Form';

function Home() {
	const [percentage, setPercentage] = React.useState(0);

	return (
		<div>
			<Head>
				<title>Deckbuilding Calculator</title>
				<meta name='description' content='Probability calculator for card game deckbuilding' />
			</Head>

			<main className={styles.home}>
				<Container maxWidth='xl'>
					<Typography variant='h1'>
						Deckbuilding Calculator
					</Typography>

					<HomeForm setPercentage={setPercentage} />

					<Typography variant='h3' component='p'>
						You have <b>{percentage}%</b> chance of opening this hand.
					</Typography>
				</Container>
			</main>
		</div>
	);
}

export default Home;
