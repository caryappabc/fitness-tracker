
import {Navbar} from "@/components/nav-bar"
import { auth} from "@/auth"
import { redirect } from 'next/navigation';
import MainCard from '@/components/MainCard'
import MiniCard from "@/components/MiniCard";

import HT from '@/public/icons/Health_fitness.png'
import ST from '@/public/icons/streangth_training.png'
import FB from '@/public/icons/fat_burning.png'
import CT from '@/public/icons/cardio_training.png'
import CL from '@/public/icons/calories.png'
import RR from '@/public/icons/run_rate.png'
import TH from '@/public/icons/timer.png'

export default async function Dashboard() {
    const session = await auth();
    if (!session) return redirect('/');


    const cards = [
        {
            id:1,
            title : "Heath Fitness",
            path : "/health-fitness",
            category : "feature",
            icon : HT,
        },

        {
            id:2,
            title : "Strength Training",
            path : "/strength-training",
            category : "feature",
            icon : ST
        },
        
        {
            id:3,
            title : "Fat Burning",
            path : "/fat-burning",
            category : "feature",
            icon : FB
        },

        {
            id:4,
            title : "Calories",
            path : "/stats",
            category : "stats",
            icon : CL,
            stat1 : {
                label : "Consumed",
                value : "130 Cal"       
            },
            stat2 : {
                label : "Remaining",
                value : "70 Cal"       
            },
        },

        {
            id:5,
            title : "Run Rates",
            path : "/stats",
            category : "stats",
            icon : RR,
            stat1 : {
                label : "Today",
                value : "20 Km/h"       
            },
            stat2 : {
                label : "Yesterday",
                value : "12 Km/h"       
            },
        },

        {
            id:6,
            title : "Total hours",
            path : "/stats",
            category : "stats",
            icon : TH
        },

        {
            id:7,
            title : "Cardio Training",
            path : "/cardio-training",
            category : "feature",
            icon : CT,
            stat1 : {
                label : "This Week",
                value : "16 hrs"       
            },
            stat2 : {
                label : "Previous",
                value : "10 hrs"       
            },
        },
    ]


  return (
  <div className="grid grid-cols-4 grid-rows-[4rem_minmax(0,_1/2fr)_minmax(0,_1/2fr)_minmax(0,_1/2fr)] min-h-screen gap-1 w-full">
    <Navbar />
    <MainCard />
    {cards.map((card) => (
        <MiniCard key={card.id} title={card.title} category={card.category} path={card.path} icn={card.icon} stat1={card?.stat1} stat2={card?.stat2}/>
    ) )}
  </div>
  )
}

