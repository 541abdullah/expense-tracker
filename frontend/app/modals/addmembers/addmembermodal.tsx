"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import ReactPortal from '../reactportal';
import AddMemberConfirmButton from './confirmbutton';
import JustAdded from './viewaddedmembers';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  buttonref: any,
  foundall: any
  handleClose: () => void;
  memberObject: any,
  groupid: string
}

interface each {
  personalUsername: string,
  avatar: string
  id: string,

}


const AddMembers = ({ groupid, memberObject, buttonref, foundall, children, isOpen, handleClose }: ModalProps) => {


  const [userarray, setUserarray] = useState<each[] | null[]>([]);
  const [refresher, setRefresher] = useState<boolean>()
  const [nestedmodal, setNestedmodal] = useState(false);


  const searching = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.value == "") {
      setUserarray([]);

    } else {

      const piece = `^${e.target.value}.*$`;
      let regexx = new RegExp(piece, "i");

      const userarray = foundall.users.filter((user: each) => {


        if (memberObject[user.id] && memberObject[user.id][2]) {
          return false;
        }

        return regexx.test(user.personalUsername)
      })

      if (userarray.length == 0) {
        setUserarray([null])
      } else {
        setUserarray(userarray)
      }

    }

  }

  const adduser = (user: string) => {

    buttonref.current[user] = true;
    setRefresher(!refresher)

  }

  const removeuser = (user: string) => {

    buttonref.current[user] = false;
    setRefresher(!refresher)

  }


  useEffect(() => {

    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = 'unset'
    }


  }, [isOpen])


  if (!isOpen) return null;

  
  const nestedmodalaction = (controller: string | null) => {

    if (controller === 'returner') {
      setNestedmodal(false);
    } else {
      setNestedmodal(true);
    }

  }



  return (

    <ReactPortal wrapperId='react-portal-maker'>

      <>

        <div className=" fixed top-0 left-0 opacity-90 bg-neutral-900 h-screen w-screen z-40"></div>


        {
          nestedmodal

            ?

            <JustAdded buttonref={buttonref} foundall={foundall} nestedmodalaction={nestedmodalaction} />

            :


            <div className='fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-50'>


              <div className="mt-16 h-4/5 w-1/2 rounded-lg overflow-y-scroll bg-gray-300">
                <div className="flex h-28 justify-center items-center bg-gray-300">

                  <input type="text" id="simple-search" className="h-28 text-4xl focus:outline-none bg-gray-50 border border-gray-200 text-gray-900 rounded-lg block w-full ps-10 p-2.5" placeholder="search user name..." required onChange={(e) => { searching(e) }} />

                </div>


                {userarray[0] === null

                  ?

                  <div className="flex flex-col justify-center items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-40 mt-14 text-white ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>


                    <span className="font-bold text-white text-4xl ">username not found</span>

                  </div>

                  :

                  userarray.map((user: each | null) =>

                    <div className="relative text-white h-24 bg-blue-800 m-1 " key={user!.personalUsername}>

                      <img className=' cursor-default rounded-full absolute top-4 left-4' style={{ "height": "65px", "width": "65px" }} src={user!.avatar}></img>
                      <span className='font-medium text-3xl absolute left-24 top-7' >{user!.personalUsername}</span>

                      {!buttonref.current[user!.personalUsername] && <button className="bg-yellow-100 text-blue-800 h-12 mb-56 w-40 absolute right-5 top-6 hover:border-2 hover:border-gray-400" onClick={() => { adduser(user!.personalUsername) }} >add</button>}
                      {buttonref.current[user!.personalUsername] && <button className="bg-yellow-100 text-blue-800 h-12 mb-56 w-40 absolute right-5 top-6 hover:border-2 hover:border-gray-400" onClick={() => { removeuser(user!.personalUsername) }} >remove</button>}

                    </div>

                  )
                }


              </div>


              <button className="bg-blue-800 text-yellow-200 w-40 h-12 absolute hover:border-2 hover:border-yellow-100 " style={{ "marginTop": "-505px" }} onClick={handleClose} >cancel</button>

              <AddMemberConfirmButton buttonref={buttonref} groupid={groupid} foundall={foundall} handleClose={handleClose} />


              <button className="bg-blue-800 text-yellow-200 w-40 h-12 absolute  right-80 hover:border-2 hover:border-yellow-100" style={{ "marginTop": "-505px" }} onClick={() => { nestedmodalaction(null) }} >view selected</button>

            </div>



        }

      </>


    </ReactPortal >

  )

}

export default AddMembers;