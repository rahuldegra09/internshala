
import LoginForm from './components/LoginForm'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { handler } from './api/auth/[...nextauth]/route'; 


export default async function Home() {
  const session =await getServerSession(handler);
if(session) redirect ("/user");
  return (
    <main>

      <LoginForm  />
    </main>
  )
}
