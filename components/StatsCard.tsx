import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


export default function StatsCard({title, icon , value, desc}) {
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

