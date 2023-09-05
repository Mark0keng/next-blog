import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
  const password = await hash('admin123', 12)

  const user = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password
    },
  })
  // console.log({ user })

  const posts = await prisma.post.createMany({
    data: [
      {
        "title": "Post 1",
        "slug": "post-1",
        "content": "Ini adalah konten dari postingan pertama.",
        'authorId': 1
      },
      {
          "title": "Post 2",
          "slug": "post-2",
          "content": "Ini adalah konten dari postingan kedua.",
          'authorId': 1
      },
      {
          "title": "Post 3",
          "slug": "post-3",
          "content": "Ini adalah konten dari postingan ketiga.",
          'authorId': 1
      },
      {
          "title": "Post 4",
          "slug": "post-4",
          "content": "Ini adalah konten dari postingan keempat.",
          'authorId': 1
      },
      {
          "title": "Post 5",
          "slug": "post-5",
          "content": "Ini adalah konten dari postingan kelima.",
          'authorId': 1
      },
      {
          "title": "Post 6",
          "slug": "post-6",
          "content": "Ini adalah konten dari postingan keenam.",
          'authorId': 1
      },
      {
          "title": "Post 7",
          "slug": "post-7",
          "content": "Ini adalah konten dari postingan ketujuh.",
          'authorId': 1
      },
      {
          "title": "Post 8",
          "slug": "post-8",
          "content": "Ini adalah konten dari postingan kedelapan.",
          'authorId': 1
      },
      {
          "title": "Post 9",
          "slug": "post-9",
          "content": "Ini adalah konten dari postingan kesembilan.",
          'authorId': 1
      },
      {
          "title": "Post 10",
          "slug": "post-10",
          "content": "Ini adalah konten dari postingan kesepuluh.",
          'authorId': 1
      }
    ]
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })