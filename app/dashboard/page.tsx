import {Navbar} from "@/components/nav-bar"
import { auth} from "@/auth"
import { redirect } from 'next/navigation';
import MainCard from '@/components/MainCard'
import MiniCard from "@/components/MiniCard";

import HT from '@/public/icons/Health_fitness.png'
import ST from '@/public/icons/streangth_training.png'
import FB from '@/public/icons/fat_burning.png'
import CT from '@/public/icons/cardio_training.png'
import CL from '@/public/icons/cal.png'
import RR from '@/public/icons/steps.png'
import SS from '@/public/icons/sessions.png'
import { getApiUrl } from "@/utils/api";

export default async function Dashboard() {
    const session = await auth();
    if (!session) return redirect('/');
    const userResponse = await fetch(`${getApiUrl()}/api/user/${session?.user?.email}`);
    const userData = await userResponse.json();
    const userId = userData?._id;
  
    const logResponse = await fetch(`${getApiUrl()}/api/log?id=${userId}&latest=true`);
    const logData = await logResponse.json();
    const cards = [
        {
            id:1,
            title : "Calories",
            path : "/stats",
            category : "stats",
            icon : CL,
            stat1 : {
                label : "Burnt",
                value : logData.NoofCals ? `${logData.NoofCals} Cals` : "0 Cals"      
            },
            stat2 : {
                label : "Goal",
                value :  userData?.calorieGoal + " Cal"     
            },
        },

        {
            id:2,
            title : "Session",
            path : "/stats",
            category : "stats",
            icon : SS,
            stat1 : {
                label : "Today",
                value : logData.activitysession ? `${logData.activitysession} Session` : "0 Sessions"      
            },
            stat2 : {
                label : "Goal",
                value : userData.activitysession + " Sessions"       
            },
            activities : logData.activities 
        },

        {
            id:3,
            title : "Total steps",
            path : "/stats",
            category : "stats",
            icon : RR,
            stat1 : {
                label : "Today",
                value : logData.NoofSteps ? `${logData.NoofSteps} Steps` : "0 Steps"       
            },
            stat2 : {
                label : "Goal",
                value : "6000+ Steps"       
            },
        },
        {
            id:4,
            title : "Heath Fitness",
            path : "/dashboard/tips",
            category : "feature",
            icon : HT,
        },

        {
            id:5,
            title : "Strength Training",
            path : "/dashboard/tips",
            category : "feature",
            icon : ST
        },
        
        {
            id:6,
            title : "Fat Burning",
            path : "/dashboard/tips",
            category : "feature",
            icon : FB
        },

        

        {
            id:7,
            title : "Cardio Training",
            path : "/dashboard/tips",
            category : "feature",
            icon : CT,
            
        },
    ]


  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-[4rem_minmax(0,_1/2fr)_minmax(0,_1/2fr)_minmax(0,_1/2fr)] min-h-screen gap-4 p-4 md:p-6 lg:p-8">
    <Navbar />
    <MainCard />
    {cards.map((card) => (
        <MiniCard key={card.id} title={card.title} category={card.category} path={card.path} icn={card.icon} stat1={card?.stat1} stat2={card?.stat2} activities={card.activities ?? []}/>
    ) )}
  </div>
  )
}

