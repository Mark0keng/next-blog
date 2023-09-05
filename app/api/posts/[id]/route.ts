import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: Request, {params}: {params: {id: string}}) {
  const id = params.id
  const data = await prisma.post.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return NextResponse.json(data)
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  const id = params.id
  const data = await request.json()

  const updated = await prisma.post.update({
    where: {
      id: parseInt(id)
    },
    data: data
  })

  return NextResponse.json(updated)
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  const id = params.id
  const data = await request.json()

  const deleted = await prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  })

  return NextResponse.json(deleted)
}