"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { Day: "Monday", Value: 186 },
  { Day: "Tuesday", Value: 305 },
  { Day: "Wednesday", Value: 237 },
  { Day: "Thrusday", Value: 73 },
  { Day: "Friday", Value: 209 },
  { Day: "Saturday", Value: 214 },
]

const chartConfig = {
  desktop: {
    label: "Day",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function RunRate() {
  return (
    <Card className="bg-transparent">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={730} height={850} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Value" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}