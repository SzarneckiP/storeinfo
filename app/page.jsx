'use client'
import { Feed } from '../components'
import { motion } from 'framer-motion'
import { useSession } from "next-auth/react"

const Home = () => {

    const { data: session } = useSession()

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

                {session?.user.id ? (
                    <Feed />
                ) : (
                    <div className='flex items-center justify-center'>
                        <h1 className='mt-14 text-4xl font-bold text-center desc'>
                            Zaloguj się, aby zobaczyć wpisy...
                        </h1>
                    </div>
                )}
            </div>



        </motion.section>
    )
}

export default Home