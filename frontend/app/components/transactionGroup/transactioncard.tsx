import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import { FC } from 'react';
import TrashTransaction from "./transactiontrashbutton";

const categoryColorMap = {

	Saving: "from-green-900 to-green-1000",
	Expense: "from-gray-800 to-gray-1000",
	Investment: "from-blue-900 to-blue-1000",
};


interface Props {
	gid: string,
	myid: string,
	mid: string,
	memberObject: any,
	tid: string,
	transaction: string,
	date: Date,
	amount: number,
	location: string,
	paymentType: "Card" | "Online" | "Cash"
	category: "Saving" | "Expense" | "Investment"
}

const Card: FC<Props> = ({ gid, myid, mid, memberObject, tid, transaction, date, amount, location, paymentType, category }) => {

	const cardClass = categoryColorMap[category];
	let datestring = new Date(date);

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>

						{

							myid === mid

								?

								<>

									<TrashTransaction selectedtransaction={tid} />

									<Link href={`/group/${gid}/transaction/${tid}`}>

										<HiPencilAlt className='cursor-pointer' size={20} />
									</Link>

								</>



								:

								<></>

						}



					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {transaction}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>

					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 -ml-1">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
					Amount: RS.{amount}

				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location}
				</p>
				<div className='flex'>
					<p className='text-xs text-white font-bold'>{datestring.toDateString()}</p>
				</div>
				{memberObject[mid] && <p className='text-base text-white font-bold '>{mid == myid ? `${memberObject[mid][0]} (me)` : memberObject[mid][0]}</p>}
				{memberObject[mid] && <img src={memberObject[mid][1]} className="h-16 w-16 rounded-full absolute mt-44 ml-72" ></img>}


			</div>
		</div>
	);
};
export default Card;