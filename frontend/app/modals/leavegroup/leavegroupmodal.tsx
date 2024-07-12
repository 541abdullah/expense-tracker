import React, { ReactNode, useEffect } from 'react';
import ReactPortal from '../reactportal';
import GroupExitConfirmButton from './confirmbutton';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  selectedgroup: string,
  me: any
}


const GroupLeft = ({ children, isOpen, selectedgroup, me, handleClose }: ModalProps) => {

  useEffect(() => {

    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = 'unset'
    }


  }, [isOpen])


  if (!isOpen) return null;



  return (

    <ReactPortal wrapperId='react-portal-maker' >

      <>

        <div className=" fixed top-0 left-0 opacity-90 bg-neutral-900 h-screen w-screen z-40"></div>

        <div className=' fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-50'>
          <div className=" h-52 w-80 rounded-3xl bg-gray-500">
            <div className="flex-row h-28 rounded-3xl justify-center text-center items-center bg-gray-500">

              <div className=" font-medium text-3xl mt-5 text-yellow-100">
                are you sure ?
              </div>


              <div className=" font-medium text-xl mt-5 text-yellow-100">
                leaving the group will not delete your transaction data
              </div>

            </div>

            <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 rounded-md w-24 h-12 ml-10 mt-5 " onClick={handleClose} >cancel</button>

            <GroupExitConfirmButton selectedgroup={selectedgroup} me={me} handleClose={handleClose} />

          </div>

        </div>

      </>

    </ReactPortal>


  )



}

export default GroupLeft;