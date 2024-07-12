"use client"

import { useState } from "react";
import Link from "next/link";
import InputField from "../components/Inputfield";
import crudfunctions from "../hooks/crudhooks";
import authenticatedVar from "../authVar";
import { useRouter } from "next/navigation";

const LoginPage = () => {

	const [mutateFunction, { data, loading, error }] = crudfunctions.useLogin();
	const [unauth, setUnauth] = useState(false);
	const router = useRouter();


	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {

			await mutateFunction({
				variables: {
					"input": {
						"username": loginData.username,
						"password": loginData.password,
					}
				},
				onCompleted(data, clientOptions) {
					authenticatedVar(true);
					setUnauth(false);
					router.push('/')

				},


			})

		} catch (err) {
			console.log(err);
			setUnauth(true);
		}





	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='w-full bg-yellow-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
					<div className='max-w-md w-full p-6'>
						<h1 className='text-3xl font-semibold mb-6 text-black text-center'>Login</h1>
						<h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
							Welcome back! Log in to your account
						</h1>

						<form className='space-y-4' onSubmit={handleSubmit}>
							<InputField
								label='Username'
								id='username'
								name='username'
								value={loginData.username}
								onChange={handleChange}
							/>

							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={loginData.password}
								onChange={handleChange}
							/>
							<div>

								{unauth && <h1 className='text-sm font-bold mb-4 text-red-500 text-center'>
									*wrong username or password, please retry
								</h1>}

								<button
									type='submit'
									className='w-full bg-green-800 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-green-800  focus:ring-2 focus:ring-offset-2 focus:ring-green-900 transition-colors duration-300
										disabled:opacity-50 disabled:cursor-not-allowed
									'
								>
									Login
								</button>
							</div>
						</form>
						<div className='mt-4 text-sm text-gray-600 text-center'>
							<p>
								{"Don't"} have an account?{" "}
								<Link href='/signup' className='text-black hover:underline'>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;