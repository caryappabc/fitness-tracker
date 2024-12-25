import React from 'react'
import { Button } from './ui/button'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { ChevronsRight, EllipsisVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  


function FeatureCard({title, path, icn} : {title:string; path:string; icn:StaticImageData}) {

    return (
        <div className="flex pl-8 py-5 gap-x-3 bg-[#373d41]">
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



function StatCard({title, icn, stat1 , stat2} : {title : string; icn:StaticImageData ; stat1 : {label:string; value : string} | undefined; stat2 : {label:string; value : string} | undefined}) {


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
            <h6 className="text-sm">{stat1?.label}</h6>
            <p className="text-xs text-wrap text-left my-3">{stat1?.value}</p>
            <h6 className="text-sm">{stat2?.label}</h6>
            <p className="text-xs text-wrap text-left my-3">{stat2?.value}</p>
        </div>
        
        <div className='content-center w-1/2'>
                {/* <CaloriesChart val={275} />    */}
                {/* <RunRate /> */}
                <Image src={icn} alt={title} width={90} />
        </div>
        </div>
        
    </div>
    )
} 


interface MiniCardProps {
    title: string;
    category: string;
    path: string;
    icn: StaticImageData;
    stat1: { 
      label: string;
      value: string;
    } | undefined;
    stat2: { 
      label: string;
      value: string;
    } | undefined;
  }

export default function MiniCard({title, category , path , icn, stat1, stat2} : MiniCardProps) {
  return (
    category === "feature" ? <FeatureCard title={title} path={path} icn={icn} /> :  <StatCard title={title} icn={icn} stat1={stat1} stat2={stat2} /> 
  )
}