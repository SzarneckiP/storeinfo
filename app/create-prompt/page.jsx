'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Form } from '../../components'
import { dateCreator } from '../../utils/dateCreator'

const CreatePrompt = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
        createdOn: '',
        edited: '',
        realized: false,
    })

    const createPrompt = async (e) => {
        e.preventDefault()

        setSubmitting(true)

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                    createdOn: dateCreator(),
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
                        type='Dodaj'
                        post={post}
                        setPost={setPost}
                        submitting={submitting}
                        handleSubmit={createPrompt}
                    />
                </div>
            ) : (
                <div>
                    <p className='text-xl flex'>Musisz <span className='outline_btn mx-2 hover:text-black hover:bg-transparent'>Zalogować się</span></p>
                </div>
            )}
        </div>
    )
}

export default CreatePrompt