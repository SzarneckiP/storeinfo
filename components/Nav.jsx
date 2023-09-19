'use client'
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { motion } from 'framer-motion'
import Loader from "./Loader"
import { useRouter } from "next/navigation"

const Nav = () => {
    const ref = useRef()
    const router = useRouter()

    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
        setUpProviders()

        document.addEventListener('click', (e) => {
            if (!ref.current.contains(e.target)) {
                setToggleDropdown(false)
            }
        })
    }, [])


    return (
        <motion.nav
            className="flex-between w-full mb-16 pt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <Link href='/' className="flex gap-2 flex-center">
                <Image
                    src='/assets/icons/warehouse.png'
                    width={30}
                    height={30}
                    alt="PromptAI logo"
                    className="object-contain"
                />
                <p className="logo_text">Store<span className="blue_gradient">Info</span></p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user && (
                    <motion.div
                        className="flex gap-3 md:gap-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Link
                            href={'/create-prompt'}
                            className="black_btn"
                        >
                            Dodaj Wpis
                        </Link>
                        <button
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Wyloguj Się
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="user image"
                            />
                        </Link>
                    </motion.div>

                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative" ref={ref}>
                {session?.user && (
                    <div className="flex ">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="user image"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown z-50" >
                                <Link
                                    href={'/profile'}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Mój profil
                                </Link>
                                <Link
                                    href={'/create-prompt'}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Dodaj Wpis
                                </Link>

                                <button
                                    type="button"
                                    onClick={
                                        signOut
                                    }
                                    className="mt-5 w-full black_btn"
                                >
                                    Wyloguj Się
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.nav >
    )
}

export default Nav


