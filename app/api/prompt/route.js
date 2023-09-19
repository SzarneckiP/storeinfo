import Prompt from "../../../models/prompt";
import { connectToDB } from "../../../utils/database";

export const GET = async (request, { params }) => {

    try {
        await connectToDB()

        const prompts = await Prompt.find().populate('creator').sort({ realized: 1, edited: -1, createdOn: -1 })

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 