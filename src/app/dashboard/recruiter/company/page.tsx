import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/utils/sessions/sessions';
import { getRecruiterCompany } from '@/lib/api/company';

const CompanyPage = async() => {
    const user = await getUserSession()
    console.log("User session in companyPage", user)
    const company = await getRecruiterCompany(user?.id)

    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company}/>
        </div>
    );
};

export default CompanyPage;