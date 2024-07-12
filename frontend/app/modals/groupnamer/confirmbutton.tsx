'use client'

import crudfunctions from '@/app/hooks/crudhooks';

interface props {
    me: any,
    groupname: string,
    buttonref: any,
    foundall: any,
    alladded: (value: string) => void,
    handleClose: () => void;
}


interface each {
    personalUsername: string,
    avatar: string
    id: string
}


const NamedGroup = ({ me, buttonref, groupname, foundall, handleClose, alladded }: props) => {

    const [mutateFunction, { data, loading, error }] = crudfunctions.creategroup();
    const groupcreation = async () => {


        try {

            let groupid: string;


            await mutateFunction({
                variables: {
                    "input": {
                        "groupName": groupname,
                        "memberName": me.personalUsername,
                        "memberId": me.id
                    }
                },
                onCompleted(data, clientOptions) {
                    groupid = data.createMemberOfGroup.groupID;
                },

            })


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
            console.log(err);
        }


        handleClose()
        alladded('canceler')

    }

    return (

        <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 rounded-md w-24 h-12 ml-12 disabled:opacity-50 disabled:cursor-not-allowed " onClick={groupcreation} disabled={groupname.length == 0}  >confirm</button>

    )

}

export default NamedGroup;