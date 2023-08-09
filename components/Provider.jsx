'use client'
import { SessionProvider } from 'next-auth/react'
import Loader from './Loader'


const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider