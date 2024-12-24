"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", points: 28 },
  { month: "February", points: 24 },
  { month: "March", points: 27 },
  { month: "April", points: 22 },
  { month: "May", points: 28 },
  { month: "June", points: 12 },
  { month: "July", points: 0 },
  { month: "August", points: 0 },
  { month: "September", points: 0 },
  { month: "November", points: 0 },
  { month: "December", points: 0 }
]

const chartConfig = {
  points: {
    label: "points",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function MontlyProgressChart() {
  return (
    <Card className="w-3/5">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>January - December 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(points) => points.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="points" fill="var(--color-points)" radius={8} type="number" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total goals met this year
        </div>
      </CardFooter>
    </Card>
  )
}
