import { auth } from "@/auth";
import { getApiUrl } from '@/utils/api';
import ProfileCard from '@/components/ProfileCard';
import LogTable from '@/components/LogTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
    const session = await auth();
    const userResponse = await fetch(`${getApiUrl()}/api/user/${session?.user?.email}`);
    const userData = await userResponse.json();
    const userId = userData?._id;

    const logResponse = await fetch(`${getApiUrl()}/api/log?id=${userId}`);
    const logs: { _id: string; logdata: string; NoofSteps: number; NoofCals: number; activitysession: number; walk: number; session: number; totalpoints: number; activities: string[];}[] | {message : string;} = await logResponse.json();
    if (Array.isArray(logs)) {
        logs.sort((a, b) => new Date(b.logdata).getTime() - new Date(a.logdata).getTime());
    }

    return (
      <div className="p-4 md:p-6 space-y-4">
        <Card className="w-full h-fit">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                    {userData?.name ?? "User"}
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <ProfileCard user={userData} />
            </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle className={` ${!Array.isArray(logs) ? "text-red-600" : ""} text-lg md:text-xl `}>
                {Array.isArray(logs) ? "Session logs" : "No logs found , Please make an entry for the day"}
            </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
            <LogTable logs={logs} />
        </CardContent>
    </Card>
    </div>
    );
}