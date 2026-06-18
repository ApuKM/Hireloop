import React from "react";
import PostJobForm from "./PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/company";


const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();
//   const user = await getUserSession();
//   const applications: RawApplicantData[] = await getApplicationsByApplicant(
//     user?.id,
//   );
//   console.log(applications)
//   const plan: Plan = await getPlanById(user?.plan);
//   console.log("Plan from postJob", plan);

  return (
    <div>
      <PostJobForm company={company} />
    </div>
  );
};

export default PostJobPage;
