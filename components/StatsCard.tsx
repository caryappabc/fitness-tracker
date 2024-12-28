import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ReactNode } from "react"

interface StatsCardProps {
  title: string
  icon: ReactNode
  value?: string
  desc?: string
}

export default function StatsCard({ title, icon, value, desc }: StatsCardProps) {
  if (!value || !desc) {
    return (
      <Card className="w-1/4">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full md:w-1/2 ">
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

