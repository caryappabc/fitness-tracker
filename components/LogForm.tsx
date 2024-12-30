"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { redirect } from "next/navigation"
import { useState } from "react"

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
import { getApiUrl } from "@/utils/api"

const activities = [
  "Running",
  "Walking",
  "Strength training",
  "Swimming",
  "Zumba",
  "Tai Chi",
  "Karate",
  "Badminton",
  "Tennis",
  "Squash",
  "Cricket",
  "Football",
  "Yoga"
]

const formSchema = z.object({
  NoofSteps: z.number().min(2, {
    message: "Cant be left empty",
  }),
  NoofCals : z.number().min(2, {
    message: "Cant be left empty",
  }),
  activitysession : z.number().min(1, {
    message: "Cant be left empty",
  }),
  activities: z.array(z.string()).nonempty({
    message: "At least one activity must be selected",
  }),
})
interface User {
  _id: string,
  name: string;
  onboarded : boolean;
  height : number;
  weight : number;
  activity : string;
  calorieGoal : number;
  activitysession: number;
  image : string;
  email: string;
}

export default function Log({data} : {data:User}) {
  console.log(data);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activities: []
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const today = new Date().toISOString().slice(0, 10)
    const maxwalkPoints = 6000; 
    const walkpoints = Math.min(Math.floor(values.NoofSteps / 1000) * 100, maxwalkPoints);
    const sessionpoints = values.activitysession * 100;
    const payload = {
      ...values,
      id: data._id,
      logdata: today,
      totalpoints: walkpoints + sessionpoints,
      walk: walkpoints,
      session: sessionpoints
    };

    try {
      const response = await fetch(`${getApiUrl()}/api/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred');
        return;
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      setErrorMessage(null); // Clear any previous error message
      setSuccessMessage('Log submitted successfully');
      setTimeout(() => {
        redirect('/dashboard/stats'); // Redirect on success
      }, 2000); // Show message for 2 seconds before redirecting
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('An error occurred while submitting the form');
    }
  }

  return (
    <Card className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">Log progress for the day</CardTitle>
        <CardDescription className="text-sm md:text-base lg:text-lg">Enter your step count, calories and workout details</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 lg:space-y-10">
          {errorMessage && <p className="text-red-500 text-sm md:text-base lg:text-lg">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm md:text-base lg:text-lg">{successMessage}</p>}
          <FormField
          control={form.control}
          name="NoofSteps"
          render={({ field }) => (
            <FormItem>
            <FormLabel className="text-sm md:text-base lg:text-lg">Enter the number of steps</FormLabel>
            <FormControl>
              <Input placeholder="..." {...field} type="number" onChange={(event) => {
                const value = event.target.value;
                const numberValue = parseFloat(value);
                field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
              }} />
            </FormControl>
            <FormDescription className="text-xs md:text-sm lg:text-base">
              No of steps completed for the day
            </FormDescription>
            <FormMessage />
            </FormItem>
          )} />
          <FormField
          control={form.control}
          name="NoofCals"
          render={({ field }) => (
            <FormItem>
            <FormLabel className="text-sm md:text-base lg:text-lg">Enter the number of Calories burnt</FormLabel>
            <FormControl>
              <Input placeholder="00" {...field} type="number" onChange={(event) => {
                const value = event.target.value;
                const numberValue = parseFloat(value);
                field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
              }} />
            </FormControl>
            <FormDescription className="text-xs md:text-sm lg:text-base">
              No of calories burnt today
            </FormDescription>
            <FormMessage />
            </FormItem>
          )} />
          <FormField
          control={form.control}
          name="activitysession"
          render={({ field }) => (
            <FormItem>
            <FormLabel className="text-sm md:text-base lg:text-lg">No of sessions</FormLabel>
            <FormControl>
              <Input placeholder="00" {...field} type="number" onChange={(event) => {
                const value = event.target.value;
                const numberValue = parseFloat(value);
                field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
              }} />
            </FormControl>
            <FormDescription className="text-xs md:text-sm lg:text-base">
              Activity performed for?
            </FormDescription>
            <FormMessage />
            </FormItem>
          )} />
          <FormField
          control={form.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
            <FormLabel className="text-sm md:text-base lg:text-lg">Select Activities</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <label key={activity} className="flex items-center space-x-2 text-xs md:text-sm lg:text-base">
                <input
                  type="checkbox"
                  value={activity}
                  checked={field.value.includes(activity)}
                  onChange={(event) => {
                    const value = event.target.value;
                    const newValue = event.target.checked
                      ? [...field.value, value]
                      : field.value.filter((v) => v !== value);
                    field.onChange(newValue);
                  }}
                />
                <span>{activity}</span>
                </label>
              ))}
              </div>
            </FormControl>
            <FormDescription className="text-xs md:text-sm lg:text-base">
              Select the activities you performed today
            </FormDescription>
            <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="text-sm md:text-base lg:text-lg">Submit</Button>
        </form>
        </Form>
      </CardContent>
    </Card>
  )
}
