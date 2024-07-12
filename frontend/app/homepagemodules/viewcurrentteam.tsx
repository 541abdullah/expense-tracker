'use client'

import { useState } from "react"


interface Props {
    teamviewed: (value: string) => void,
    buttonref: any,
    foundall: any
}


interface each {
    personalUsername: string,
    avatar: string
}

const CurrentTeam = ({ teamviewed, buttonref, foundall }: Props) => {


    const [allmembers, setAllmembers] = useState<each[] | []>(foundall.users.filter((user: each) => {
        return buttonref.current[user.personalUsername]
    }));


    const dontadd = (person: string) => {

        buttonref.current[person] = false;
        setAllmembers(allmembers.filter((each) => {
            if (each.personalUsername === person) {
                return false
            }
            return true;
        }))

    }

    return (



        <div className='h-screen flex justify-center items-center'>

            <button className=" h-12 mb-56 w-40 absolute  top-40 bg-green-800 text-yellow-200 hover:border-2 hover:border-yellow-100" onClick={() => { teamviewed('returner') }} >return</button>

            <div className=" h-4/5 w-1/2 rounded-lg overflow-y-scroll bg-yellow-100 z-10">

                {

                    allmembers.length == 0

                        ?

                        <div className="flex flex-col justify-center items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-40 mt-28 text-gray-600 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>


                            <span className=" text-gray-600 font-bold text-4xl ">no users added yet</span>
                        </div>

                        :


                        allmembers.map((user: each) =>

                            <div className="relative h-24 bg-green-800 m-1 " key={user!.personalUsername}>

                                <img className=' cursor-default rounded-full absolute top-4 left-4' style={{ "height": "65px", "width": "65px" }} src={user!.avatar}></img>
                                <span className='font-medium text-3xl absolute left-24 top-7' >{user!.personalUsername}</span>

                                <button className="bg-yellow-100 text-green-800 hover:border-2 hover:border-gray-400 h-12 mb-56 w-40 absolute right-5 top-6" onClick={() => { dontadd(user!.personalUsername) }} >remove</button>

                            </div>


                        )



                }




            </div>
        </div>



    )

}

export default CurrentTeam;

