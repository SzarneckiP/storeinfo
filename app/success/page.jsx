import React from 'react'
import Link from 'next/link'

const success = () => {
    return (
        <div className='flex flex-col text-center'>
            <p className='text-7xl my-5'>👍</p>
            <p className='text-4xl gap-10'>Konto zostało stworzone!</p>
            <div className='flex items-center justify-center my-5'>
                <Link className='outline_btn mr-2' href={'/'}>Zaloguj się </Link>
                <p>
                    na istniejące konto.
                </p>
            </div>
        </div>
    )
}

export default success