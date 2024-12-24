
import {Navbar} from "@/components/nav-bar"
import { auth} from "@/auth"
import { redirect } from 'next/navigation';
import MainCard from '@/components/MainCard'
import MiniCard from "@/components/MiniCard";

export default async function Dashboard() {
    const session = await auth();
    if (!session) return redirect('/');


    const cards = [
        {
            id:1,
            title : "Heath Fitness",
            path : "/health-fitness",
            category : "feature"
        },

        {
            id:2,
            title : "Strength Training",
            path : "/strength-training",
            category : "feature"
        },
        
        {
            id:3,
            title : "Fat Burning",
            path : "/fat-burning",
            category : "feature"
        },

        {
            id:4,
            title : "Calories",
            path : "/stats",
            category : "stats"
        },

        {
            id:5,
            title : "Run Rates",
            path : "/stats",
            category : "stats"
        },

        {
            id:6,
            title : "Total hours",
            path : "/stats",
            category : "stats"
        },

        {
            id:7,
            title : "Cardio Training",
            path : "/cardio-training",
            category : "feature"
        },
    ]


  return (
  <div className="grid grid-cols-4 grid-rows-[4rem_minmax(0,_1/2fr)_minmax(0,_1/2fr)_minmax(0,_1/2fr)] min-h-screen gap-1 w-full">
    <Navbar />
    <MainCard />
    {cards.map((card) => (
        <MiniCard key={card.id} title={card.title} category={card.category} path={card.path} />
    ) )}
  </div>
  )
}

