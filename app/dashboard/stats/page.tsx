import Leaderlist from '@/components/Leaderlist'
import MontlyProgressChart from '@/components/MontlyProgressChart'
import StatsCard from '@/components/StatsCard'
import { Footprints, Gauge, Goal, Tally5 } from "lucide-react"
import { getApiUrl } from '@/utils/api';
import { auth } from '@/auth';

export default async function Stats() {
  const session = await auth();
  const res = await fetch(`${getApiUrl()}/api/user/${session?.user?.email}`);
  if(!res.ok){
    throw new Error('Failed to fetch user data');
  }
  const userdata = await res.json();

  // Fetch all users
  const allUsersResponse = await fetch(`${getApiUrl()}/api/user/all`);
  const allUsersData = await allUsersResponse.json();

  // Ensure allUsersData is an array
  const usersArray = Array.isArray(allUsersData) ? allUsersData : [];

  // Fetch logs for the current user
  const response = await fetch(`${getApiUrl()}/api/log?id=${userdata._id}`);
  const data = await response.json();

  // Fetch all collections and aggregate points
  const allLogsResponse = await fetch(`${getApiUrl()}/api/log`);
  const allLogsData = await allLogsResponse.json();

  interface Log {
    totalpoints: number;
  }

  const aggregatedPoints = allLogsData
    .filter((collection: { _id: string, logs?: Log[] }) => collection.logs && collection.logs.length > 0)
    .map((collection: { _id: string, logs: Log[] }) => {
      const totalPoints = collection.logs.reduce((acc: number, log: Log) => acc + log.totalpoints, 0);
      const user = usersArray.find((user: { _id: string }) => user._id === collection._id);
      return {
        user: user?.name || 'Unknown',
        id: collection._id,
        accumulatedPoints: totalPoints || 0,
        image: user?.image || ''
      };
    })
    .filter((point: { user: string, id: string, accumulatedPoints: number, image: string }) => point.accumulatedPoints > 0); // Only include users with points



  if (!Array.isArray(data) || !data.length) {
    return (
      <div className="container flex flex-col  mx-auto p-4 gap-y-5">
        <h1 className='font-extrabold text-2xl'>Dashboard</h1>
        <div className="border-3 border-white p-3">
        <p className="text-center text-red-600">No data!! Please log data daily to see your stats</p>
        </div>
        <div className="flex flex-row flex-no-wrap justify-start gap-x-2 order-2 md:order-3">
          <StatsCard title="Steps" icon={<Footprints />} />
          <StatsCard title="Calories" icon={<Gauge />} />
        </div>
        <div className="flex flex-col-reverse gap-y-3 lg:flex-row gap-x-2">
          <MontlyProgressChart />
          <Leaderlist data={aggregatedPoints}  />
        </div>
      </div>
    );
  }

  interface LogData {
    logdata: string;
    NoofSteps: number;
    NoofCals: number;
    totalpoints: number;
    activitysession: number;
  }

  // Ensure data is an array before using reduce
  const groupedLogs = Array.isArray(data) ? data.reduce((acc: { [key: string]: LogData[] }, log: LogData) => {
    const date = log.logdata.split('T')[0]; // Extract date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {}) : {};

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedLogs).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Get latest and previous day's data
  const latest = sortedDates.length > 0 ? groupedLogs[sortedDates[0]] : [];
  const previous = sortedDates.length > 1 ? groupedLogs[sortedDates[1]] : [];

  // Aggregate data for each day
  interface DailySum {
    steps?: number;
    calories?: number;
    points?: number;
    activity?: number;
    activityGoal?: number;
  }

  const aggregateDaily = (logs: LogData[] | []) => {
    return logs.reduce((sum: DailySum, log) => ({
      steps: (sum.steps || 0) + log.NoofSteps,
      calories: (sum.calories || 0) + log.NoofCals,
      points: (sum.points || 0) + log.totalpoints,
      activity: (sum.activity || 0) + log.activitysession,
      activityGoal: userdata.activitysessiongoal || 0, // Assuming this is constant per day
    }), {});
  };

  const latestStats = aggregateDaily(latest);
  const previousStats = aggregateDaily(previous);

  const stats = {
    steps: latestStats.steps ?? 0,
    stepsDiff: previousStats.steps ? (((latestStats.steps ?? 0) - previousStats.steps) / previousStats.steps) * 100 : 0,
    calories: latestStats.calories ?? 0,
    caloriesDiff: previousStats.calories ? (((latestStats.calories ?? 0) - previousStats.calories) / previousStats.calories) * 100 : 0,
    points: latestStats.points ?? 0,
    pointsDiff: previousStats.points ? (((latestStats.points ?? 0) - previousStats.points) / previousStats.points) * 100 : 0,
    activity: latestStats.activity ?? 0,
    activityGoal: latestStats.activityGoal ?? 0,
    activityDiff: previousStats.activity ? (((latestStats.activity ?? 0) - previousStats.activity) / previousStats.activity) * 100 : 0
  };

  // Calculate monthly aggregate points
  const monthlyStats = data.reduce((acc: { [key: string]: number }, log: { logdata: string; totalpoints: number }) => {
    const month = new Date(log.logdata).toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += log.totalpoints;
    return acc;
  }, {});

    const months = Object.keys(monthlyStats);
    const sortedMonths = months.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const latestMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths.length > 1 ? sortedMonths[sortedMonths.length - 2] : null;

    const currentMonthPoints = monthlyStats[latestMonth];
    const previousMonthPoints = previousMonth ? monthlyStats[previousMonth] : 0;

    const trend = previousMonthPoints ? ((currentMonthPoints - previousMonthPoints) / Math.abs(previousMonthPoints)) * 100 : 0;

  const monthlyProgressData = months.map((month) => ({
    month,
    points: monthlyStats[month],
  }));

  return (
    <div className="container flex flex-col mx-auto p-4 gap-y-5">
      <h1 className='font-extrabold text-2xl'>Dashboard</h1>
      <div className="flex flex-row flex-wrap md:flex-nowrap justify-start gap-x-2 gap-y-3">
          <StatsCard title="Steps" value={`${stats.steps} steps walked`} desc={`${stats.stepsDiff.toFixed(2)}% from last entry`} icon={<Footprints/>} />
          <StatsCard title="Calories" value={`${stats.calories} cal consumed`} desc={`${stats.caloriesDiff.toFixed(2)}% from last entry`} icon={<Gauge />} />
          <StatsCard title="Points" value={`${stats.points} pts earned`} desc={`${stats.pointsDiff.toFixed(2)}% from last entry`} icon={<Tally5 />} />
          <StatsCard title="Session" value={`${stats.activity} / ${stats.activityGoal} sessions`} desc={`${stats.activityDiff.toFixed(2)}% from last entry`} icon={<Goal />} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <MontlyProgressChart data={monthlyProgressData} trend={trend} />
        </div>
        <div className="w-full md:w-1/2">
          <Leaderlist data={aggregatedPoints} />
        </div>
      </div>
    </div>
  )
}

