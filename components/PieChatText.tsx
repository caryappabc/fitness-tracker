"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { label: "Time", value: 75, fill: "#EC7E4A" },
  { label: "Remaining", value: (100 - 75), fill: "#FFFFFF" },
]

const chartConfig = {
  value: {
    label: "Value",
  },
  Time: {
    label: "Time",
    color: "hsl(var(--chart-1))",
  },
  Remaining: {
    label: "Remaining",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function PieChartText() {
  

  return (
    <Card className="flex border-none ">
      <CardContent className="flex justify-evenly w-full pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-[35%] aspect-square "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={65}
              outerRadius={70}
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          4:35
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex-col content-center h-full">
            <p className="text-xs">Push ups</p>
            <p className="text-xs">6 x 5 minutes</p>
        </div>
      </CardContent>
    </Card>
  )
}
