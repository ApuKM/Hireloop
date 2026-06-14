"use client";

import {
  Button,
  Card,
  CardHeader,
  Form,
  Separator,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
  Toast,
  toast,
} from "@heroui/react";

import { LuFileText, LuGlobe, LuLinkedin } from "react-icons/lu";
import { JobFormDB } from "@/utils/types/DashboardTypes";
import { User } from "better-auth";
import { JobApplicationPayload } from "@/utils/types/JobTypes";
import { submitApplication } from "@/lib/api/applications";
import { useRouter } from "next/navigation";

interface Props {
  job: JobFormDB;
  applicant: User;
}

export default function ApplyFormClient({ job, applicant }: Props) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload: JobApplicationPayload = {
      jobId: job._id,
      applicantId: applicant.id,
      applicantEmail: applicant.email,
      resumeUrl: String(formData.get("resumeUrl") ?? ""),
      portfolioUrl: String(formData.get("portfolioUrl") ?? ""),
      linkedinUrl: String(formData.get("linkedinUrl") ?? ""),
      coverLetter: String(formData.get("coverLetter") ?? ""),
    };

    // console.log("payload from Job apply form", payload);
    const res = await submitApplication(payload);
    if (res.insertedId) {
      toast.success("Application successful");
      router.push("/jobs");
    }
  };

  return (
    <Card className="border border-default-200">
      <CardHeader className="flex flex-col items-start gap-1">
        <h2 className="text-xl font-semibold">Application Details</h2>

        <p className="text-sm text-default-500">
          Submit your resume and any additional information.
        </p>
      </CardHeader>

      <Separator />

      <Card.Content className="p-6">
        <Form onSubmit={handleSubmit} className="space-y-5">
          {/* Resume URL */}

          <TextField fullWidth name="resumeUrl" type="url" isRequired>
            <Label>Resume Link</Label>

            <div className="relative">
              <LuFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />

              <Input
                className="pl-10"
                placeholder="https://drive.google.com/file/..."
              />
            </div>

            <Description>Public resume URL is required.</Description>

            <FieldError />
          </TextField>

          {/* Portfolio */}

          <TextField fullWidth name="portfolioUrl" type="url">
            <Label>Portfolio Website</Label>

            <div className="relative">
              <LuGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />

              <Input
                className="pl-10"
                placeholder="https://yourportfolio.com"
              />
            </div>

            <Description>Optional personal portfolio.</Description>

            <FieldError />
          </TextField>

          {/* LinkedIn */}

          <TextField fullWidth name="linkedinUrl" type="url">
            <Label>LinkedIn Profile</Label>

            <div className="relative">
              <LuLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />

              <Input
                className="pl-10"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <Description>Optional professional profile.</Description>

            <FieldError />
          </TextField>

          {/* Additional Info */}

          <TextField name="coverLetter">
            <Label>Additional Information</Label>

            <TextArea
              rows={5}
              placeholder="Tell the recruiter anything you'd like them to know..."
            />

            <Description>
              Cover letter, availability, salary expectations, etc.
            </Description>

            <FieldError />
          </TextField>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              size="sm"
              className={"bg-white hover:bg-zinc-300 text-zinc-900 text-sm font-semibold"}
            >
              Apply Now
            </Button>

            <Button type="reset" variant="ghost">
              Reset
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
}
