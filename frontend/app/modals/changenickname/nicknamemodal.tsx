
import React, { ReactNode, useEffect, useState } from 'react';
import ReactPortal from '../reactportal';
import NicknameConfirmButton from './confirmbutton';

interface ModalProps {
  groupid: string,
  userid: string
  children?: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}



const NewNickName = ({ groupid, userid, children, isOpen, handleClose }: ModalProps) => {

  const [newname, setNewname] = useState("")

  useEffect(() => {

    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = 'unset'
    }


  }, [isOpen])

  const nickname = (e: React.ChangeEvent<HTMLInputElement>) => {

    setNewname(e.target.value);

  }


  if (!isOpen) return null;



  return (

    <ReactPortal wrapperId='react-portal-maker'>

      <>

        <div className=" fixed top-0 left-0 opacity-90 bg-neutral-900 h-screen w-screen z-40"></div>

        <div className='fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-50'>
          <div className=" h-48 w-80 rounded-3xl bg-gray-500">
            <div className="flex-row h-28 rounded-3xl justify-center items-center text-center">

              <div className=" text-yellow-200 font-medium text-xl mt-5">
                enter new nickname
              </div>

              <input type="text" id="simple-search" className="h-12 text-xl focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-64 ml-8 mt-4 ps-4 p-2.5" placeholder="..." required onChange={(e) => { nickname(e) }} />

            </div>

            <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 rounded-md w-24 h-12 ml-10 " onClick={handleClose} >cancel</button>

            <NicknameConfirmButton gid={groupid} userid={userid} newname={newname} handleClose={handleClose} />

          </div>

        </div>



      </>
    </ReactPortal>


  )



}

export default NewNickName;