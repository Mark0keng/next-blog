import { PrismaClient } from "@prisma/client"
import AddPost from "./addPost"

const prisma = new PrismaClient()

const getPosts = async () => {
  const res = await prisma.post.findMany({
    select: {
      title:true,
      slug: true,
      body: true,
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

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index)=>(
            <tr key={index} className="hover">
              <th>{index}</th>
              <td>{post.title}</td>
              <td>{post.author.name}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Post