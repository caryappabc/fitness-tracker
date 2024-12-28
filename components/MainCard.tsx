"use client"
import imageM from "@/public/images/Mukund-represent.webp"
import Image from 'next/image'


export default function MainCard () {

  const title = "Share your fitness with a fun twist"
  return (
    <div className="flex-col row-span-1 md:row-span-2 lg:row-span-3 col-span-4  lg:col-span-3 ">
      <div className="pt-6 pl-10" >
        <h1 className="uppercase text-sm md:text-xl lg-text-4xl">{title.toUpperCase()}</h1>
        <p>
       Day {new Date().getDate()} of {new Date().toLocaleString('default', { month: 'long' })}
       </p>
      </div>
      <div className="flex-1 w-full items-center justify-between h-full relative">
        <div className="flex items-center justify-center w-full">
          
        <Image 
          src={imageM}
          alt="Leader"
          className="object-cover object-center rounded-full"
          width={400}
          height={400}
          priority
        />
        </div>
      </div>
    </div>
  )
}
