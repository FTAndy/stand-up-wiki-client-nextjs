
import { getServerSession } from "next-auth/next"
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import Window from './window'

const SignInPage = async () => {
  const session = await getServerSession(authOptions)
  return <Window session={session} />
}

export default SignInPage