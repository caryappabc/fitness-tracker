import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import CaloriesChart from "@/components/CaloriesChart"
import RunRate from"@/components/RunRate"
import { ChevronsRight, EllipsisVertical } from 'lucide-react'
import HT from '@/public/icons/Health_fitness.png'
import ST from '@/public/icons/streangth_training.png'
import FB from '@/public/icons/fat_burning.png'
import CT from '@/public/icons/cardio_training.png'
import CL from '@/public/icons/calories.png'
import RR from '@/public/icons/run_rate.png'
import TH from '@/public/icons/timer.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  


function FeatureCard({title, path}) {

    const icons = {
        "Heath Fitness" : HT,
        "Strength Training" : ST ,
        "Fat Burning" : FB ,
        "Cardio Training" : CT
    }


    return (
        <div className="flex pl-8 py-5 gap-x-3 bg-[#373d41]">
            <div className="flex-col gap-y-3 w-1/2">
            <h6 className='font-bold'>{title}</h6>
            <p className="text-xs text-wrap text-left my-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Button variant="outline" asChild>
                <Link href={path}>Learn more <ChevronsRight /></Link></Button>
            </div>
            <div className='content-center'>
                <Image src={icons?.[title]} alt={title} width={100} />
            </div>
        </div>
    )
} 



function StatCard({title}) {

    const icons = {
        "Calories" : CL,
        "Run Rates" : RR,
        "Total hours" : TH 
    }

    const stats = {
        "Calories" : {
            stat1 : {
                label : "Consumed",
                value : "130 Cal"       
            },
            stat2 : {
                label : "Remaining",
                value : "70 Cal"       
            },
        },
        "Run Rates" : {
            stat1 : {
                label : "Today",
                value : "20 Km/h"       
            },
            stat2 : {
                label : "Yesterday",
                value : "12 Km/h"       
            },
        },
        "Total hours" : {
            stat1 : {
                label : "This Week",
                value : "16 hrs"       
            },
            stat2 : {
                label : "Previous",
                value : "10 hrs"       
            },
        } 
    }


    return (
        <div className="flex-col pl-8 pr-4 py-5 bg-[#373d41]">
        
        <div className='flex w-full justify-between pb-3'>
            <h6 className='font-bold'>{title}</h6>
            <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost"><EllipsisVertical /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Hide</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </div>

        <div className="flex content-center justify-between gap-x-8 w-full">

        <div>
            <h6 className="text-sm">{stats?.[title].stat1.label}</h6>
            <p className="text-xs text-wrap text-left my-3">{stats?.[title].stat1.value}</p>
            <h6 className="text-sm">{stats?.[title].stat2.label}</h6>
            <p className="text-xs text-wrap text-left my-3">{stats?.[title].stat2.value}</p>
        </div>
        
        <div className='content-center w-1/2'>
                {/* <CaloriesChart val={275} />    */}
                {/* <RunRate /> */}
                <Image src={icons?.[title]} alt={title} width={90} />
        </div>
        </div>
        
    </div>
    )
} 

export default function MiniCard({title, category , path}) {
  return (
    category === "feature" ? <FeatureCard title={title} path={path} /> :  <StatCard title={title} /> 
  )
}