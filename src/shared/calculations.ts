const numberFormat = (options: Intl.NumberFormatOptions = {}): Intl.NumberFormat => {
	return Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		roundingMode: 'ceil',
		useGrouping: 'true',
		...options,
	});
};

type ProfitResponse = {
	profit: string;
	expenses: string;
};

export class Calculations {
	protected rate: number = 0;

	constructor(
		protected downPayment: number,
		protected annualFee: number,
		rate: number,
		protected periodInYears: number
	) {
		this.rate = rate / 100;
	}

	public calculateProfit(options: Intl.NumberFormatOptions = {}): ProfitResponse {
		const profit = this.downPayment * Math.pow(1 + this.rate, this.periodInYears);
		const expenses = this.downPayment;

		return {
			profit: numberFormat(options).format(isNaN(profit) ? 0 : profit),
			expenses: numberFormat(options).format(isNaN(expenses) ? 0 : expenses),
		};
	}

	public calculateProfitWithReinforcement(options: Intl.NumberFormatOptions = {}): ProfitResponse {
		const profit =
			this.downPayment * Math.pow(1 + this.rate, this.periodInYears) +
			this.annualFee * ((Math.pow(1 + this.rate, this.periodInYears) - 1) / this.rate);
		const expenses = this.downPayment + this.annualFee * this.periodInYears;

		return {
			profit: numberFormat(options).format(isNaN(profit) ? 0 : profit),
			expenses: numberFormat(options).format(isNaN(expenses) ? 0 : expenses),
		};
	}
}
