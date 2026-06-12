import { PostedJobsTable } from '@/components/dashboard/PostedJobsTable';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';
import { getCompanyjobs } from '@/lib/api/jobs';
import { CompanyData, JobFormValues } from '@/utils/types/DashboardTypes';

const RecruiterJobs = async() => {
    const company: CompanyData = await getLoggedInRecruiterCompany()
    const companyJobs: JobFormValues[] = await getCompanyjobs(company._id)
    // console.log(companyJobs)

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5 text-zinc-300'>Recruiter jobs</h1>
            <PostedJobsTable companyJobs={companyJobs}/>
        </div>
    );
};

export default RecruiterJobs;