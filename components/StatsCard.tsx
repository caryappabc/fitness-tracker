import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ReactNode } from "react";


export default function StatsCard({title, icon , value, desc} : {title:string; icon:ReactNode ; value:string;  desc:string}) {
  return (
    <Card>
          <CardHeader className="flex-row justify-between items-center min-w-72">
            <CardTitle>{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <p>{value}</p>
            <CardDescription>{desc}</CardDescription>
          </CardContent>
    </Card>
  )
}

