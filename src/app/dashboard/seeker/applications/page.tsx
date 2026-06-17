import {  SeekerApplicationsTable } from '@/components/dashboard/SeekerApplicationsTable';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/utils/sessions/sessions';
import { RawApplicantData } from '@/utils/types/JobTypes';

const SeekerApplicationsPage = async() => {
    const user= await getUserSession();
    const applications: RawApplicantData[] = await getApplicationsByApplicant(user?.id)
    // console.log("applications from applications page", applications)

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5 text-zinc-300'>Seeker Applications</h1>
            <SeekerApplicationsTable applications={applications}/>
        </div>
    );
};

export default SeekerApplicationsPage;