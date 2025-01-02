"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { TrendingDown, TrendingUp } from "lucide-react"
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

const chartConfig = {
  points: {
    label: "points",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

interface DataPoint {
  month: string
  points: number
}

interface MontlyProgressChartProps {
  data?: DataPoint[],
  trend?: number
}

export default function MontlyProgressChart({ data, trend = 0 }: MontlyProgressChartProps) {

  if (!data) {
    return (
      <Card className="w-full ">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
      <CardTitle className="text-lg sm:text-xl">Overview</CardTitle>
      <CardDescription className="text-sm">January - December 2025</CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart accessibilityLayer data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(points) => points.slice(0, 3)}
          fontSize={12}
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
      <div className="flex gap-2 font-medium leading-none items-center">
        <span className="text-sm sm:text-base">{`trending ${trend > 0 ? "up" : "down"} by ${trend.toFixed(2)} % this month` }</span>
        {trend >0 ? <TrendingUp className="h-4 w-4" /> : trend === 0 ? "" : <TrendingDown className="h-4 w-4" />}</div>
      <div className="leading-none text-muted-foreground text-xs sm:text-sm">
        Showing total goals met this year
      </div>
      </CardFooter>
    </Card>
  )
}
