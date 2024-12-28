"use client"
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from './ui/card';

interface User {
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

export default function ProfileCard({user} :{user : User | null} ) {
  const [userData, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <CardContent className='flex flex-col md:flex-row gap-4 p-4 md:p-6 lg:p-8 items-center md:items-center'>
      <div className="flex flex-col items-center md:items-start gap-y-5">
        <Avatar className='w-24 h-24 md:w-32 md:h-32'>
          <AvatarImage src={userData?.image} alt={userData?.name} />
          <AvatarFallback>{userData?.name?.slice(0, 2).toUpperCase()}</AvatarFallback> 
        </Avatar>
      </div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <p className="border-2 rounded-xl p-2 text-sm md:text-base h-fit">Height: {userData?.height} cm</p> 
        <p className="border-2 rounded-xl p-2 text-sm md:text-base  h-fit">Weight: {userData?.weight} kg</p> 
        <p className="border-2 rounded-xl p-2 text-sm md:text-base  h-fit">Activity: {userData?.activity}</p> 
        <p className="border-2 rounded-xl p-2 text-sm md:text-base  h-fit">Calorie Goal: {userData?.calorieGoal} kcal</p> 
        <p className="border-2 rounded-xl p-2 text-sm md:text-base  h-fit">Daily Activity Session Goal: {user?.activitysession}</p> 
      </div>
    </CardContent>
  );
}