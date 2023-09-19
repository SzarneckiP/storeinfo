import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                //Check if the user exists.
                await connectToDB();

                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    console.log(user)

                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error("Wrong Credentials!");
                        }
                    } else {
                        throw new Error("User not found!");
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    pages: {
        error: "/",
    },
    callbacks: {
        async jwt({ token, user, session }) {
            // console.log('jwt callback', { token, user, session })

            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.username
                }
            }
            return token;
        },

        async session({ session, token, user }) {
            // console.log('session callback', { session, token, user })

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.name
                }
            }
            return session;
        },
    },

});

export { handler as GET, handler as POST };
