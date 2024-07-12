
import React, { ReactNode, useEffect } from 'react';
import ReactPortal from '../reactportal';
import Link from 'next/link'

interface ModalProps {

  grouptotal: [any],
  userid: string
  children?: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  groupid: string
}


const ViewMembers = ({ grouptotal, groupid, userid, children, isOpen, handleClose }: ModalProps) => {


  let groupred = [];
  let grouptotallocal = [];

  for (let i = 0; i < grouptotal.length; i++) {
    if (!grouptotal[i].alive) {
      groupred.push(grouptotal[i])
    } else {
      grouptotallocal.push(grouptotal[i])
    }
  }

  groupred.forEach((each) => {
    grouptotallocal.push(each)
  })

  useEffect(() => {

    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = 'unset'
    }


  }, [isOpen])


  if (!isOpen) return null;








  return (

    <ReactPortal wrapperId='react-portal-maker'>

      <>

        <div className=" fixed top-0 left-0 opacity-90 bg-neutral-900 h-screen w-screen z-40"></div>

        <div className='fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-50'>


          <button className="bg-blue-800 text-yellow-200 hover:border-2 hover:border-yellow-100 h-12 mb-56 w-40 absolute  top-3" onClick={handleClose} >return</button>

          <span className="absolute top-4 text-white text-2xl font-bold mt-16 ">*members highlighted in red have left the group</span>



          <div className="h-4/6  w-1/2 rounded-lg overflow-y-scroll bg-gray-500 mt-20">


            {
              grouptotallocal.map((each) => (

                <Link key={each.memberId} href={`${userid}/details/${each.memberId}`}>
                  <div className={each.alive ? "relative h-24 bg-blue-800 hover:border-2 hover:border-yellow-200 text-white m-1 cursor-pointer " : " text-white relative h-24 bg-red-700  hover:border-2 hover:border-yellow-200 m-1 cursor-pointer "} >

                    <img className=' cursor-default rounded-full absolute top-4 left-4' style={{ "height": "65px", "width": "65px" }} src={each.member.avatar}></img>
                    <span className='font-medium text-3xl absolute left-24 top-7' >{each.memberId === userid ? `${each.memberName} (me)` : each.memberName}</span>

                  </div>
                </Link>

              ))
            }


          </div>
        </div>

      </>
    </ReactPortal>




  )



}

export default ViewMembers;