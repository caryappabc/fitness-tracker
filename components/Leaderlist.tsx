import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CircleUserRound } from 'lucide-react'

export default function Leaderlist() {

    const data = [
        {name : "Caryappa", pts : 190},
        {name : "Megha", pts : 210},
        {name : "Debali" , pts : 200},
        {name : "Namratha", pts : 400},
        {name : "test", pts : 400},
        {name : "test-1", pts : 400},
        {name : "test-2", pts : 0},
        {name : "test-3", pts : 0},
        {name : "test-4", pts : 0},
        {name : "test-5", pts : 0},
    ]

    const sortedData = [...data].sort((a, b) => b.pts - a.pts);

  // Find the highest points
    const maxPts = sortedData[0].pts;


  return (
    <Card className="w-2/5 p-3">
        <CardHeader>
            <CardTitle>7-Day Hustle Crew</CardTitle>
            <CardDescription>Top 10 who have met their goals last week</CardDescription>
        </CardHeader>
        <CardContent>
            {sortedData.
            map((user, index)=>(
                <div key={index} className={`flex flex-row justify-between p-2 ${user.pts === maxPts ?  `text-green-600 font-bold` : `text-white`}`}>
                    <div className="flex gap-x-2">
                    <CircleUserRound />
                    {user.name} 
                    </div>
                    <div>
                    {user.pts} pts
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
  )
}

