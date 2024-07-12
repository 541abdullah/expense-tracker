'use client'

import crudfunctions from "@/app/hooks/crudhooks";


interface props {
    buttonref: any,
    groupid: string,
    foundall: any,
    handleClose: () => void
}

interface each {
    personalUsername: string,
    avatar: string
    id: string
}

const AddMemberConfirmButton = ({ buttonref, groupid, foundall, handleClose }: props) => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.creategroup();

    const addmember = () => {


        try {

            foundall.users.map((user: each) => {
                if (buttonref.current[user.personalUsername]) {


                    mutateFunction({
                        variables: {
                            "input": {
                                "groupID": groupid,
                                "memberName": user.personalUsername,
                                "memberId": user.id
                            }
                        },

                    })

                }
            })

        } catch (err) {
            console.log(err)
        }

        handleClose()





    }

    return (

        <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 w-40 h-12 absolute left-80" style={{ "marginTop": "-505px" }} onClick={addmember} >confirm</button>

    )

}

export default AddMemberConfirmButton;