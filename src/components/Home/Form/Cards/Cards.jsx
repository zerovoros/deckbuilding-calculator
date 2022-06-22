import { IconButton, TextField } from '@mui/material';
import styles from './Cards.module.scss';
import React from 'react';
import { DeleteOutlined } from '@mui/icons-material';

function Cards({ formik }) {
	const popCard = index => {
		formik.values.cards.splice(index, 1);
		formik.validateForm();
	};

	const minIsValid = card => card.min <= card.max && card.min <= card.total && card.min <= formik.values.handSize;
	const maxIsValid = card => card.min <= card.max && card.max <= card.total && card.max <= formik.values.handSize;

	return (
		<div className={styles.cards}>
			{formik?.values?.cards?.map((card, index) =>
				<div key={index} className={styles.formRow}>
					<TextField
						id={`cards.${index}.name`}
						name={`cards.${index}.name`}
						label='Name'
						className={styles.cardsInput}
						value={formik?.values?.cards[index]?.name}
						onChange={formik?.handleChange}
						error={Boolean(formik?.errors?.cards?.at(index)?.name)}
						helperText={formik?.errors?.cards?.at(index)?.name}
					/>

					<TextField
						id={`cards.${index}.total`}
						name={`cards.${index}.total`}
						label='amount in deck'
						type='number'
						className={styles.cardsInput}
						value={formik?.values?.cards[index]?.total}
						onChange={formik?.handleChange}
						error={Boolean(formik?.errors?.cards?.at(index)?.total)}
						helperText={formik?.errors?.cards?.at(index)?.total}
						InputProps={{ inputProps: { min: 0, max: formik?.values?.deckSize } }}
					/>

					<TextField
						id={`cards.${index}.min`}
						name={`cards.${index}.min`}
						label='min in hand'
						type='number'
						className={styles.cardsInput}
						value={formik?.values?.cards[index]?.min}
						onChange={formik?.handleChange}
						error={Boolean(formik?.errors?.cards?.at(index)?.min) || !minIsValid(card)}
						helperText={formik?.errors?.cards?.at(index)?.min}
						InputProps={{ inputProps: { min: 0, max: formik?.values?.handSize } }}
					/>

					<TextField
						id={`cards.${index}.max`}
						name={`cards.${index}.max`}
						label='max in hand'
						type='number'
						className={styles.cardsInput}
						value={formik?.values?.cards[index]?.max}
						onChange={formik?.handleChange}
						error={Boolean(formik?.errors?.cards?.at(index)?.max) || !maxIsValid(card)}
						helperText={formik?.errors?.cards?.at(index)?.max}
						InputProps={{ inputProps: { min: 0, max: formik?.values?.handSize } }}
					/>

					<IconButton
						className={formik?.values?.cards?.length > 1 ? '' : 'hidden'}
						onClick={() => popCard(index)}
					>
						<DeleteOutlined />
					</IconButton>
				</div>
			)}
		</div>
	);
}

export default Cards;
