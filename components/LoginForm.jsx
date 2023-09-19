'use client'


import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const router = useRouter()
    const params = useSearchParams()
    const [error, setError] = useState('')

    const [data, setData] = useState(
        {
            email: '',
            password: '',
        }
    )

    useEffect(() => {
        setError(params.get("error"));
    }, [params]);


    const loginUser = async (e) => {
        e.preventDefault()
        try {
            signIn('credentials', {
                ...data,
                redirect: true,
            },
                setError('')
            )
        } catch (error) {
            console.log('login error:', error)
            setError(error)
        }

    }

    return (
        <>
            <div className='flex items-center justify-center w-full'>
                <p className="logo_text my-5 text-5xl flex items-center justify-center">Zaloguj <span className="blue_gradient ml-2"> się</span></p>
            </div>
            <div className='flex items-center justify-center my-5 flex-col w-[300px] md:w-[500px]'>
                <form
                    className='flex flex-col gap-3 w-full'
                    onSubmit={loginUser}
                >
                    <input
                        value={data.email}
                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                        className='form_input'
                        type="email"
                        placeholder='Email'
                        required
                    />
                    <input
                        value={data.password}
                        onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                        className='form_input'
                        type='password'
                        placeholder='Hasło'
                        required
                    />
                    <button type='submit' className='py-1.5 px-5 bg-cyan-500 hover:bg-cyan-600  border hover:border-cyan-600 border-cyan-500 rounded-full text-sm font-inter  text-white text-center hover:shadow-sky-500/50 hover:shadow-lg transition'>Zaloguj się</button>
                </form>
                <div className='text-red-500 mt-5'>
                    {error && 'Złe hasło lub login...'}
                </div>
            </div>
        </>
    )
}

export default LoginForm