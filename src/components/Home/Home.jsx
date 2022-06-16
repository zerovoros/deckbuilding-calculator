import { TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import styles from './Home.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { probability } from '../../libs/probabilityFormulas';
import React from 'react';

const schema = yup.object().shape({
	deckSize: yup.number().required('required').min(0, 'invalid number'),
	handSize: yup.number().required('required').min(0, 'invalid number'),
	cards: yup.array().of(
		yup.object().shape({
			name: yup.string().required('required'),
			total: yup.number().required('required').min(0, 'invalid number'),
			min: yup.number().required('required').min(0, 'invalid number'),
			max: yup.number().required('required').min(0, 'invalid number'),
		}),
	),
});

const cardStructure = () => ({
	name: '',
	total: 0,
	min: 0,
	max: 0,
});

function Home() {
	const [percentage, setPercentage] = React.useState(0);

	const formik = useFormik({
		initialValues: {
			deckSize: 40,
			handSize: 5,
			cards: [cardStructure()],
		},
		validationSchema: schema,
		validateOnChange: true,
		onSubmit: values => {
			calculatePercentage(values);
		},
	});

	const pushCard = () => formik.values.cards.push(cardStructure());
	const popCard = (index) => formik.values.cards.splice(index, 1);

	function calculatePercentage(values) {
		console.log('values', values);
		const prob = probability(values);
		setPercentage(prob);
	}

	const changeHandler = (e) => {
		formik.handleChange(e);
		calculatePercentage(formik.values);
	};

	return (
		<div>
			<Head>
				<title>Deck Probability Calculator</title>
				<meta name='description' content='Probability calculator for deckbuilding' />
			</Head>

			<main className={styles.home}>
				<Container maxWidth='lg'>
					<Typography variant='h1'>Deck Probability Calculator</Typography>

					<form className={styles.contactForm} onSubmit={formik.handleSubmit}>
						<TextField
							id='deckSize'
							name='deckSize'
							label='Deck size'
							type='number'
							className={styles.formInput}
							value={formik.values.deckSize}
							onChange={changeHandler}
							error={Boolean(formik.errors.deckSize)}
							helperText={formik.errors.deckSize}
						/>
						<TextField
							id='handSize'
							name='handSize'
							label='Hand size'
							type='number'
							value={formik.values.handSize}
							onChange={formik.handleChange}
							error={Boolean(formik.errors.handSize)}
							helperText={formik.errors.handSize}
						/>

						{formik.values.cards.map((card, index) =>
							<div key={index}>
								<TextField
									id={`cards.${index}.name`}
									name={`cards.${index}.name`}
									label='Name'
									value={formik.values.cards[index].name}
									onChange={formik.handleChange}
									error={Boolean(formik?.errors?.cards?.at(index)?.name)}
									helperText={formik?.errors?.cards?.at(index).name}
								/>
								<TextField
									id={`cards.${index}.total`}
									name={`cards.${index}.total`}
									label='amount in deck'
									type='number'
									value={formik.values.cards[index].total}
									onChange={formik.handleChange}
									error={Boolean(formik?.errors?.cards?.at(index)?.total)}
									helperText={formik?.errors?.cards?.at(index).total}
								/>
								<TextField
									id={`cards.${index}.min`}
									name={`cards.${index}.min`}
									label='min number in hand'
									type='number'
									value={formik.values.cards[index].min}
									onChange={formik.handleChange}
									error={Boolean(formik?.errors?.cards?.at(index)?.min)}
									helperText={formik?.errors?.cards?.at(index).min}
								/>
								<TextField
									id={`cards.${index}.max`}
									name={`cards.${index}.max`}
									label='max number in hand'
									type='number'
									value={formik.values.cards[index].max}
									onChange={formik.handleChange}
									error={Boolean(formik?.errors?.cards?.at(index)?.max)}
									helperText={formik?.errors?.cards?.at(index).max}
								/>
							</div>
						)}
					</form>
					<Typography variant='p' component='p'>
						You have {percentage}% chance of opening this hand.
					</Typography>
				</Container>
			</main>
		</div>
	);
}

export default Home;
