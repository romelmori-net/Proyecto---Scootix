import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Intentando autorizar:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Faltan credenciales");
                    throw new Error('Credenciales inválidas');
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (!user) {
                        console.log("Usuario no encontrado en la DB");
                        throw new Error('El usuario no existe');
                    }

                    console.log("Usuario encontrado, verificando contraseña...");
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password || ''
                    );

                    if (!isPasswordCorrect) {
                        console.log("Contraseña incorrecta");
                        throw new Error('Contraseña incorrecta');
                    }

                    console.log("Autorización exitosa para:", user.email);
                    return user;
                } catch (error) {
                    console.error("Error en authorize:", error);
                    throw error;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
