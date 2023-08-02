"use client"
import PromptCard from "./PromptCard"
import Link from "next/link"

const Profile = ({ name, desc, data, handleDel, handleEdit }) => {

    return (
        <section className="w-full">
            <h1 className="head_text text-left"><span className="blue_gradient">{name}</span> Profil</h1>
            <p className="desc text-left">{desc}</p>

            {!data.length ?
                <div className="flex flex-col my-10">
                    <p className="text-center text-xl text-bold">Brak Wpisów...</p>
                    <div className="flex items-center justify-center my-10">
                        <p className="text-xl text-bold mr-3">
                            Spróbuj
                        </p>
                        <Link
                            href={'/create-prompt'}
                            className="black_btn w-25"
                        >
                            Dodać wpis
                        </Link>
                    </div>
                </div> :
                <div className="mt-10 prompt_layout">
                    {data.map((post) => (
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDel={() => handleDel && handleDel(post)}
                        />
                    ))}
                </div>
            }
        </section>
    )
}

export default Profile