import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  const {name, email, password} = await req.json()
  const hashed = await hash(password, 12)

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(isUserRegistered) {
    return new NextResponse(
      JSON.stringify({
        message: 'Email Tersebut Sudah Terdaftar!'
      }),
      {
        status: 400
      }
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed
    }
  })
  
  return new NextResponse(
    JSON.stringify({
      message: user.name + ' Register Successful!'
    })
  )
}