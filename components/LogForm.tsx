"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const formSchema = z.object({
  NoofSteps: z.number().min(2, {
    message: "Cant be left empty",
  }),
  NoofCals : z.number().min(2, {
    message: "Cant be left empty",
  }),
  Activity : z.number().min(2, {
    message: "Cant be left empty",
  }),
  ActivityDuration : z.number().min(2, {
    message: "Cant be left empty",
  }),
})

export default function Log() {
  // ...

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NoofSteps: 2000,
      NoofCals: 130,
      Activity : 2,
      ActivityDuration : 120
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Card className="container mx-auto px-4">
        <CardHeader>
            <CardTitle>Log progress for the day</CardTitle>
            <CardDescription>Enter your step count, calories and workout details</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="NoofSteps"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Enter the number of steps</FormLabel>
                    <FormControl>
                        <Input placeholder="..." {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                        No of steps completed for the day
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="NoofCals"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Enter the number of Calories burnt</FormLabel>
                    <FormControl>
                        <Input placeholder="00" {...field} type="number"/>
                    </FormControl>
                    <FormDescription>
                        No of calories burnt today
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="Activity"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Activities completed today</FormLabel>
                    <FormControl>
                        <Input placeholder="00" {...field} type="number"/>
                    </FormControl>
                    <FormDescription>
                        No of activities completed today
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="ActivityDuration"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Duration of movement in mins</FormLabel>
                    <FormControl>
                        <Input placeholder="00" {...field} type="number"/>
                    </FormControl>
                    <FormDescription>
                        Activity performed for?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  )
}
