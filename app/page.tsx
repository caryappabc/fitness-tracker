import { Button } from "@/components/ui/button"
import { auth,signIn } from "@/auth"

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if(session) return redirect('/dashboard');

  return (<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Welcome to Fitness tracker</h1>
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <Button variant="outline">Signin</Button>
      </form>
  </main>
</div>);
}
