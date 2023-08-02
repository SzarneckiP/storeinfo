'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Form } from '../../components'
import { dateCreator } from '../../utils/dateCreator'

const EditPrompt = () => {
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const { data: session } = useSession()
    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
        createdOn: '',
        edited: '',
        realized: '',
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag,
                createdOn: data.createdOn,
                edited: data.edited,
                realized: data.realized,
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])

    const editPrompt = async (e) => {
        e.preventDefault()

        setSubmitting(true)

        if (!promptId) return alert('Prompt Id not found!')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    createdOn: post.createdOn,
                    edited: dateCreator(),
                    realized: post.realized,
                })
            })

            if (response.ok) {
                router.push('/')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            {session?.user ? (
                <div>
                    <Form
                        type='Edit'
                        post={post}
                        setPost={setPost}
                        submitting={submitting}
                        handleSubmit={editPrompt}
                    />
                </div>
            ) : (
                <div>
                    <p className='text-xl flex'>You have to <span className='outline_btn mx-2 hover:text-black hover:bg-transparent'>Sign In</span> first...</p>
                </div>
            )}
        </div>
    )
}

export default EditPrompt