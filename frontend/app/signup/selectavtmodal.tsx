'use client'

import { useState } from "react";
import crudfunctions from "../hooks/crudhooks";
import { useRouter } from "next/navigation"



interface props {
	username: string
}

const SelectAvt = ({ username }: props) => {

	const router = useRouter();
	const [newavt, setNewavt] = useState("");
	const [mutateFunction, { data, loading, error }] = crudfunctions.changeAvt();
	const [selectborder, setSelectborder] = useState("")

	const avatarselector = (avt: string) => {
		setNewavt(avt)
		setSelectborder(avt)
	}

	const continueHandler = () => {

		router.push('/')
		mutateFunction({
			variables: {
				"input": {
					"username": username,
					"avatar": newavt,
				}
			},
		})

	}



	return (


		<div className='h-screen flex justify-center items-center'>
			<div className=" h-4/5 w-1/2 rounded-lg overflow-hidden bg-gray-300 z-40">
				<div className="flex h-28 justify-center items-center bg-yellow-100">
					<span className="  font-bold text-green-900 text-5xl">
						choose your avatar
					</span>

				</div>
				<div className="flex h-40 justify-evenly items-center flex-row flex-wrap bg-yellow-100 -mt-5">

					<img className={`cursor-pointer rounded-full ${selectborder == "https://cdn.dribbble.com/users/31752/screenshots/3676439/media/004262f6f5629eaf735273662929bd73.jpg" ? `border-2 border-red-800` : `border-0`}`} style={{ "height": "120px", "width": "120px" }} src="https://cdn.dribbble.com/users/31752/screenshots/3676439/media/004262f6f5629eaf735273662929bd73.jpg" onClick={() => avatarselector("https://cdn.dribbble.com/users/31752/screenshots/3676439/media/004262f6f5629eaf735273662929bd73.jpg")}></img>
					<img className={`cursor-pointer rounded-full ${selectborder == "https://cdn.dribbble.com/users/31752/screenshots/3567301/media/9d4e71c8c4d55ad9077b584336192b32.jpg" ? `border-2 border-red-800` : `border-0`}`} style={{ "height": "120px", "width": "120px" }} src="https://cdn.dribbble.com/users/31752/screenshots/3567301/media/9d4e71c8c4d55ad9077b584336192b32.jpg" onClick={() => avatarselector("https://cdn.dribbble.com/users/31752/screenshots/3567301/media/9d4e71c8c4d55ad9077b584336192b32.jpg")} ></img>
					<img className={`cursor-pointer rounded-full ${selectborder == "https://cdn.dribbble.com/users/31752/screenshots/4695241/media/b47c0a7156612c9d2d5d813e2e261220.png" ? `border-2 border-red-800` : `border-0`}`} style={{ "height": "120px", "width": "120px" }} src="https://cdn.dribbble.com/users/31752/screenshots/4695241/media/b47c0a7156612c9d2d5d813e2e261220.png" onClick={() => avatarselector("https://cdn.dribbble.com/users/31752/screenshots/4695241/media/b47c0a7156612c9d2d5d813e2e261220.png")}></img>


				</div>

				<div className="flex h-40 justify-evenly items-center flex-row flex-wrap bg-yellow-100">

					<img className={`cursor-pointer rounded-full ${selectborder == "https://cdn.dribbble.com/users/31752/screenshots/6488735/crane.png" ? `border-2 border-red-800` : `border-0`}`} style={{ "height": "120px", "width": "120px" }} src="https://cdn.dribbble.com/users/31752/screenshots/6488735/crane.png" onClick={() => avatarselector("https://cdn.dribbble.com/users/31752/screenshots/6488735/crane.png")}></img>
					<img className={`cursor-pointer rounded-full ${selectborder == "https://cdn.dribbble.com/users/31752/screenshots/11487537/media/3ddf40a65aae308bf96e39068c280b6b.png" ? `border-2 border-red-800` : `border-0`}`} style={{ "height": "120px", "width": "120px" }} src="https://cdn.dribbble.com/users/31752/screenshots/11487537/media/3ddf40a65aae308bf96e39068c280b6b.png" onClick={() => avatarselector("https://cdn.dribbble.com/users/31752/screenshots/11487537/media/3ddf40a65aae308bf96e39068c280b6b.png")}></img>
					<img className={`cursor-pointer rounded-full ${selectborder == "https://cdn.dribbble.com/users/31752/screenshots/10726527/media/9d532373400f9ccf5c9edb03c4d173de.jpg" ? `border-2 border-red-800` : `border-0`}`} style={{ "height": "120px", "width": "120px" }} src="https://cdn.dribbble.com/users/31752/screenshots/10726527/media/9d532373400f9ccf5c9edb03c4d173de.jpg" onClick={() => avatarselector("https://cdn.dribbble.com/users/31752/screenshots/10726527/media/9d532373400f9ccf5c9edb03c4d173de.jpg")}></img>


				</div>



				<div className="flex h-40 justify-evenly items-center flex-row flex-wrap bg-yellow-100">

					<button className="mt-2 bg-green-800 text-yellow-200 hover:border-2 hover:border-gray-600  h-12 mb-56 w-40 disabled:opacity-50 disabled:cursor-not-allowed" disabled={newavt === ""} onClick={continueHandler}>continue</button>

				</div>



			</div>
		</div>



	)

}

export default SelectAvt;