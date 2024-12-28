import OnboardingForm from "@/components/OnboardingForm"
import {auth} from '@/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default async function Onboarding() {
  const session  = await auth();
  const username : string = session?.user?.name ?? "" 
  const email : string = session?.user?.email ?? "" 
  const img : string = session?.user?.image ?? ""

  return (
    <Card className="flex flex-col mx-4 md:mx-auto my-8 md:my-20 w-full md:w-[90%] lg:w-[70%] xl:w-1/2 p-4 md:p-8">
        <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-5 items-center">
            <Avatar className="w-16 h-16 md:w-20 md:h-20">
                 <AvatarImage src={img} />
                <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback> 
            </Avatar>
            <CardTitle className="text-lg md:text-xl text-orange-400">Welcome {username} !!</CardTitle>
            </div>
            <CardDescription className="text-center sm:text-left mt-4">Please fill in the below details to get you started on tracking your fitness</CardDescription>
        </CardHeader>
        <CardContent>
        <OnboardingForm username={username} email={email} />
        </CardContent>
    </Card>
  )
}

