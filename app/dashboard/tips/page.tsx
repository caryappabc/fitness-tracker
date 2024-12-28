"use client";

import { Card } from "@/components/ui/card";
import { RocketIcon, Sparkles, Construction } from "lucide-react";
import { motion } from "framer-motion";

export default function TipsPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="flex gap-2">
            <Construction className="w-8 h-8 text-primary animate-bounce" />
            <RocketIcon className="w-8 h-8 text-primary animate-pulse" />
            <Sparkles className="w-8 h-8 text-primary animate-bounce" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">
            Fitness Tips Coming Soon!
          </h1>
          
          <p className="text-muted-foreground text-lg">
            We&apos;re cooking up some amazing fitness wisdom that&apos;ll make your
            workouts more awesome than a unicorn doing burpees! 🦄💪
          </p>
          
          <div className="text-sm text-muted-foreground">
            Our fitness ninjas are working their magic...
          </div>
        </motion.div>
      </Card>
    </div>
  );
}