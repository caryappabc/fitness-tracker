"use client"

import React from 'react'
import { Button } from './ui/button'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { ChevronsRight} from 'lucide-react'

  


function FeatureCard({title, path, icn} : {title:string; path:string; icn:StaticImageData | ""}) {

    return (
        <div className="flex pl-8 py-5 gap-x-3 bg-[#373d41] col-span-3 md:col-span-2 lg:col-span-1">
            <div className="flex-col gap-y-3 w-1/2">
            <h6 className='font-bold'>{title}</h6>
            <p className="text-xs text-wrap text-left my-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Button variant="outline" asChild>
                <Link href={path}>Learn more <ChevronsRight /></Link></Button>
            </div>
            <div className='content-center'>
                <Image src={icn} alt={title} width={100} />
            </div>
        </div>
    )
} 



function StatCard({title, icn, stat1 , stat2, activities} : {title : string; icn:StaticImageData | "" ; stat1 : {label:string; value : string} | undefined; stat2 : {label:string; value : string} | undefined; activities: string[] | []}) {


    return (
        <div className="flex-col pl-8 pr-4 py-5 bg-[#373d41] col-span-3 md:col-span-2 lg:col-span-1">
        
          <div className='flex w-full justify-start pb-3'>
              <h6 className='font-bold text-base text-orange-400'>{title}</h6>            
          </div>

          <div className="flex content-center justify-between gap-x-8 w-full">

          <div>
              <h6 className="text-xs font-semibold">{stat1?.label}</h6>
              <p className="text-sm text-wrap text-left my-3 font-extrabold">{stat1?.value}</p>
              <h6 className="text-xs font-bold">{stat2?.label}</h6>
              <p className="text-sm text-wrap text-left my-3 font-extrabold">{stat2?.value}</p>
          </div>
          {icn!== "" && 
            <div className='content-center item-center w-1/2'>
              <Image src={icn} alt={title} width={90} />
            </div>
          } 
          </div>
          <div className='flex flex-wrap flex-row gap-x-2'>
          {activities.length > 0 && activities.map((activity, index) => (<p className="text-sm p-1 border-[1px] border-white rounded-sm" key={index}>{activity}</p>))}
          </div>
        
    </div>
    )
} 


interface MiniCardProps {
    title: string;
    category: string;
    path: string;
    icn: StaticImageData | "";
    stat1: { 
      label: string;
      value: string;
    } | undefined;
    stat2: { 
      label: string;
      value: string;
    } | undefined;
    activities: string[] | [];
  }

export default function MiniCard({title, category , path , icn, stat1, stat2, activities} : MiniCardProps) {
  return (
    category === "feature" ? <FeatureCard title={title} path={path} icn={icn} /> :  <StatCard title={title} icn={icn} stat1={stat1} stat2={stat2}  activities={activities}/> 
  )
}