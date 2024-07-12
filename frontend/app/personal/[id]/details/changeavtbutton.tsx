'use client'

import { useState } from "react"
import ChangeAvtModal from "@/app/modals/changeavt/changeavtmodal";




const ChangeAvtButton = () => {

    const [showmodal, setShowmodal] = useState(false);

    const avatarchanger = () => {
        setShowmodal(true);
    }

    return (

        <>

            {showmodal && (<ChangeAvtModal isOpen={showmodal} handleClose={() => { setShowmodal(false) }}></ChangeAvtModal>)}
            <button className="h-8 w-40  mt-3 text-base text-yellow-200 bg-blue-900 hover:border-2 hover:border-yellow-100" onClick={avatarchanger}>change avatar</button>

        </>

    )

}

export default ChangeAvtButton;