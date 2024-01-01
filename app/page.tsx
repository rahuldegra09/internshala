
import LoginForm from './components/LoginForm'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { GET } from './api/auth/[...nextauth]/route'; 


export default async function Home() {
  const session =await getServerSession(GET);
if(session) redirect ("/user");
  return (
    <main>

      <LoginForm  />
    </main>
  )
}
