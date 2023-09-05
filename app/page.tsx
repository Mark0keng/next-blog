import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { User } from './user'

const Page = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      Home
      <p>Server Session</p>
      <pre>{JSON.stringify(session)}</pre>
      <p>Client Call</p>
      <User/>
    </div>
  )
}

export default Page