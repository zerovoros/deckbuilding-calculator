import { IconButton, TextField } from '@mui/material';
import styles from './Form.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { probability } from '../../../libs/probabilityFormulas';
import React from 'react';
import { AddCircle } from '@mui/icons-material';
import Cards from './Cards/Cards';

const schema = yup.object().shape({
	deckSize: yup.number().required('*Must be at least 1').min(1, '*Must be at least 1'),
	handSize: yup.number().required('*Must be at least 1').min(1, '*Must be at least 1'),
	cards: yup.array().of(
		yup.object().shape({
			name: yup.string(),
			total: yup.number().required('*required').min(0),
			min: yup.number().required('*required').min(0),
			max: yup.number().required('*required').min(0),
		}),
	),
});

const cardStructure = () => ({ name: '', total: 0, min: 0, max: 0 });

function HomeForm({ setPercentage }) {
	const formik = useFormik({
		initialValues: {
			deckSize: 40,
			handSize: 5,
			cards: [cardStructure()],
		},
		validationSchema: schema,
		validateOnChange: true,
		validate: values => {
			calculatePercentage(values);
		},
		onSubmit: values => {
			calculatePercentage(values);
		},
	});

	const pushCard = () => {
		formik.values.cards.push(cardStructure());
		formik.validateForm();
	};

	const calculatePercentage = values => {
		const prob = probability(values);
		setPercentage(prob);
	};

	return (
		<form className={styles.homeForm} onSubmit={formik.handleSubmit}>
			<div className={styles.formRow}>
				<TextField
					id='deckSize'
					name='deckSize'
					label='Deck size'
					type='number'
					className={styles.formInput}
					value={formik.values.deckSize}
					onChange={formik.handleChange}
					error={Boolean(formik.errors.deckSize)}
					helperText={formik.errors.deckSize}
					InputProps={{ inputProps: { min: 1 } }}
				/>

				<TextField
					id='handSize'
					name='handSize'
					label='Hand size'
					type='number'
					className={styles.formInput}
					value={formik.values.handSize}
					onChange={formik.handleChange}
					error={Boolean(formik.errors.handSize)}
					helperText={formik.errors.handSize}
					InputProps={{ inputProps: { min: 1, max: formik.values.deckSize } }}
				/>
			</div>

			<Cards formik={formik} />

			<IconButton
				type='button'
				size='small'
				onClick={pushCard}
			>
				<AddCircle color='primary' sx={{ fontSize: 48 }} />
			</IconButton>
		</form>
	);
}

export default HomeForm;
