import { IconButton, TextField } from '@mui/material';
import styles from './Form.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { probability } from '../../../libs/probabilityFormulas';
import React from 'react';
import { AddCircle, DeleteOutlined } from '@mui/icons-material';

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

const cardStructure = () => ({
	name: '',
	total: 0,
	min: 0,
	max: 0,
});

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

	const popCard = (index) => {
		formik.values.cards.splice(index, 1);
		formik.validateForm();
	};

	const calculatePercentage = (values) => {
		const prob = probability(values);
		setPercentage(prob);
	};

	const minIsValid = (card) => card.min <= card.max && card.min <= card.total && card.min <= formik.values.handSize;
	const maxIsValid = (card) => card.min <= card.max && card.max <= card.total && card.max <= formik.values.handSize;

	return (
		<form className={styles.homeForm} onSubmit={formik.handleSubmit}>
			<div className={styles.formRow}>
				<TextField
					id='deckSize'
					name='deckSize'
					label='Deck size'
					type='number'
					className={styles.formInput1}
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
					className={styles.formInput1}
					value={formik.values.handSize}
					onChange={formik.handleChange}
					error={Boolean(formik.errors.handSize)}
					helperText={formik.errors.handSize}
					InputProps={{ inputProps: { min: 1, max: formik.values.deckSize } }}
				/>
			</div>

			<div className={styles.cards}>
				{formik.values.cards.map((card, index) =>
					<div key={index} className={styles.formRow}>
						<TextField
							id={`cards.${index}.name`}
							name={`cards.${index}.name`}
							label='Name'
							className={styles.formInput2}
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
							className={styles.formInput2}
							value={formik.values.cards[index].total}
							onChange={formik.handleChange}
							error={Boolean(formik?.errors?.cards?.at(index)?.total)}
							helperText={formik?.errors?.cards?.at(index).total}
							InputProps={{ inputProps: { min: 0, max: formik.values.deckSize } }}
						/>
						<TextField
							id={`cards.${index}.min`}
							name={`cards.${index}.min`}
							label='min in hand'
							type='number'
							className={styles.formInput2}
							value={formik.values.cards[index].min}
							onChange={formik.handleChange}
							error={Boolean(formik?.errors?.cards?.at(index)?.min) || !minIsValid(card)}
							helperText={formik?.errors?.cards?.at(index).min}
							InputProps={{ inputProps: { min: 0, max: formik.values.handSize } }}
						/>
						<TextField
							id={`cards.${index}.max`}
							name={`cards.${index}.max`}
							label='max in hand'
							type='number'
							className={styles.formInput2}
							value={formik.values.cards[index].max}
							onChange={formik.handleChange}
							error={Boolean(formik?.errors?.cards?.at(index)?.max) || !maxIsValid(card)}
							helperText={formik?.errors?.cards?.at(index).max}
							InputProps={{ inputProps: { min: 0, max: formik.values.handSize } }}
						/>

						<IconButton
							className={formik.values.cards.length > 1 ? '' : 'hidden'}
							onClick={() => popCard(index)}
						>
							<DeleteOutlined />
						</IconButton>
					</div>
				)}
			</div>

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
