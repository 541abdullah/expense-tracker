'use client'

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import crudfunctions from "@/app/hooks/crudhooks";
ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    Type: string,
    userid?: string,
    Saving?: number,
    Expense?: number,
    Investment?: number,
    GroupId?: string,
    SavingVisit?: number,
    ExpenseVisit?: number,
    InvestmentVisit?: number,
    TotalSaving?: number,
    TotalExpense?: number,
    TotalInvestment?: number

}




const DoughnutChart = ({ Type, userid, Saving, Expense, Investment, GroupId, SavingVisit, ExpenseVisit, InvestmentVisit, TotalInvestment, TotalSaving, TotalExpense }: Props) => {

    let chartstats: any;


    let chartData: any
    let chartDataOne: any
    let chartDataTwo: any
    let chartDataThree: any

    if (Type === 'Personal') {


        const { data, loading, error } = crudfunctions.pChart(userid!);
        const finaldata = data;

        chartstats = {
            Investment: finaldata?.chartMyTransactions.Investment,
            Saving: finaldata?.chartMyTransactions.Saving,
            Expense: finaldata?.chartMyTransactions.Expense,
        }




        chartData = {
            labels: ["Saving", "Expense", "Investment"],
            datasets: [
                {
                    label: "%",
                    data: [chartstats?.Saving, chartstats?.Expense, chartstats?.Investment],
                    backgroundColor: ["rgba(1, 50, 32)", "rgba(255, 253, 208)", "rgba(171, 183, 183)"],
                    borderColor: ["rgba(75, 192, 192)", "rgba(249, 249, 247)", "rgba(108, 122, 137)"],
                    borderWidth: 1,
                    borderRadius: 30,
                    spacing: 10,
                    cutout: 130,
                },
            ],
        };
    }


    if (Type === 'PersonalStats') {



        chartData = {
            labels: ["Saving", "Expense", "Investment"],
            datasets: [
                {
                    label: "%",
                    data: [Saving, Expense, Investment],
                    backgroundColor: ["rgba(1, 50, 32)", "rgba(255, 253, 208)", "rgba(171, 183, 183)"],
                    borderColor: ["rgba(75, 192, 192)", "rgba(249, 249, 247)", "rgba(108, 122, 137)"],
                    borderWidth: 1,
                    borderRadius: 30,
                    spacing: 10,
                    cutout: 130,
                },
            ],
        };


    }

    if (Type === 'GroupMain') {


        const { data, loading, error } = crudfunctions.gChart(GroupId!);
        const finaldata = data;

        chartstats = {
            Investment: finaldata?.chartGroupTransactions.Investment,
            Saving: finaldata?.chartGroupTransactions.Saving,
            Expense: finaldata?.chartGroupTransactions.Expense,
        }




        chartData = {
            labels: ["Saving", "Expense", "Investment"],
            datasets: [
                {
                    label: "%",
                    data: [chartstats?.Saving, chartstats?.Expense, chartstats?.Investment],
                    backgroundColor: ["rgba(1, 50, 32)", "rgba(255, 253, 208)", "rgba(171, 183, 183)"],
                    borderColor: ["rgba(75, 192, 192)", "rgba(249, 249, 247)", "rgba(108, 122, 137)"],
                    borderWidth: 1,
                    borderRadius: 30,
                    spacing: 10,
                    cutout: 130,
                },
            ],
        };

    }

    if (Type === 'GroupVisit') {


        if (TotalSaving == 0) {

            chartDataOne = {
                labels: ["Saving", "Saving(rest)"],
                datasets: [
                    {
                        label: "%",
                        data: [0, 0],
                        backgroundColor: ["rgba(1, 50, 32)", "rgba(255 ,255,255)"],
                        borderColor: ["rgba(75, 192, 192)", "rgba(255,255, 255 )"],
                        borderWidth: 1,
                        borderRadius: 30,
                        spacing: 8,
                        cutout: 120,
                    },
                ],
            };


        } else {

            chartDataOne = {
                labels: ["Saving", "Saving(rest)"],
                datasets: [
                    {
                        label: "%",
                        data: [SavingVisit, 100 - SavingVisit!],
                        backgroundColor: ["rgba(1, 50, 32)", "rgba(255 ,255,255)"],
                        borderColor: ["rgba(75, 192, 192)", "rgba(255,255, 255 )"],
                        borderWidth: 1,
                        borderRadius: 30,
                        spacing: 8,
                        cutout: 120,
                    },
                ],
            };

        }


        if (TotalExpense == 0) {

            chartDataTwo = {
                labels: ["Expense", "Expense(rest)"],
                datasets: [
                    {
                        label: "%",
                        data: [0, 0],
                        backgroundColor: ["rgba(237, 233, 157)", "rgba(255, 255, 255)"],
                        borderColor: ["rgba(249, 249, 247)", "rgba(255, 255, 255)"],
                        borderWidth: 1,
                        borderRadius: 30,
                        spacing: 8,
                        cutout: 120,
                    },
                ],
            };

        } else {

            chartDataTwo = {
                labels: ["Expense", "Expense(rest)"],
                datasets: [
                    {
                        label: "%",
                        data: [ExpenseVisit, 100 - ExpenseVisit!],
                        backgroundColor: ["rgba(237, 233, 157)", "rgba(255, 255, 255)"],
                        borderColor: ["rgba(249, 249, 247)", "rgba(255, 255, 255)"],
                        borderWidth: 1,
                        borderRadius: 30,
                        spacing: 8,
                        cutout: 120,
                    },
                ],
            };

        }


        if (TotalInvestment == 0) {


            chartDataThree = {
                labels: ["Investment", "Investment(rest)"],
                datasets: [
                    {
                        label: "%",
                        data: [0, 0],
                        backgroundColor: ["rgba(128,128,128)", "rgba(255, 255, 255)"],
                        borderColor: ["rgba(108, 122, 137)", "rgba(255, 255, 255)"],
                        borderWidth: 1,
                        borderRadius: 30,
                        spacing: 8,
                        cutout: 120,
                    },
                ],
            };

        } else {


            chartDataThree = {
                labels: ["Investment", "Investment(rest)"],
                datasets: [
                    {
                        label: "%",
                        data: [InvestmentVisit, 100 - InvestmentVisit!],
                        backgroundColor: ["rgba(128,128,128)", "rgba(255, 255, 255)"],
                        borderColor: ["rgba(108, 122, 137)", "rgba(255, 255, 255)"],
                        borderWidth: 1,
                        borderRadius: 30,
                        spacing: 8,
                        cutout: 120,
                    },
                ],
            };

        }


    }


    return (

        <>
            {
                Type === 'GroupVisit'

                    ?
                    <>
                        <div className='mt-8 relative w-4/6 bg-orange-200'>
                            <div className=' absolute left-3/4 h-[300px] w-[300px] md:h-[310px] md:w-[310px]  '>
                                <Doughnut data={chartDataOne} />
                            </div>
                            <div className=' absolute left-80 top-20 h-[300px] w-[300px] md:h-[310px] md:w-[310px]  '>
                                <Doughnut data={chartDataTwo} />
                            </div>
                            <div className=' absolute h-[300px] w-[300px] md:h-[310px] md:w-[310px]  '>
                                <Doughnut data={chartDataThree} />
                            </div>
                        </div>
                    </>


                    :

                    <Doughnut data={chartData} />

            }

        </>



    )




}

export default DoughnutChart;