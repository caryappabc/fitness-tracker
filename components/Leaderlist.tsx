import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderData {
  user: string;
  accumulatedPoints: number;
  id:string;
  name:string;
  image:string;
}

export default function Leaderlist({data}: {data: LeaderData[]}) { 

    const sortedData = [...data].sort((a, b) => b.accumulatedPoints - a.accumulatedPoints);

  // Find the highest points
    const maxPts = sortedData[0]?.accumulatedPoints ?? 0;


  return (
    <Card className="w-full p-2 md:p-3">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Hustle Crew</CardTitle>
        <CardDescription className="text-sm md:text-base">Top 10 who have met highest points of them all</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedData.
        map((user, index)=>(
          <div key={index} className={`flex flex-row justify-between p-1 md:p-2 items-center text-sm md:text-base ${user.accumulatedPoints === maxPts ?  `text-green-600 font-bold` : `text-white`}`}>
            <div className="flex flex-row items-center gap-x-2 md:gap-x-4">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? undefined}/> 
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback> 
            </Avatar>
            {user.user} 
            </div>
            <div>
            {user.accumulatedPoints} pts
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

