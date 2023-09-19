import { connectToDB } from "../../../../utils/database"
import User from "../../../../models/user"
import bcrypt from "bcryptjs"

export const POST = async (req) => {
    const { username, email, password, image } = await req.json()

    try {
        await connectToDB()
        const hashedPassword = await bcrypt.hash(password, 5)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image,
        })

        await newUser.save()
        return new Response(JSON.stringify(newUser), {
            status: 201,
        })
    } catch (error) {
        return new Response("Failed to fetch...", { status: 500 })
    }
}