'use client'
import authenticatedVar from "@/app/authVar";
import crudfunctions from "@/app/hooks/crudhooks";



const LogoutConfirmButton = () => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.useLogout();

    const loguserout = () => {


        try {

            mutateFunction()

        } catch (err) {
            console.log(err)
        }

        authenticatedVar(false);


    }

    return (


        <button className="bg-blue-800 hover:border-2 hover:border-yellow-100 text-yellow-100 rounded-md w-24 h-12 ml-12 " onClick={loguserout} >confirm</button>

    )

}

export default LogoutConfirmButton;