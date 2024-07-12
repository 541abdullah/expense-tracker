'use client'

import { useState } from "react"
import DeleteUser from "@/app/modals/deleteacc/delusermodal";

interface props {
    id: string
}

const DeleteAccButton = ({ id }: props) => {

    const [showdelmodal, setShowdelmodal] = useState(false);

    const delacc = () => {
        setShowdelmodal(true);
    }


    return (

        <>

            {showdelmodal && (<DeleteUser isOpen={showdelmodal} handleClose={() => { setShowdelmodal(false) }} id={id}></DeleteUser>)}
            <button className="h-8 w-40 mt-6 text-base text-yellow-200 hover:border-2 hover:border-yellow-100 bg-red-700" onClick={delacc}>Delete Account</button>

        </>

    )

}

export default DeleteAccButton;