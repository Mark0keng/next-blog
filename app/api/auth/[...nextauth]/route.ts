import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if(!user) return null

        const isPasswordValid = await compare(credentials.password, user.password)
        if(!isPasswordValid) return null

        return {
          id: user.id + '',
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  callbacks: {
    session: ({session, token, user}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        }
      }
    },
    jwt: ({token, user}) => {
      if(user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}