export const metadata = () => {
  title: "Posts"
}

const PostLayout = ({children }: {children: React.ReactNode}) => {
  return (
    <div className="p-10">{children}</div>
  )
}

export default PostLayout