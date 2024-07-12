"use client"

import { useState } from "react";
import Link from "next/link";
import RadioButton from "../components/radioButton";
import InputField from "../components/Inputfield";
import SelectAvt from "./selectavtmodal";

import React from "react";
import crudfunctions from "../hooks/crudhooks";
import authenticatedVar from "../authVar";


const SignUpPage = () => {


	const [mutateFunction, { data, loading, error }] = crudfunctions.createUser();
	const [mutateFunctiontwo] = crudfunctions.useLogin();

	const [signUpData, setSignUpData] = useState({
		name: "",
		username: "",
		password: "",
		gender: "",
	});

	const [alreadychosen, setAlreadychosen] = useState(false);

	const [avatarstate, setAvatarstate] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		if (type === "radio") {
			setSignUpData((prevData) => ({
				...prevData,
				gender: value,
			}));
		} else {
			setSignUpData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault();

		try {

			await mutateFunction({
				variables: {
					"input": {
						"personalUsername": signUpData.username,
						"password": signUpData.password,
						"avatar": 'none'
					}
				},

			})

			mutateFunctiontwo({
				variables: {
					"input": {
						"username": signUpData.username,
						"password": signUpData.password,
					}
				},
				onCompleted(data, clientOptions) {
					authenticatedVar(true);
					setAlreadychosen(false);
				},


			})

			setAvatarstate(true);

		} catch (err) {

			console.log(err);
			setAlreadychosen(true);

		}

	};


	return (

		<>
			{avatarstate ?

				<SelectAvt username={signUpData.username} />


				:

				<div className='h-screen flex justify-center items-center'>
					<div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
						<div className='w-full bg-yellow-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
							<div className='max-w-md w-full p-6'>
								<h1 className='text-3xl font-semibold mb-6 text-black text-center'>Sign Up</h1>
								<h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
									Join to keep track of your expenses
								</h1>
								<form className='space-y-4' onSubmit={handleSubmit}>
									<InputField
										label='Full Name'
										id='name'
										name='name'
										value={signUpData.name}
										onChange={handleChange}
									/>
									<InputField
										label='Username'
										id='username'
										name='username'
										value={signUpData.username}
										onChange={handleChange}
									/>

									{alreadychosen && < h1 className='text-sm font-bold mb-4 text-red-500 text-center'>
										*username already in use, please retry
									</h1>}


									{signUpData.username.length != 0 && signUpData.username.length < 8 && <h1 className='text-sm font-bold mb-4 text-red-500 text-center'>
										*username must be greater than seven characters
									</h1>}

									<InputField
										label='Password'
										id='password'
										name='password'
										type='password'
										value={signUpData.password}
										onChange={handleChange}
									/>
									<div className='flex gap-10'>
										<RadioButton
											id='male'
											label='Male'
											name='gender'
											value='male'
											onChange={handleChange}
											checked={signUpData.gender === "male"}
										/>
										<RadioButton
											id='female'
											label='Female'
											name='gender'
											value='female'
											onChange={handleChange}
											checked={signUpData.gender === "female"}
										/>
									</div>

									<div>
										<button
											type='submit'
											className='w-full bg-green-800 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-green-800 focus:ring-2 focus:ring-offset-2 focus:ring-green-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
											disabled={signUpData.username.length == 0 || signUpData.username.length < 8 || signUpData.password.length == 0 || signUpData.name.length == 0 || signUpData.gender.length == 0}
										>
											Sign Up
										</button>
									</div>
								</form>
								<div className='mt-4 text-sm text-gray-600 text-center'>
									<p>
										Already have an account?{" "}
										<Link href='/login' className='text-black hover:underline'>
											Login here
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>



			}
		</>

	);
};

export default SignUpPage;