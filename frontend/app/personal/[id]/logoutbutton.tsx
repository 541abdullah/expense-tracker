'use client'

import { useState } from "react";
import { MdLogout } from "react-icons/md";
import LogoutConfirm from "@/app/modals/logout/logoutmodal";

const LogoutButton = () => {

    const [logoutmodal, setLogoutmodal] = useState(false);

    const handleLogout = () => {
        setLogoutmodal(true);
    };

    return (

        <>

            {logoutmodal && (<LogoutConfirm isOpen={logoutmodal} handleClose={() => { setLogoutmodal(false) }}></LogoutConfirm>)}
            <MdLogout className='mx-2 w-8 h-8 cursor-pointer absolute -mt-12 right-64' onClick={handleLogout} />

        </>

    )

}

export default LogoutButton;