'use client'
import { useState, useEffect } from 'react'

const Realized = ({ handleRealized }) => {

    const [realized, setRealized] = useState(false)

    useEffect(() => {
        if (realized) {
            setRealized(true)
        } else {
            setRealized(false)
        }
    }, [realized])

    return (
        <div>
            <button
                className='text-gray-400 hover:text-red-600 transition'
                type="button"
                onClick={() =>
                    handleRealized(true)
                }
            >
                {realized ? 'Zrealizowane' : 'Zrealizuj'}
            </button>
        </div>
    )
}

export default Realized