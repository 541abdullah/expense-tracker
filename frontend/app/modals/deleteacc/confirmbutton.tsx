'use client'

import crudfunctions from '@/app/hooks/crudhooks';
import { useRouter } from 'next/navigation';


interface props {
    id: string
}

const Delconfirm = ({ id }: props) => {

    const router = useRouter()

    const [mutateFunction, { data, loading, error }] = crudfunctions.userDel()

    const deleteuser = () => {

        mutateFunction({
            variables: {
                "input": id
            },
            onCompleted(data, clientOptions) {
                router.push('/signup')
            },
        })

    }

    return (

        <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100  rounded-md w-24 h-12 ml-12 mt-5 " onClick={deleteuser} >confirm</button>

    )

}

export default Delconfirm;