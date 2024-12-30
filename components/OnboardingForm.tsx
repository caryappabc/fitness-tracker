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
import { getApiUrl } from "@/utils/api"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
     }),
     height: z.number().min(0, { message: 'Height must be greater than 0' }),
     weight: z.number().min(0, { message: 'Weight must be greater than 0' }),
     calorieGoal : z.number().min(0, {message: 'Calories must be greater than 0'}).optional(),
     activitysessiongoal : z.number().min(0, { message: 'Activity sessions must be greater than 0' })
    })

export default function OnboardingForm({username , email }: {username:string; email:string;}) {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: username ,
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        const updatingData = {...values, email : email, onboarded: true}
        try {
       const data = await fetch(`${getApiUrl()}/api/user/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatingData),
      })
       if (data.status === 200)
        toast.success("User onboarded");
        redirect('/dashboard');

    } catch (error) {
      toast.error('User onboarding failed')
      console.log("Error submitting form:", error);
      redirect('/');
      // Handle errors appropriately (e.g., display error messages to the user)
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
        <div className="flex flex-row flex-wrap gap-x-20 gap-y-5 content-center justify-left">
            
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input  placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Height</FormLabel>
            <FormControl>
              <Input  placeholder="Height"  {...field}  onChange={(event) => {
        const value = event.target.value;
        const numberValue = parseFloat(value);
        field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
      }}/>
            </FormControl>
            <FormDescription>
              Please enter your height in centimeters.
            </FormDescription>
            <FormMessage />
            </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight</FormLabel>
            <FormControl>
              <Input  placeholder="Weight" {...field} onChange={(event) => {
        const value = event.target.value;
        const numberValue = parseFloat(value);
        field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
      }} />
            </FormControl>
            <FormDescription>
              Please enter your weight in kilograms.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
        
            
        <FormField
          control={form.control}
          name="calorieGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories</FormLabel>
              <FormControl>
                <Input  placeholder="Calorie goal" {...field}  onChange={(event) => {
        const value = event.target.value;
        const numberValue = parseFloat(value);
        field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
      }}/>
              </FormControl>
              <FormDescription>
                Calorie goals per day.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activitysessiongoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No of Session</FormLabel>
              <FormControl>
                <Input  placeholder="Session goals" {...field} onChange={(event) => {
        const value = event.target.value;
        const numberValue = parseFloat(value);
        field.onChange(isNaN(numberValue) || numberValue < 0 ? '' : numberValue);
      }} />
              </FormControl>
              <FormDescription>
                No of sessions of the activity per day
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
        <Button className="w-fit" type="submit">Submit</Button>
      </form>
      <Toaster richColors />
    </Form>
  )
}
