import Link from "next/link"
import { useRouter } from "next/navigation"

const Form = ({
    type, post, setPost, submitting, handleSubmit,
}) => {
    const router = useRouter()

    return (
        <section className="w-full mb-10 max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {type} Wpis
                </span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} wpis i podziel się informacjami z współpracownikami.
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-santoshi font-semibold text-base text-gray-700">
                        Twój wpis
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                        placeholder="Wpisz wiadomość..."
                        required
                        className="form_textarea"
                    />
                </label>
                <label>
                    <span className="font-santoshi font-semibold text-base text-gray-700">
                        Tag {'  '}
                        <span className="font-normal">(#produkt, #spóźnienie, #pomysł, #blokada)</span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link
                        href={'/'}
                        className="text-gray-500 text-sm hover:text-black transition"
                    >
                        Cofnij
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        onClick={handleSubmit}
                        className="px-5 py-1.5 text-sm bg-cyan-500 rounded-full text-white text-center hover:shadow-sky-500/50 hover:shadow-lg transition"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form