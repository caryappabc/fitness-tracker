
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth, signOut } from "@/auth"


export async function Navbar(){
      const session = await auth();
      const user = session?.user;

  // const navLinks = [
    // {
    //     id : 1,
    //     path : "/exercise",
    //     label : "Exercise" 
    // }
    // ,{
    //     id : 2,
    //     path : "/food-plan",
    //     label : "Food plan" 
    // }
    // ,{
    //     id : 3,
    //     path : "/daily-habbits",
    //     label : "Daily Habbits" 
    // }
    // ,{
    //     id : 4,
    //     path : "/water-intake",
    //     label : "Water intake" 
    // }
  // ]
  return (
    <nav className="text-white col-span-4 h-max">
      <div className="container mx-auto px-4 py-2 flex gap-x-8 justify-start items-center">
        <Link href="/" className="font-bold text-xl">
          Fitness tracker
        </Link>

        {/* <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.path} className="hover:text-gray-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul> */}

        <div className="flex gap-x-6 self-end ml-auto">
            <form
                action={async () => {
                "use server"
                await signOut()
                }}
            >
                <Button variant="outline">Signout</Button>
            </form>
            <Avatar>
                <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? undefined}/> 
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback> 
            </Avatar>
        </div>
      </div>
    </nav>
  )
}


