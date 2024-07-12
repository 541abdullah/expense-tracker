"use client"

import { useState } from "react";
import Card from "./transactioncard";
import crudfunctions from "@/app/hooks/crudhooks";



interface props {

	id: string

}

const Cards = ({ id }: props) => {

	const [filtermonth, setFiltermonth] = useState<string>("")
	const [filteryear, setFilteryear] = useState<number>(0)
	const [base, setBase] = useState<Boolean>(false)


	let transactionArray;
	let filterArray;


	try {


		const { data, loading, error } = crudfunctions.pFilterq(id, filtermonth, filteryear)
		filterArray = data.filterMyTransactions;


	} catch (err) {
		console.log(err);
	}


	try {


		const { data, loading, error } = crudfunctions.getMyTransactions(id)
		transactionArray = data.user.allMyTransactions


	} catch (err) {
		console.log(err);
	}






	const setMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== 'select month') {
			setFiltermonth(e.target.value);
		}

	}

	const setYear = (e: React.ChangeEvent<HTMLInputElement>) => {

		if (e.target.value == "") {
			setFilteryear(0)
		} else {
			let parse = parseInt(e.target.value)
			setFilteryear(parse);
		}


	}



	const filter = async () => {

		setBase(true)



	}

	const reset = () => {

		setBase(false)


	}


	return (
		<div className='w-full px-10 min-h-[40vh]'>


			<div className=" mt-10 h-20 -mb-4 ml-24">

				<span className='text-3xl font-bold  z-60 mr-4  inline-block text-gray-100 '>
					transaction filter
				</span>

				<label className='text-2xl mr-2 ' htmlFor="months">by month :</label>

				<select name="months" className="text-black text-xl p-1 focus:outline-none" placeholder="select month" onChange={(e) => { setMonth(e) }}>

					<option className="text-black" value="">select month</option>
					<option className="text-black" value="January">January</option>
					<option className="text-black" value="February">February</option>
					<option className="text-black" value="March">March</option>
					<option className="text-black" value="April">April</option>
					<option className="text-black" value="May">May</option>
					<option className="text-black" value="June">June</option>
					<option className="text-black" value="July">July</option>
					<option className="text-black" value="August">August</option>
					<option className="text-black" value="September">September</option>
					<option className="text-black" value="October">October</option>
					<option className="text-black" value="November">November</option>
					<option className="text-black" value="December">December</option>

				</select>

				<label className='text-2xl mr-2 ml-5' htmlFor="months">by year :</label>

				<input type="number" min="2000" max="2024" placeholder="2024" className="pl-2 p-1 text-black text-xl rounded-md focus:outline-none" onChange={(e) => { setYear(e) }} />


				{!base && <button className='text-xl mr-2 ml-5 font-bold bg-green-800 text-yellow-200 h-10 w-20  mt-2 rounded-sm hover:border-2 hover:border-yellow-100 ' onClick={filter} >Filter</button>}
				{base && <button className='text-xl mr-2 ml-5 font-bold bg-yellow-100 text-green-800 h-10 w-32 mt-2 rounded-sm hover:border-2 hover:border-gray-500' >Filter : ON</button>}

				<button className='text-xl mr-2 ml-5 bg-green-800 h-10 w-20 text-yellow-200 mt-2 rounded-sm hover:border-2 hover:border-yellow-100' onClick={reset} >Reset</button>

			</div>


			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>

				{
					!base && transactionArray?.map((each: any) => (
						<div key={each.transactionID}>
							<Card cid={id} tid={each.transactionID} transaction={each.transaction} date={each.date} amount={each.Amount} location={each.location} paymentType={each.paymentType} category={each.category} />
						</div>
					))
				}

				{

					base && filterArray?.map((each: any) => (
						<div key={each.transactionID}>
							<Card cid={id} tid={each.transactionID} transaction={each.transaction} date={each.date} amount={each.Amount} location={each.location} paymentType={each.paymentType} category={each.category} />
						</div>
						
					))
				}

			</div>

		</div>
	);
};
export default Cards;