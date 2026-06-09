import { PostedJobsTable } from '@/components/dashboard/PostedJobsTable';
import { getCompanyjobs } from '@/lib/api/jobs';
import { JobFormValues } from '@/utils/types/DashboardTypes';

const RecruiterJobs = async() => {
    const companyJobs: JobFormValues[] = await getCompanyjobs("mock-company-id")
    // console.log(companyJobs)

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5 text-zinc-300'>Recruiter jobs</h1>
            <PostedJobsTable companyJobs={companyJobs}/>
        </div>
    );
};

export default RecruiterJobs;