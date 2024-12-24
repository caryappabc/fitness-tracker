import imageM from "@/public/images/Workout_male_1.png"
import Image from 'next/image'
import { PieChartText } from "@/components/PieChatText"
import { AspectRatio } from "@/components/ui/aspect-ratio"


export default function MainCard () {

  return (
    <div className="flex-col row-span-3 col-span-3 h-full relativ">
      <div className="pt-6 pl-10" >
        <h1 className="uppercase text-5xl">SHAPE YOUR  IDEAL  BODY</h1>
        <p>Day 1</p>
      </div>
      <div className="flex-1 w-full justify-between h-full relative">
        <div className="flex-initial content-center absolute top-10 left-0 w-2/4"> 
            <PieChartText />
        </div>
        <div className="flex-1 content-top relative w-full">
          <AspectRatio ratio={16 / 9} >
            <Image 
              src={imageM}
              alt="Push ups"
              width={800}
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}
