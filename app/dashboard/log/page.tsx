import { auth } from '@/auth';
import LogForm from '@/components/LogForm'
import { getApiUrl } from '@/utils/api';

export default async function Log() {
  const session = await auth();
      const response = await fetch(`${getApiUrl()}/api/user/${session?.user?.email}`);
      const data = await response.json();
  return (
    <div className="flex mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
       <LogForm data={data} /> 
    </div>
    
  )
}

