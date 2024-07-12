'use client'

import crudfunctions from "@/app/hooks/crudhooks"


interface props {
    gid: string,
    newname: string
    handleClose: () => void
}

const GroupRenameConfirmButton = ({ gid, newname, handleClose }: props) => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.renamegroup()

    const renamegroup = () => {

        mutateFunction({
            variables: {
                "input": {
                    "groupID": gid,
                    "groupName": newname
                }
            },
            onCompleted(data, clientOptions) {
                handleClose()
            },
        })

    }

    return (


        <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 rounded-md w-24 h-12 ml-12 disabled:opacity-50 disabled:cursor-not-allowed " onClick={renamegroup} disabled={newname.length == 0} >confirm</button>

    )

}

export default GroupRenameConfirmButton;