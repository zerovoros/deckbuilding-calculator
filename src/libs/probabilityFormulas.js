export const probability = (form) => {
	const { deckSize, handSize, cards } = form;
	let total = 1;

	cards.forEach(card => {
		const probability = 0;
		for (let i = card.max; i >= card.min; i--) {
			const calc = (combination(card.total, i) * combination(deckSize - card.total, handSize - i)) / combination(deckSize, handSize);
			probability += calc;
		}
		total = probability * total;
	});

	return Number.parseFloat(total * 100).toFixed(2);
};

export const factorial = (number) => {
	let total = 1;
	for (let i = number; i > 0; i--) total = total * i;
	return total;
};

/**
 * r is the size of each permutation
 * n is the size of the set from which elements are permuted
 * n, r are non-negative integers
**/
export const combination = (n, r) => factorial(n) / (factorial(r) * factorial(n-r));
