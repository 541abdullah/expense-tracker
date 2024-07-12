"use client"

import crudfunctions from "@/app/hooks/crudhooks";


interface props {
	creatorID: string,
	groupID: string
}

const TransactionForm = ({ creatorID, groupID }: props) => {


	const [mutateFunction, { data, loading, error }] = crudfunctions.createGTransaction();


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {


		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);

		const transactionData = {
			description: formData.get("description"),
			paymentType: formData.get("paymentType"),
			category: formData.get("category"),
			amount: parseFloat(formData.get("amount") as string),
			location: formData.get("location"),
			date: formData.get("date"),
		};

		if (!transactionData.amount) {
			transactionData.amount = 0;
		}
		if (!transactionData.description) {
			transactionData.description = 'null';
		}
		if (!transactionData.location) {
			transactionData.location = 'null';
		}

		try {

			mutateFunction({
				variables: {
					"input": {
						"transaction": transactionData.description,
						"paymentType": transactionData.paymentType,
						"category": transactionData.category,
						"Amount": transactionData.amount,
						"location": transactionData.location,
						"date": transactionData.date,
						"groupMemberId": creatorID,
						"groupGroupID": groupID
					}
				}, onCompleted(data, clientOptions) {

					(document.getElementById('form') as HTMLFormElement).reset();
				},

			})


		} catch (err) {

		}


	};

	return (
		<form className='w-full max-w-lg flex flex-col gap-5 px-3' id='form' onSubmit={handleSubmit}>

			<div className='flex flex-wrap'>
				<div className='w-full'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='description'
					>
						Transaction
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='description'
						name='description'
						type='text'
						required
						placeholder='Rent, Groceries, Salary, etc.'
					/>
				</div>
			</div>

			<div className='flex flex-wrap gap-3'>
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='paymentType'
					>
						Payment Type
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='paymentType'
							name='paymentType'
						>
							<option value={"Card"}>Card</option>
							<option value={"Cash"}>Cash</option>
							<option value={"Online"}>Online</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>


				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='category'
					>
						Category
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='category'
							name='category'
						>
							<option value={"Saving"}>Saving</option>
							<option value={"Expense"}>Expense</option>
							<option value={"Investment"}>Investment</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>

				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
						Amount(Rs.)
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='amount'
						name='amount'
						type='number'
					/>
				</div>
			</div>


			<div className='flex flex-wrap gap-3'>
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='location'
					>
						Location
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
						id='location'
						name='location'
						type='text'
					/>
				</div>


				<div className='w-full flex-1'>
					<label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor='date'>
						Date
					</label>
					<input
						type='date'
						name='date'
						id='date'
						className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white'
						placeholder='Select date'
						required
					/>
				</div>
			</div>

			<button
				className='text-yellow-100 bg-green-800 hover:border-2 hover:border-yellow-100 font-bold w-full rounded px-4 py-2 '
				type='submit'
			>
				Add Transaction
			</button>
		</form>
	);
};

export default TransactionForm;