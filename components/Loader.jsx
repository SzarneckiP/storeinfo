import React from 'react'
import Image from 'next/image'

const Loader = ({ width, height, margin }) => {
    return (
        <div className="flex gap-3 items-center md:gap-5">
            <Image
                src={'assets/icons/loader.svg'}
                width={width ? width : 150}
                height={height ? height : 150}
                className={`rounded-full ${margin ? margin : 'mt-10'}blue_gradient`}
                alt="loader" />
        </div>
    )
}

export default Loader