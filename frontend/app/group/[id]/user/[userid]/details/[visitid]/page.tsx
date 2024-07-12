'use client'

import crudfunctions from "@/app/hooks/crudhooks";
import DoughnutChart from "@/app/personal/[id]/details/doughnut";
import { useRouter } from 'next/navigation'


interface props {
  params: any
}

const Dets = ({ params }: props) => {


  let visitpfp;
  let name;
  let stats;



  try {
    const { data, loading, error } = crudfunctions.findaUser(params.visitid)
    visitpfp = data.user.avatar
    name = data.user.personalUsername
  } catch (err) {
    console.log(err)
  }

  try {

    const { data, loading, error } = crudfunctions.membervisitchart(params.visitid, params.id)
    stats = data.chartdatagroupie

  } catch (err) {

    console.log(err)

  }


  const router = useRouter()


  const goback = () => {

    router.back()

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

    <div className='z-40 text-center '>

      <span className='text-6xl font-bold inline-block text-gray-100 '>
        All-Time stats
      </span>

      <div className="absolute top-60 right-12 h-96 w-52 break-words overflow-hidden">

        <img className=' cursor-default rounded-full ml-1 ' style={{ "height": "200px", "width": "200px" }} src={visitpfp}></img>
        <div className=" font-bold text-4xl mt-4">
          {name}
        </div>

        <button className="h-8 w-40  hover:border-2 hover:border-yellow-200 mt-7 text-base text-yellow-100 bg-green-800" onClick={goback}>return</button>
      </div>


      <DoughnutChart Type="GroupVisit" SavingVisit={stats?.ChartSaving} ExpenseVisit={stats?.ChartExpense} InvestmentVisit={stats?.ChartInvestment} TotalSaving={stats?.TotalSaving} TotalExpense={stats?.TotalExpense} TotalInvestment={stats?.TotalInvestment} />


      <div className='flex justify-evenly h-48 w-full' style={{ "marginTop": "450px" }}>

        <div className='z-50 flex flex-col justify-center text-center h-40 w-64 bg-gradient-to-br from-green-900 to-green-1000 mt-5'>
          <span className="text-gray-500 font-bold text-6xl mt-4">
            {nFormatter(stats?.Investment, 1)}
          </span>

          <span className="text-gray-500 text-lg">
            Rupees Invested
          </span>

        </div>

        <div className='z-50 flex flex-col justify-center text-center  h-40 w-72 bg-gradient-to-br from-green-900 to-green-1000 mt-5'>

          <span className="text-gray-500 font-bold text-6xl mt-4">
            {nFormatter(stats?.Expense, 1)}
          </span>

          <span className="text-gray-500 text-lg">
            Rupees Spent
          </span>

        </div>

        <div className='z-50 flex flex-col justify-center text-center h-40 w-72 bg-gradient-to-br from-green-900 to-green-1000 mt-5'>

          <span className="text-gray-500 font-bold text-6xl mt-4">
            {nFormatter(stats?.Saving, 1)}
          </span>

          <span className="text-gray-500 text-lg">
            Rupees Saved
          </span>

        </div>

        <div className='z-50 flex flex-col justify-center text-center h-40 w-64 bg-gradient-to-br from-green-900 to-green-1000 mt-5'>

          <span className="text-gray-500 font-bold text-6xl mt-4">
            {nFormatter(stats?.SavingPercentage, 1)}%
          </span>

          <span className="text-gray-500 text-lg">
            % Saved
          </span>

        </div>
      </div>


    </div>
  )



}

export default Dets;