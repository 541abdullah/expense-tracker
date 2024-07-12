'use client'


interface Props {
    alladded: (value: null) => void
}



const CreateGroup = ({ alladded }: Props) => {



    return (

        <>

            <div className="h-24 w-50 m-5 -mb-14 relative  hover:border-solid bg-gray-500 hover:text-yellow-300 cursor-pointer" onClick={() => { alladded(null) }}>
                <span className="font-medium text-5xl absolute left-5 top-5">create a group</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-24 absolute -right-0 top-0 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>


            </div>
        </>

    )

}

export default CreateGroup;








