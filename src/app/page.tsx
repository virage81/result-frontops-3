'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useMemo, useState } from 'react';

import { Calculations } from '@/shared/calculations';

export default function Home() {
	const [data, setData] = useState({
		downPayment: 0,
		annualFee: 0,
		period: 0,
		rate: 0,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;

		setData(prev => ({
			...prev,
			[id]: value ? parseFloat(value) : 0,
		}));
	};

	const calculations = useMemo(
		() => new Calculations(data.downPayment, data.annualFee, data.rate, data.period),
		[data]
	);

	return (
		<div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				<Label htmlFor='downPayment'>Down Payment:</Label>
				<Input value={data.downPayment} onChange={handleChange} type='number' id='downPayment' placeholder='100' />

				<Label htmlFor='annualFee'>Annual Fee:</Label>
				<Input value={data.annualFee} onChange={handleChange} type='number' id='annualFee' placeholder='100' />

				<Label htmlFor='period'>Period (Years):</Label>
				<Input value={data.period} onChange={handleChange} type='number' id='period' placeholder='5' />

				<Label htmlFor='rate'>Rate (%):</Label>
				<Input value={data.rate} onChange={handleChange} type='number' id='rate' placeholder='16' />

				<h3 className=''>
					Profit: {calculations.calculateProfit().profit}
					<br />
					Expences: {calculations.calculateProfit().expenses}
				</h3>
				<h3 className=''>
					Profit with Reinforcements: {calculations.calculateProfitWithReinforcement().profit}
					<br />
					Expenses with Reinforcements: {calculations.calculateProfitWithReinforcement().expenses}
				</h3>
			</main>
		</div>
	);
}
