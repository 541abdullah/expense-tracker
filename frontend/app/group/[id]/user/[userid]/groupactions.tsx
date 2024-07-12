'use client'

import { useRef, useState } from "react"
import AddMembers from "@/app/modals/addmembers/addmembermodal";
import GroupNewName from "@/app/modals/grouprename/grouprenamemodal";
import ViewMembers from "@/app/modals/viewmembers/memviewmodal";
import NewNickName from "@/app/modals/changenickname/nicknamemodal";
import crudfunctions from "@/app/hooks/crudhooks";
import GroupLeft from "@/app/modals/leavegroup/leavegroupmodal";


interface props {
	groupid: string,
	userid: string,
	grouptotal: [any],
	memberObject: any
}


const GroupActions = ({ memberObject, grouptotal, groupid, userid }: props) => {

	const [memberaddermodal, setMemberaddermodal] = useState(false);
	const [grouprenamemodal, setGrouprenamemodal] = useState(false);
	const [nicknamemodal, setNicknamemodal] = useState(false);
	const [memberviewmodal, setMemberviewmodal] = useState(false);
	const [groupexitmodal, setGroupexitmodal] = useState(false);

	const buttonref = useRef<any>({});
	const { data: rawdata } = crudfunctions.useSearch();
	const addmoremembers = () => {
		setMemberaddermodal(true);
	};

	const grouprename = () => {
		setGrouprenamemodal(true);
	};

	const nicknamer = () => {
		setNicknamemodal(true);
	};

	const memberviewer = () => {
		setMemberviewmodal(true);
	};

	const handleMemberAdder = () => {

		setMemberaddermodal(false)
		buttonref.current = {}
	}

	const groupleaver = () => {

		setGroupexitmodal(true);

	}

	return (

		<>


			{memberaddermodal && (<AddMembers groupid={groupid} memberObject={memberObject} buttonref={buttonref} foundall={rawdata} isOpen={memberaddermodal} handleClose={handleMemberAdder}></AddMembers>)}

			{grouprenamemodal && (<GroupNewName groupid={groupid} isOpen={grouprenamemodal} handleClose={() => { setGrouprenamemodal(false) }}></GroupNewName>)}

			{nicknamemodal && (<NewNickName groupid={groupid} userid={userid} isOpen={nicknamemodal} handleClose={() => { setNicknamemodal(false) }}></NewNickName>)}

			{memberviewmodal && (<ViewMembers grouptotal={grouptotal} groupid={groupid} userid={userid} isOpen={memberviewmodal} handleClose={() => { setMemberviewmodal(false) }}></ViewMembers>)}

			{groupexitmodal && (<GroupLeft isOpen={groupexitmodal} selectedgroup={groupid} me={userid} handleClose={() => { setGroupexitmodal(false) }}></GroupLeft>)}


			<div className=" mt-10 h-20 -mb-14" >

				<span className='text-3xl font-bold  z-60 mr-4  inline-block text-gray-100 '>
					group actions
				</span>

				<button className="h-10 w-44 ml-10 bg-yellow-100 text-green-800 hover:border-2 hover:border-gray-500 rounded-sm" onClick={grouprename}>
					change groupname
				</button>

				<button className="h-10 w-44 ml-10 bg-yellow-100 text-green-800 hover:border-2 hover:border-gray-500 rounded-sm" onClick={nicknamer}>
					change nickname
				</button>

				<button className="h-10 w-36 ml-10 bg-yellow-100 text-green-800 hover:border-2 hover:border-gray-500 rounded-sm" onClick={addmoremembers}>
					add members
				</button>

				<button className="h-10 w-32 ml-10 bg-yellow-100 text-green-800 hover:border-2 hover:border-gray-500 rounded-sm" onClick={memberviewer}>
					view members
				</button>

				<button className="h-10 w-32 ml-10 bg-yellow-100 text-green-800 hover:border-2 hover:border-gray-500 rounded-sm" onClick={groupleaver}>
					leave group
				</button>


			</div>

		</>

	)

}

export default GroupActions;