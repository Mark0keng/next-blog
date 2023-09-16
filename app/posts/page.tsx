import { PrismaClient } from "@prisma/client"
import { AddPost } from "./addPost"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const prisma = new PrismaClient()

const getPosts = async () => {
  const res = await prisma.post.findMany({
    select: {
      title:true,
      slug: true,
      content: true,
      authorId: true,
      author: true
    }
  })
  return res
}

const Post = async() => {
  const posts = await getPosts()
  console.log(posts);
  
  return (
    <div className="overflow-x-auto">
      <div className="">
        <AddPost />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author.name}</TableCell>
            <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Post