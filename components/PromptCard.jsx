'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

import { Loader, Realized } from '../components'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDel }) => {
    const [copied, setCopied] = useState('')
    const [realizedPost, setRealizedPost] = useState(false)
    const [loading, setLoading] = useState(false)

    const { data: session } = useSession()
    const pathName = usePathname()
    const treeDays = 259200000

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(''), 3000)
    }

    const handleRealized = async (realized) => {
        setLoading(true)
        const response = await fetch(`/api/realized`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: post._id,
                prompt: post.prompt,
                tag: post.tag,
                createdOn: post.createdOn,
                edited: post.edited,
                realized: realized,
            })
        })

        if (response.ok) {
            setRealizedPost(realized)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (post.realized) {
            setRealizedPost(true)
            setTimeout(() => {
                try {
                    fetch(`/api/prompt/${post._id.toString()}`, {
                        method: 'DELETE',
                    })
                } catch (error) {
                    console.log(error)
                }
            }, treeDays)
        } else {
            setRealizedPost(false)
        }
    }, [post])

    if (loading) {
        return (
            <div className="prompt_card flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>{realizedPost ? (
            <div
                className={`prompt_card relative ${realizedPost && 'cursor-pointer'}`}
                onClick={() => { handleRealized(false), setRealizedPost(false) }}
            >
                <p className={`${realizedPost ? 'absolute bottom-11 text-red-600 font-bold text-4xl z-10 cursor-pointer' : 'hidden'}`}>Zrealizowane</p>
                <div
                    className={`${realizedPost && 'blur-sm relative'}`}
                >
                    <div className="flex justify-between items-start gap-5">
                        <div className="flex flex-1 gap-3 justify-start items-center cursor-pointer">
                            <Image
                                src={post.creator.image}
                                width={40}
                                height={40}
                                alt="userImage"
                                className="rounded-full"
                            />
                            <div className="flex flex-col">
                                <h3 className="font-satoshi font-semibold text-gray-900">
                                    {post.creator.username}
                                </h3>
                                <p className="font-inter text-sm text-gray-500">
                                    {post.creator.email}
                                </p>
                            </div>
                        </div>
                        <div className="copy_btn" onClick={handleCopy}>
                            <Image
                                src={copied === post.prompt
                                    ? '/assets/icons/tick.svg'
                                    : '/assets/icons/copy.svg'}
                                width={12}
                                height={12}
                                alt="copyBtn"
                            />
                        </div>
                    </div>
                    <p className="my-4 font-satoshi text-sm text-gray-700">
                        {post.prompt}
                    </p>
                    <div className="flex justify-end">
                        <Realized
                            className='text-gray-400 hover:text-red-600 transition'
                        />
                    </div>
                    <div className="flex justify-between">
                        <p
                            className="font-inter text-sm blue_gradient cursor-pointer"
                            onClick={() => handleTagClick && handleTagClick(post.tag)}
                        >
                            {post.tag.length === 0 && !post.tag.includes('#', 0) ? post.tag : `#${post.tag}`}
                        </p>
                        {post?.edited !== post?.createdOn ? (
                            <p className="flex items-center text-right text-xs text-gray-500">
                                Edytowany...  {post.edited}
                            </p>
                        ) : (
                            <p className="flex items-center text-right text-xs text-gray-500">{post.createdOn}</p>
                        )
                        }
                    </div>

                </div>
                <div>
                    {session?.user.id === post.creator._id && pathName === '/profile' && (
                        <div className="flex gap-4 border-t border-gray-200 pt-3 justify-between">
                            <p className="font-inter text-sm green_gradient cursor-pointer"
                                onClick={handleEdit}
                            >
                                Edytuj
                            </p>
                            <p className="font-inter text-sm orange_gradient cursor-pointer"
                                onClick={handleDel}
                            >
                                USUŃ
                            </p>
                        </div>
                    )}
                </div>
            </div >
        ) : (
            <div
                className='prompt_card relative'
            >
                <div className="flex justify-between items-start gap-5">
                    <div className="flex flex-1 gap-3 justify-start items-center cursor-pointer">
                        <Image
                            src={post.creator.image}
                            width={40}
                            height={40}
                            alt="userImage"
                            className="rounded-full"
                        />
                        <div className="flex flex-col">
                            <h3 className="font-satoshi font-semibold text-gray-900">
                                {post.creator.username}
                            </h3>
                            <p className="font-inter text-sm text-gray-500">
                                {post.creator.email}
                            </p>
                        </div>
                    </div>
                    <div className="copy_btn" onClick={handleCopy}>
                        <Image
                            src={copied === post.prompt
                                ? '/assets/icons/tick.svg'
                                : '/assets/icons/copy.svg'}
                            width={12}
                            height={12}
                            alt="copyBtn"
                        />
                    </div>
                </div>
                <p className="my-4 font-satoshi text-sm text-gray-700">
                    {post.prompt}
                </p>
                <div className="flex justify-end">
                    <Realized
                        className='text-gray-400 hover:text-red-600 transition'
                        handleRealized={() => handleRealized(true)}
                        onClick={() => setRealizedPost(true)}
                    />
                </div>
                <div className="flex justify-between">
                    <p
                        className="font-inter text-sm blue_gradient cursor-pointer"
                        onClick={() => handleTagClick && handleTagClick(post.tag)}
                    >
                        {post.tag.length === 0 && !post.tag.includes('#', 0) ? post.tag : `#${post.tag}`}
                    </p>
                    {post?.edited !== post?.createdOn ? (
                        <p className="flex items-center text-right text-xs text-gray-500">
                            Edytowany...  {post.edited}
                        </p>
                    ) : (
                        <p className="flex items-center text-right text-xs text-gray-500">{post.createdOn}</p>
                    )
                    }
                </div>
                <div>
                    {session?.user.id === post.creator._id && pathName === '/profile' && (
                        <div className="flex gap-4 border-t border-gray-200 pt-3 justify-between">
                            <p className="font-inter text-sm green_gradient cursor-pointer"
                                onClick={handleEdit}
                            >
                                Edytuj
                            </p>
                            <p className="font-inter text-sm orange_gradient cursor-pointer"
                                onClick={handleDel}
                            >
                                USUŃ
                            </p>
                        </div>
                    )}
                </div>
            </div >
        )}
        </>

    )
}

export default PromptCard