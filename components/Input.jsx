'use client'
import React from 'react'
import { motion } from "framer-motion"

const Input = ({ searchText, handleSearchChange, setSearchText }) => {
    return (
        <div className='w-full'>
            <motion.section
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <form className="search_input relative w-full flex-center justify-between">
                    <input
                        type="text"
                        placeholder="Wyszukaj po tagu lub nazwie..."
                        value={searchText}
                        onChange={handleSearchChange}
                        className="w-full border-none focus:outline-none py-2.5 peer"
                    />
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className={searchText ? `text-right text-gray-300 py-2.5 px-5` : `hidden`}
                        onClick={(e) => {
                            e.preventDefault(),
                                setSearchText("")
                        }}
                    >
                        X
                    </motion.button>
                </form>
            </motion.section>
        </div>
    )
}

export default Input