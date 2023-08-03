import Prompt from "../../../models/prompt";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {

    try {
        await connectToDB()

        const prompts = await Prompt.find().populate('creator').sort({ edited: -1, })

        return new Response(JSON.stringify(prompts, {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 