
import Cards from "../../../../components/transactionGroup/transactioncards";
import TransactionForm from "../../../../components/transactionGroup/transactionform";


import DoughnutChart from "@/app/personal/[id]/details/doughnut";
import { getClient } from "../../../../ApolloClient";
import crudfunctions from "@/app/hooks/crudhooks";




const Home = async ({ params }: any) => {

	let gData;

	try {

		const { data } = await getClient().query({ query: crudfunctions.FINDGDATA, variables: { "input": params.id } })
		gData = data;

	} catch (err) {

		console.log(err);

	}




	return (
		<>

			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center text-center flex-col'>

					<span className='text-6xl font-bold  z-60 -mt-6 mr-4  inline-block text-gray-100 '>
						{gData?.getGdata[0]?.groupName}
					</span>

					<div>

						<p className='md:text-4xl text-2xl lg:text-4xl font-bold relative mt-5 z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
							Spend wisely, track wisely
						</p>

					</div>




				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<DoughnutChart Type={"GroupMain"} GroupId={params.id} />
					</div>

					<TransactionForm creatorID={params.userid} groupID={params.id} />
				</div>


				<Cards groupid={params.id} userid={params.userid} />

			</div>
		</>
	);
};
export default Home;