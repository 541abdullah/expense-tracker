'use client'

import crudfunctions from "@/app/hooks/crudhooks";
import { useRouter } from "next/navigation";

interface props {
    selectedgroup: string,
    me: any,
    handleClose: () => void;
}



const GroupExitConfirmButton = ({ selectedgroup, me, handleClose }: props) => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.leavegroup();
    const router = useRouter();

    const leavegroup = () => {

        mutateFunction({
            variables: {
                "input": {
                    "groupID": selectedgroup,
                    "memberId": me,
                }
            },
            onCompleted(data, clientOptions) {
                handleClose()
                router.push('/')
            },

        })


    }

    return (

        <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 rounded-md w-24 h-12 ml-12 mt-5 " onClick={leavegroup}>confirm</button>

    )

}

export default GroupExitConfirmButton;