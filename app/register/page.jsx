'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Register = () => {
    const [err, setErr] = useState(null)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const image = 'https://source.unsplash.com/300x300/?warehouse'
        // const image = 'https://th.bing.com/th/id/OIP.cuQ_MvYHHn6Lkk5san1c_wHaHO?pid=ImgDet&rs=1'

        try {

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    image,
                })
            })

            res.status === 201 || 200 && router.push('/success')

        } catch (err) {
            setErr(true)
            console.log(err)
        }
    }

    return (
        <>
            <div className='flex items-start justify-start w-full'>
                <p className="logo_text mb-5 text-5xl flex items-start justify-start">Zarejestruj <span className="blue_gradient ml-2"> się</span></p>
            </div>
            <div className='flex items-center justify-center my-5 flex-col w-[500px]'>
                <form
                    className='flex flex-col gap-3 w-full'
                    onSubmit={handleSubmit}
                >
                    <input
                        className='form_input'
                        type="text"
                        placeholder='Nazwa użytkownika'
                        required
                    />
                    <input
                        className='form_input'
                        type="email"
                        placeholder='Email'
                        required
                    />
                    <input
                        className='form_input'
                        type='password'
                        placeholder='Hasło'
                        required
                    />
                    <button type='submit' className='py-1.5 px-5 bg-cyan-500 hover:bg-cyan-600  border hover:border-cyan-600 border-cyan-500 rounded-full text-sm font-inter  text-white text-center hover:shadow-sky-500/50 hover:shadow-lg transition'>Zarejestruj</button>
                </form>
                <div className='flex justify-end items-end w-full my-5'>
                    <button onClick={() => router.push('/')} className='outline_btn mr-2'>Wróć</button>
                </div>
                <div className='text-red-500'>
                    {err && 'Coś poszło nie tak... Spróbuj ponownie.'}
                </div>
                <div className='flex items-center justify-center my-5'>
                    <Link className='outline_btn mr-2' href={'/'}>Zaloguj się </Link>
                    <p>
                        na istniejące konto.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register