'use client'

import crudfunctions from "@/app/hooks/crudhooks"

interface props {
    gid: string,
    userid: string,
    newname: string,
    handleClose: () => void

}

const NicknameConfirmButton = ({ gid, userid, newname, handleClose }: props) => {


    const [mutateFunction, { data, loading, error }] = crudfunctions.renamegroup()

    const newnickname = () => {

        mutateFunction({
            variables: {
                "input": {
                    "groupID": gid,
                    "memberName": newname,
                    "memberId": userid
                }
            },
            onCompleted(data, clientOptions) {
                handleClose()
            },
        })

    }

    return (


        <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100rounded-md w-24 h-12 ml-12 disabled:opacity-50 disabled:cursor-not-allowed " onClick={newnickname} disabled={newname.length == 0} >confirm</button>

    )

}

export default NicknameConfirmButton;