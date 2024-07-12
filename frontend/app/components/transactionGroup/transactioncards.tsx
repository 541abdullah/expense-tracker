"use client"

import Card from "./transactioncard";
import GroupFilter from "@/app/group/[id]/user/[userid]/filter";
import GroupActions from "@/app/group/[id]/user/[userid]/groupactions";
import crudfunctions from "@/app/hooks/crudhooks";
import { useState } from "react";

interface props {

	groupid: string,
	userid: string

}

const Cards = ({ groupid, userid }: props) => {


	const [filtermonth, setFiltermonth] = useState<string>("")
	const [filteryear, setFilteryear] = useState<number>(0)
	const [filterauthor, setFilterauthor] = useState<string>("")
	const [base, setBase] = useState<Boolean>(false)

	let transactionArray;
	let filterArray;
	let grouptotal;
	let memberObject: any = {};


	try {


		const { data, loading, error } = crudfunctions.gTotal(groupid)

		grouptotal = data.grouptotaldata

		grouptotal.forEach((each: any) => {
			memberObject[each.memberId] = [each.memberName, each.member.avatar, each.alive]
		})



	} catch (err) {
		console.log(err);
	}


	try {


		const { data, loading, error } = crudfunctions.gFilterq(groupid, filterauthor, filtermonth, filteryear)
		filterArray = data.filterGroupTransactions;


	} catch (err) {
		console.log(err);
	}



	try {


		const { data, loading, error } = crudfunctions.getGroupTransactions(groupid)
		transactionArray = data.groupTransactions



	} catch (err) {
		console.log(err);
	}


	const setMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== 'select month') {
			setFiltermonth(e.target.value);
		}

	}

	const setAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== 'select creator') {
			setFilterauthor(e.target.value);
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

		<>

			<GroupActions memberObject={memberObject} grouptotal={grouptotal} groupid={groupid} userid={userid} />
			<GroupFilter setMonth={setMonth} setAuthor={setAuthor} setYear={setYear} filter={filter} reset={reset} base={base} grouptotal={grouptotal} userid={userid} />


			<div className='w-full px-10 min-h-[40vh]'>
				<p className='text-5xl font-bold text-center my-10'>History</p>
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>


					{
						!base && transactionArray?.map((each: any) => (
							<div key={each.transactionID}>
								<Card gid={groupid} myid={userid} mid={each.groupMemberId} memberObject={memberObject} tid={each.transactionID} transaction={each.transaction} date={each.date} amount={each.Amount} location={each.location} paymentType={each.paymentType} category={each.category} />
							</div>
						))
					}

					{


						base && filterArray?.map((each: any) => (
							<div key={each.transactionID}>
								<Card gid={groupid} myid={userid} mid={each.groupMemberId} memberObject={memberObject} tid={each.transactionID} transaction={each.transaction} date={each.date} amount={each.Amount} location={each.location} paymentType={each.paymentType} category={each.category} />
							</div>
						))
					}

				</div>
			</div>

		</>


	);
};
export default Cards;