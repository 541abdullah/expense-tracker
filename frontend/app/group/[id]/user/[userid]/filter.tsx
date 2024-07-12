'use client'


interface props {
    setMonth: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    setAuthor: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    setYear: (e: React.ChangeEvent<HTMLInputElement>) => void,
    filter: () => void,
    reset: () => void,
    base: Boolean,
    grouptotal: any,
    userid: string
}

const GroupFilter = ({ setMonth, setAuthor, setYear, filter, reset, base, grouptotal, userid }: props) => {




    return (

        <div className=" mt-10 h-20 -mb-10">

            <span className='text-2xl font-bold  z-60 mr-4  inline-block text-gray-100 '>
                transaction filter
            </span>

            <label className='text-2xl mr-2' htmlFor="months">by month :</label>

            <select name="months" className="text-black text-md rounded-sm p-2 focus:outline-none" placeholder="select month" onChange={(e) => { setMonth(e) }} >

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

            <label className='text-2xl mr-2 ml-5 ' htmlFor="months">by year :</label>

            <input type="number" min="2000" max="2024" placeholder="2024" className="pl-2 text-black text-md rounded-sm p-1 focus:outline-none" onChange={(e) => { setYear(e) }} />


            <label className='text-2xl mr-2 ml-5' htmlFor="creator">by creator :</label>

            <select name="creator" className="text-black text-md rounded-sm p-2 focus:outline-none" onChange={(e) => { setAuthor(e) }} >

                <option className="text-black" value="">select creator</option>


                {

                    grouptotal?.map((each: any) => (
                        <option key={each.memberId} className="text-black" value={each.memberId}>{each.memberId === userid ? `${each.memberName} (me)` : each.memberName}</option>
                        
                    ))
                }

            </select>

            {!base && <button className='text-xl font-bold mr-2 ml-5 bg-green-800 h-9 w-20 text-yellow-200 hover:border-yellow-100 hover:border-2 mt-2 rounded-sm' onClick={filter} >Filter</button>}
            {base && <button className='text-xl font-bold mr-2 ml-5 bg-yellow-100 h-9 w-28 text-green-800 hover:border-2 hover:border-gray-500 mt-2 rounded-sm' >Filter : ON</button>}

            <button className='text-xl font-bold mr-2 ml-5 bg-green-800 h-9 w-20 text-yellow-200 hover:border-yellow-100 hover:border-2 mt-2 rounded-sm' onClick={reset} >Reset</button>

        </div>



    )

}

export default GroupFilter;