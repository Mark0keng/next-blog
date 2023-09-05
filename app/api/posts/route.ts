import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import type { Post } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')
  const data = await prisma.post.findMany({
    skip: skip ? parseInt(skip) : undefined,
    take: take ? parseInt(take) : undefined
  })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  // Authentication Needed Example
  const session = await getServerSession()
  if(!session) {
    return new NextResponse(null, {status: 401})
  }

  const data = await request.json()
  
  const created = await prisma.post.create({
    data: data
  })

  return new NextResponse(JSON.stringify(created), {status: 201})
}