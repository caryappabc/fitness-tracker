import { Button } from "@/components/ui/button"
import { auth, signIn } from "@/auth";
import { getApiUrl } from '@/utils/api';
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    const user = await fetch(`${getApiUrl()}/api/user/${session?.user?.email}`);
    
    if (user.status === 404) {
      const userData = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        onboarded: false
      }

      const response = await fetch(`${getApiUrl()}/api/user/${session?.user?.email}`, {
        method: 'POST',
        body: JSON.stringify(userData), 
        headers: {
          'Content-Type': 'application/json', 
        }
      });
      if (response.status === 200)
        redirect('/onboarding')
    }
    if (user.ok) {
      const Userdata = await user?.json()
      if (Userdata.onboarded === false) redirect('/onboarding')
      else redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-20 text-white bg-gradient-to-b from-zinc-700 to-cyan-800 bg-[size:200%_200%]">
      <main className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-lg mx-auto text-center">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">Welcome to IMS Fitness Tracker</h1>
      <h1 className="text-3xl w-full md:text-6xl lg:text-8xl font-extrabold md:w-screen lg:w-screen">Ready . SET . SWEAT</h1>
      <p className="text-lg md:text-xl lg:text-2xl">Track your fitness journey with ease and fun!</p>
      <form
        action={async () => {
        "use server"
        await signIn("google")
        }}
      >
        <Button variant="outline" className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-200 hover:text-black flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
        Sign in with Google
        </Button>
      </form>
      </main>
      <footer className="mt-8 text-sm md:text-base lg:text-lg">
      <p>Get ready to crush your fitness goals!</p>
      </footer>
    </div>
  );
}
