import Link from "next/link";

import Cards from "../../components/transaction/transactioncards";
import TransactionForm from "../../components/transaction/transactionform";

import DoughnutChart from "./details/doughnut";
import LogoutButton from "./logoutbutton";
import { getClient } from "../../ApolloClient";
import crudfunctions from "@/app/hooks/crudhooks";



const Home = async ({ params }: any) => {


	let userpfp;
	let creator;


	try {

		const { data } = await getClient().query({ query: crudfunctions.USER, variables: { "input": params.id } })
		userpfp = data.user.avatar;
		creator = data.user.id;




	} catch (err) {

		console.log(err);
	}





	return (
		<>


			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center text-center flex-col'>

					<span className='text-6xl font-bold  z-60 -mt-6 mr-4  inline-block text-gray-100 '>
						personal
					</span>

					<div>

						<p className='md:text-4xl text-2xl lg:text-4xl font-bold relative mt-5 z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
							Spend wisely, track wisely
						</p>

						<Link href={`${creator}/details`}>
							<img
								src={userpfp}
								className='w-16 h-16 rounded-full border cursor-pointer absolute -mt-16 right-80'
								alt='Avatar'
							/>
						</Link>

						<LogoutButton />

					</div>


				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>

						<DoughnutChart Type={'Personal'} userid={creator} />
					</div>

					<TransactionForm creatorID={creator} />
				</div>


				<Cards id={creator} />

			</div>
		</>
	);
};
export default Home;