import { connectToDB } from "../../../../utils/database"
import Prompt from "../../../../models/prompt"

export const POST = async (req) => {
    const { userId, prompt, tag, createdOn, edited, realized } = await req.json()
    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            createdOn,
            edited,
            realized,
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {
            status: 201,
        })

    } catch (err) {
        console.log(err)
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}