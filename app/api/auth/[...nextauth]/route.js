import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth,{ AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"


const authOptions= {

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { username, password } = credentials;
                try {
                    await connectToMongoDB();
                    const user = await User.findOne({ username });

                    if (!user) {
                        return null;
                    }

                    const passmatch = await bcrypt.compare(password, user.password);
                    if (!passmatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);

export  { handler as GET, handler as POST };