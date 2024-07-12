import Link from "next/link";

import ChangeAvtButton from "./changeavtbutton";
import DeleteAccButton from "./deleteaccbutton";
import DoughnutChart from "./doughnut";
import { getClient } from "@/app/ApolloClient";
import crudfunctions from "@/app/hooks/crudhooks";



const PersonalDets = async ({ params }: any) => {


    let userpfp;
    let username;

    let stats = {

        PSaving: 0,
        PInvestment: 0,
        PExpense: 0,
        PSavingPercentage: 0,
        GSaving: 0,
        GInvestment: 0,
        GExpense: 0,
        GSavingPercentage: 0,
        ChartSaving: 0,
        ChartInvestment: 0,
        ChartExpense: 0

    }


    try {

        const { data } = await getClient().query({ query: crudfunctions.PERSONALSTATS, variables: { "input": params.id } })
        stats.PInvestment = data.myStats.PInvestment
        stats.PExpense = data.myStats.PExpense
        stats.PSaving = data.myStats.PSaving
        stats.PSavingPercentage = data.myStats.PSavingPercentage
        stats.GInvestment = data.myStats.GInvestment
        stats.GExpense = data.myStats.GExpense
        stats.GSaving = data.myStats.GSaving
        stats.GSavingPercentage = data.myStats.GSavingPercentage
        stats.ChartSaving = data.myStats.ChartSaving
        stats.ChartInvestment = data.myStats.ChartInvestment
        stats.ChartExpense = data.myStats.ChartExpense


    }
    catch (err) {
        console.log(err);
    }



    try {

        const { data } = await getClient().query({ query: crudfunctions.USER, variables: { "input": params.id } })
        userpfp = data.user.avatar;
        username = data.user.personalUsername;


    } catch (err) {

        console.log(err);
    }


    function nFormatter(num: number, digits: number) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e5, symbol: "lac" },
            { value: 1e7, symbol: "cr" },

        ];
        const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => num >= item.value);
        return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
    }





    return (


        <>


            <div className='z-10 text-center overflow-x-hidden flex flex-col'>

                <span className='text-6xl font-bold inline-block text-gray-100 '>
                    All-Time stats
                </span>

                <div className="absolute top-32 right-12  w-52 break-words overflow-hidden">

                    <img id='bigimage' className=' cursor-default rounded-full ml-1 ' style={{ "height": "200px", "width": "200px" }} src={userpfp}></img>
                    <div className=" font-bold text-4xl mt-4">
                        {username}
                    </div>


                    <DeleteAccButton id={params.id} />
                    <ChangeAvtButton />

                    <Link href={`/personal/${params.id}`}><button className="h-8 w-40 hover:border-2 hover:border-yellow-100 mt-3 text-base text-yellow-200 bg-blue-900" >return</button></Link>


                </div>

                <span className=' absolute text-2xl mt-8 mr-12 font-bold inline-block text-gray-100 ' style={{ "marginTop": "430px", "marginLeft": "1000px" }}>
                    Combined stats
                </span>


                <span className='text-5xl font-bold inline-block text-gray-100 mt-14 mr-80 '>
                    Personal stats
                </span>


                <div className='mt-10 flex justify-evenly h-48 w-3/4 '>

                    <div className='z-20 flex flex-col justify-center text-center h-40 w-48 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>
                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.PInvestment, 1)}

                        </span>

                        <span className="text-gray-500 text-lg">
                            Rupees Invested
                        </span>

                    </div>

                    <div className='z-20 flex flex-col justify-center text-center  h-40 w-48 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>

                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.PExpense, 1)}
                        </span>

                        <span className="text-gray-500 text-lg">
                            Rupees Spent
                        </span>

                    </div>

                    <div className='z-20 flex flex-col justify-center text-center h-40 w-48 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>

                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.PSaving, 1)}
                        </span>

                        <span className="text-gray-500 text-lg">
                            Rupees Saved
                        </span>

                    </div>

                    <div className='z-20 flex flex-col justify-center text-center h-40 w-48 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>

                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.PSavingPercentage, 1)}%
                        </span>

                        <span className="text-gray-500 text-lg">
                            % Saved
                        </span>

                    </div>
                </div>


                <span className='text-5xl font-bold inline-block text-gray-100 mt-14 mr-80 '>
                    group stats
                </span>



                <div className='mt-10 flex justify-evenly h-48 w-3/4 mb-20'>

                    <div className='z-20 flex flex-col justify-center text-center h-40 w-44 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>
                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.GInvestment, 1)}
                        </span>

                        <span className="text-gray-500 text-lg">
                            Rupees Invested
                        </span>

                    </div>

                    <div className='z-20 flex flex-col justify-center text-center  h-40 w-44 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>

                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.GExpense, 1)}
                        </span>

                        <span className="text-gray-500 text-lg">
                            Rupees spent
                        </span>

                    </div>

                    <div className='z-20 flex flex-col justify-center text-center h-40 w-44 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>

                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.GSaving, 1)}
                        </span>

                        <span className="text-gray-500 text-lg">
                            Rupees Saved
                        </span>

                    </div>

                    <div className='z-20 flex flex-col justify-center text-center h-40 w-44 bg-gradient-to-br from-blue-900 to-blue-1000 mt-5'>

                        <span className="text-gray-500 font-bold text-6xl mt-4">
                            {nFormatter(stats.GSavingPercentage, 1)}%
                        </span>

                        <span className="text-gray-500 text-lg">
                            % Saved
                        </span>

                    </div>
                </div>



                <div className=' w-4/6 absolute' style={{ "marginTop": "470px", "marginLeft": "380px", "marginBottom": "20px" }}>
                    <div className='z-20 h-[300px] w-[300px] md:h-[330px] md:w-[330px]  ' style={{ "marginLeft": "550px" }}>

                        <DoughnutChart Type={'PersonalStats'} userid={params.id} Saving={stats.ChartSaving} Expense={stats.ChartExpense} Investment={stats.ChartInvestment} />
                    </div>


                </div>



            </div>

        </>



    )



}

export default PersonalDets;