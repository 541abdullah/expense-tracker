"use client"

import { useState, useRef } from "react";
import AddGroupie from "./homepagemodules/searchgroupie";
import CurrentTeam from "./homepagemodules/viewcurrentteam";
import CreateGroup from "./homepagemodules/groupcreator";
import crudfunctions from "./hooks/crudhooks";
import { useRouter } from "next/navigation";
import getMe from "./hooks/useGetme";



const Groups = () => {


  const [addGroupie, setAddGroupie] = useState(false);
  const [viewcurrentteam, setViewcurrentteam] = useState(false);
  const router = useRouter()

  const teamviewed = (caller: string | null) => {

    if (caller === 'returner') {
      setViewcurrentteam(false);
    }
    else {
      setViewcurrentteam(true);
    }
  }

  const alladded = (caller: string | null) => {

    if (caller === 'canceler') {
      setAddGroupie(false);
    }
    else {
      setAddGroupie(true);
    }

    buttonref.current = {}
  }

  const { loading, error, data } = getMe.useGetMe();

  const { loading: groupdataloading, data: allgroups } = crudfunctions.useAllGroups(data.me.id);

  const buttonref = useRef<any>({});
  const { data: rawdata } = crudfunctions.useSearch();

  const personalsection = () => {
    router.push(`/personal/${data.me.id}`)
  }

  const groupclicker = (gid: string) => {

    router.push(`/group/${gid}/user/${data.me.id}`)
  }


  return (

    <>
      {

        addGroupie

          ?

          viewcurrentteam

            ?

            <CurrentTeam teamviewed={teamviewed} buttonref={buttonref} foundall={rawdata} />

            :

            <>

              <AddGroupie alladded={alladded} teamviewed={teamviewed} me={data.me} buttonref={buttonref} foundall={rawdata} />

            </>

          :

          <>

            <div className=" h-screen text-center">


              <span className="text-white font-bold text-4xl">Welcome back, {data.me.personalUsername} </span>

              <div className="min-h-96 max-h-96 mt-12 pb-20 w-3/6   border-solid bg-yellow-100  ml-80 overflow-y-scroll">


                <div className="h-24 w-50 bg-green-800  m-5 cursor-pointer relative hover:text-yellow-300 hover:shadow-lg " onClick={personalsection}>
                  <span className="font-medium text-5xl absolute left-5 top-5">Personal</span>
                </div>

                {

                  groupdataloading

                    ?

                    <></>

                    :

                    allgroups.user.allMyGroups.map((each: any) => (

                      <>

                        {each.alive

                          ?

                          <div className="h-24 w-50 flex flex-row-reverse bg-green-800 m-5  cursor-pointer relative  hover:text-yellow-300 hover:shadow-lg " onClick={() => { groupclicker(each.groupID) }}>
                            <span className="font-medium text-5xl absolute left-5 top-5">{each.groupName}</span>

                            <div className="mr-4 w-40 flex flex-row-reverse">


                              {each.members.map((eachlet: any) => (


                                eachlet.id != data.me.id

                                  ?

                                  <img key={eachlet.id} className=' cursor-default rounded-full  mt-4 -ml-8' style={{ "height": "65px", "width": "65px" }} src={eachlet.avatar}></img>

                                  :

                                  <></>


                              ))
                              }

                            </div>



                          </div>

                          :

                          <></>

                        }




                      </>))
                }


                <CreateGroup alladded={alladded} />


              </div>


            </div>

          </>


      }

    </>


  )


}

export default Groups;