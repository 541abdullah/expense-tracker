'use client'

import { FaTrash } from "react-icons/fa";
import crudfunctions from "@/app/hooks/crudhooks";


interface props {
    selectedtransaction: string
}


const TrashTransaction = ({ selectedtransaction }: props) => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.pDelete();

    const deletetransaction = () => {


        mutateFunction({
            variables: {
                "input": selectedtransaction
            }
        })

    }

    return (

        <FaTrash className={"cursor-pointer"} onClick={deletetransaction} />

    )

}

export default TrashTransaction;