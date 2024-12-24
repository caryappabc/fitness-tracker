import Leaderlist from '@/components/Leaderlist'
import MontlyProgressChart from '@/components/MontlyProgressChart'
import StatsCard from '@/components/StatsCard'
import { Footprints, Gauge, Goal, Tally5 } from "lucide-react"

export default function Stats () {
  

  return (
    <div className="container flex flex-col mx-auto p-4 gap-y-5">
      <h1 className='font-extrabold text-2xl'>Dashboard</h1>
      <div className="flex flex-row flex-no-wrap justify-start gap-x-2">
          <StatsCard title="Steps" value={`${6256} steps`} desc="+2.3% from yesterday" icon={<Footprints/>} />
          <StatsCard title="Calories" value={`${130} consumed`} desc="+4.63% from yesterday" icon={<Gauge />} />
          <StatsCard title="Points" value={`${8}`} desc="earned today" icon={<Tally5 />} />
          <StatsCard title="Activity" value={`${3} / ${4} steps`} desc="completed today" icon={<Goal />} />
      </div>
      <div className="flex flex-row gap-x-2">
        <MontlyProgressChart />
        <Leaderlist />
      </div>
    </div>
  )
}

