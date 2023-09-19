'use client'
import { useState, useEffect } from "react"
import { PromptCard, Loader, Input } from '../components'
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import axios from "axios"

const PromptCardList = ({ data, handleTagClick, loading }) => {

    const { data: status } = useSession()

    if (status === 'loading') return <Loader />

    return (
        <>
            {loading ? (
                <div className="flex flex-col items-center gap-3 md:gap-5">
                    <h2 className="mt-10 pt-10 text-center text-5xl blue_gradient"><Loader /></h2>
                </div>
            ) : (
                <div className="my-16 flex flex-wrap gap-6 mb-96">
                    {data.map((post) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >{
                                post ? (
                                    <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />

                                ) : (
                                    <div>
                                        <h2 className="mt-10 pt-10 text-center text-5xl blue_gradient">Brak wpisów...</h2>
                                    </div>
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
        axios.get('/api/prompt')

            .then(function (response) {
                setLoading(true)
                const data = response.data
                setPosts(data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (posts.length === 0) return (
        <div>
            <h2 className="mt-10 pt-10 text-center text-5xl blue_gradient">Brak wpisów...</h2>
        </div>)

    if (searchedResults.length === 0 && searchText) return (
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
            <h2 className="mt-10 pt-10 text-center text-5xl blue_gradient">Brak wpisów...</h2>
        </motion.section>
    )

    return (
        <>
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
                    <>
                        <PromptCardList
                            loading={loading}
                            data={searchedResults}
                            handleTagClick={handleTagClick}
                        />
                    </>
                ) : (
                    <PromptCardList
                        loading={loading}
                        data={posts}
                        handleTagClick={handleTagClick}
                    />
                )}
            </motion.section>
        </>
    )
}

export default Feed