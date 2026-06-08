import { getCompanyjobs } from '@/lib/api/jobs';

const RecruiterJobs = async() => {
    const companyJobs = await getCompanyjobs("mock-company-id")
    console.log(companyJobs)

    return (
        <div>
            <h1>Recruiter jobs</h1>
        </div>
    );
};

export default RecruiterJobs;