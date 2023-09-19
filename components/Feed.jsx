'use client'
import { useState, useEffect } from "react"
import { PromptCard, Loader, Input } from '../components'
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"

const PromptCardList = ({ data, handleTagClick, getPosts }) => {

    const { data: status } = useSession()

    if (status === 'loading') return <Loader />

    return (
        <>
            {!data?.length ? (
                <div className="flex flex-col items-center gap-3 md:gap-5">
                    <h2 className="mt-10 pt-10 text-center text-5xl blue_gradient">Brak wpisów...</h2>
                </div>
            ) : (
                <div className="my-16 flex flex-wrap gap-6 mb-96"
                >
                    {data.map((post) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >{
                                post.length === 0 ? (
                                    <h2 className="mt-10 pt-10 text-center text-5xl blue_gradient">Brak wpisów...</h2>
                                )
                                    : (
                                        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
                                    )
                            }
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    )
}

const Feed = () => {

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        setLoading(true)
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
                setLoading(false)
            }, 500)
        );
    }

    const handleTagClick = (tagName) => {
        setLoading(true)
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
        setLoading(false)
    };

    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'public, s-maxage=1',
                    'CDN-Cache-Control': 'public, s-maxage=60',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=3600'
                },
                next: { revalidate: 60 },
            })
            const data = await response.json()
            setPosts(data)
        }

        fetchPosts()
        setLoading(false)
    }, [])

    const getPosts = () => {
        setLoading(true)
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'public, s-maxage=1',
                    'CDN-Cache-Control': 'public, s-maxage=60',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=3600'
                },
                next: { revalidate: 60 },
            })
            const data = await response.json()
            setPosts(data)
        }

        fetchPosts()
        setLoading(false)
    }

    return (
        <>
            <div className="my-2 text-red-800 flex justify-start items-center ">
                <p>
                    Jeśli jest problem z wczytywaniem postów
                </p>
                <button className="pointer underline mx-1 flex my-1 justify-start items-start" onClick={getPosts}>kliknij</button>
            </div>

            <motion.section
                className="mt-10 flex-col flex-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <Input
                    searchText={searchText}
                    handleSearchChange={handleSearchChange}
                    setSearchText={setSearchText}
                />
                {searchText ? (
                    <PromptCardList
                        data={searchedResults}
                        handleTagClick={handleTagClick}
                    />
                ) : (
                    <PromptCardList
                        getPosts={getPosts}
                        data={posts}
                        handleTagClick={handleTagClick}
                    />
                )}
            </motion.section>
        </>
    )
}

export default Feed