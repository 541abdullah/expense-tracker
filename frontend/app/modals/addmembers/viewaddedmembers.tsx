import { useState } from "react";


interface Props {
    nestedmodalaction: (value: string) => void,
    buttonref: any,
    foundall: any
}

interface each {
    personalUsername: string,
    avatar: string
}


const JustAdded = ({ buttonref, foundall, nestedmodalaction }: Props) => {


    const [allmembers, setAllmembers] = useState<each[] | []>(foundall.users.filter((user: each) => {
        return buttonref.current[user.personalUsername]
    }));


    const dontadd = (person: string) => {

        buttonref.current[person] = false;
        setAllmembers(allmembers.filter((each: any) => {
            if (each.personalUsername === person) {
                return false
            }
            return true;
        }))

    }



    return (

        <div className='fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-50'>

            < button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-200 h-12 mb-56 w-40 absolute  top-5" onClick={() => { nestedmodalaction("returner") }} >return</button>

            <div className=" h-4/5 w-1/2 rounded-lg overflow-y-scroll bg-gray-300 mt-14">




                {

                    allmembers.length == 0

                        ?

                        <div className="flex flex-col justify-center items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-40 mt-28 text-white ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>


                            <span className="font-bold text-4xl text-white">no users added yet</span>
                        </div>

                        :


                        allmembers.map((user: each) =>

                            <div className="relative h-24 text-white bg-blue-800 m-1 " key={user!.personalUsername}>

                                <img className=' cursor-default rounded-full absolute top-4 left-4' style={{ "height": "65px", "width": "65px" }} src={user!.avatar}></img>
                                <span className='font-medium text-3xl absolute left-24 top-7' >{user!.personalUsername}</span>

                                <button className="bg-yellow-100 text-blue-800 hover:border-2 hover:border-gray-400 h-12 mb-56 w-40 absolute right-5 top-6" onClick={() => { dontadd(user!.personalUsername) }} >remove</button>

                            </div>


                        )


                }

            </div>
        </div>





    )

}

export default JustAdded;





















