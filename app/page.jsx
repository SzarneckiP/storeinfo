'use client'
import { Feed, Loader, LoginForm } from '../components'
import { motion } from 'framer-motion'
import { useSession } from "next-auth/react"

const Home = () => {

    const { data: session, status } = useSession()

    if (status === 'loading') return <Loader />

    return (
        <motion.section
            className="w-full flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <h1 className="head_text">
                Store
                <span className="blue_gradient text-center">Info</span>
            </h1>
            <div className='w-full'>

                {session?.user ? (
                    <Feed />
                ) : (
                    <div className='flex mt-14 flex-col items-center justify-center'>
                        <LoginForm />
                    </div>
                )}
            </div>



        </motion.section>
    )
}

export default Home