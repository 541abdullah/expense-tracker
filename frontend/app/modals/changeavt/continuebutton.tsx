'use client'

import crudfunctions from '@/app/hooks/crudhooks';
import getMe from '@/app/hooks/useGetme';


interface props {
    selectedavt: string,
    handleClose: () => void
}


const AvtContinue = ({ selectedavt, handleClose }: props) => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.changeAvt();
    const { data: me, refetch } = getMe.useGetMe();

    const avtchanged = () => {


        document.getElementById('bigimage')!.setAttribute('src', selectedavt);

        mutateFunction({
            variables: {
                "input": {
                    "username": me.me.personalUsername,
                    "avatar": selectedavt,
                }
            },
            onCompleted(data, clientOptions) {
                handleClose()
                refetch()
            },
        })



    }

    return (

        <button className="mt-2 bg-green-800 text-yellow-200 hover:border-2 hover:border-gray-600 h-12 mb-56 w-40 disabled:opacity-50 disabled:cursor-not-allowed" disabled={selectedavt === ""} onClick={avtchanged}>continue</button>

    )

}

export default AvtContinue;