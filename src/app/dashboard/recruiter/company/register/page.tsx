"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  Button,
  Input,
  TextArea,
  Select,
  ListBox,
  TextField,
  Label,
  Description,
  toast,
} from "@heroui/react";
import { FiUploadCloud, FiX, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { CompanyData } from "@/utils/types/DashboardTypes";
import { createCompany } from "@/lib/api/company";
import { authClient } from "@/lib/auth-client";

const fieldClassNames = {
  label: "text-gray-300 text-sm font-medium mb-1.5",
  description: "text-gray-500 text-xs mt-1",
  fieldError: "text-danger text-xs mt-1",
};

const inputWrapperStyle =
  "w-full bg-zinc-900 border text-sm text-zinc-100 rounded-md px-3 py-2.5 outline-none transition-colors placeholder:text-zinc-500 focus:border-[#5b5ef5] disabled:opacity-50 disabled:cursor-not-allowed";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formName, setFormName] = useState("");
  const [formIndustry, setFormIndustry] = useState("");
  const [formWebsite, setFormWebsite] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formEmployeeCount, setFormEmployeeCount] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let uploadedImageUrl = "";

    // 1. ImageBB Upload Logic
    if (selectedFile) {
      try {
        const imageData = new FormData();
        imageData.append("image", selectedFile);

        // Replace with your actual ImgBB API key or use process.env
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API;

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imageData,
          },
        );

        const result = await response.json();

        if (result.success) {
          uploadedImageUrl = result.data.url;
          console.log("Hosted Image URL:", uploadedImageUrl);
        } else {
          console.error("ImgBB Upload Failed:", result.error);
        }
      } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
      }
    }

    const payload: CompanyData = {
      formName,
      formIndustry,
      formLocation,
      formWebsite,
      formEmployeeCount,
      formDescription,
      companyLogo: uploadedImageUrl,
      recruiterId: user?.id,
    };
    // 2. Perform your actual save API logic here with all form data + uploadedImageUrl
    console.log("Saving company details...", payload);

    const res = await createCompany(payload);
    if (res.modifiedCount) {
      toast.success("Company added to the database");
    }

    setIsSubmitting(false);

    // 3. Redirect back to the company profile page
    router.push("/dashboard/recruiter/company");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-4xl relative z-10">
        {/* Back Navigation */}
        <NextLink
          href="/dashboard/recruiter/company"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Profile
        </NextLink>

        {/* Form Container */}
        <div className="dark bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-3xl overflow-hidden">
          <form onSubmit={handleSaveCompany}>
            {/* Header */}
            <div className="p-8 pb-6 border-b border-white/5">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Company Details
              </h2>
              <p className="text-sm text-gray-500 font-normal mt-1">
                Please fill out your business details to start hiring on
                HireLoop.
              </p>
            </div>

            {/* Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="space-y-6">
                <TextField isRequired>
                  <Label className={fieldClassNames.label}>Company Name</Label>
                  <Input
                    placeholder="e.g. Acme Corporation"
                    className={`${inputWrapperStyle} focus:border-[#5b5ef5] `}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </TextField>

                <TextField isRequired>
                  <Label className={fieldClassNames.label}>
                    Headquarters Location
                  </Label>
                  <Input
                    placeholder="e.g. San Francisco, USA"
                    className={inputWrapperStyle}
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                  />
                </TextField>

                <Select
                  isRequired
                  placeholder="Select industry"
                  value={formIndustry}
                  onChange={(val) => setFormIndustry(val as string)}
                >
                  <Label className={fieldClassNames.label}>
                    Industry / Category
                  </Label>
                  <Select.Trigger
                    className={`${inputWrapperStyle} flex items-center justify-between px-4 text-left data-[hover=true]:border-white/10 data-[focus=true]:border-[#5a45ff]/70`}
                  >
                    <span
                      className={
                        formIndustry ? "text-white" : "text-gray-600 text-sm"
                      }
                    >
                      {formIndustry || "Select industry"}
                    </span>
                  </Select.Trigger>
                  <Select.Popover className="dark bg-[#111] border border-white/10 rounded-xl mt-1 shadow-2xl p-1">
                    <ListBox selectionMode="single" className="space-y-1">
                      {["Technology", "Finance", "Healthcare", "Design"].map(
                        (ind) => (
                          <ListBox.Item
                            key={ind}
                            id={ind}
                            textValue={ind}
                            className="rounded-lg text-sm text-gray-200 data-[hover=true]:bg-white/5 data-[selected=true]:bg-[#5a45ff]/10 data-[selected=true]:text-[#a7a2ff]"
                          >
                            {ind}
                          </ListBox.Item>
                        ),
                      )}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="space-y-6">
                <TextField>
                  <Label className={fieldClassNames.label}>Website URL</Label>
                  <div className="flex h-11 rounded-xl overflow-hidden bg-[#111] border border-white/5 focus-within:border-[#5a45ff]/70">
                    <div className="bg-[#1a1a1a] border-r border-white/5 px-4 flex items-center justify-center text-gray-500 text-sm font-medium tracking-wide">
                      https://
                    </div>
                    <Input
                      type="text"
                      placeholder="example.com"
                      className="bg-transparent border-none outline-none focus:ring-0 w-full px-4 text-white placeholder:text-gray-600 text-sm"
                      value={formWebsite}
                      onChange={(e) => setFormWebsite(e.target.value)}
                    />
                  </div>
                </TextField>

                <Select
                  placeholder="Select range"
                  value={formEmployeeCount}
                  onChange={(val) => setFormEmployeeCount(val as string)}
                >
                  <Label className={fieldClassNames.label}>
                    Employee Count Range
                  </Label>
                  <Select.Trigger
                    className={`${inputWrapperStyle} flex items-center justify-between px-4 text-left`}
                  >
                    <span
                      className={
                        formEmployeeCount
                          ? "text-white"
                          : "text-gray-600 text-sm"
                      }
                    >
                      {formEmployeeCount || "Select range"}
                    </span>
                  </Select.Trigger>
                  <Select.Popover className="dark bg-[#111] border border-white/10 rounded-xl mt-1 shadow-2xl p-1">
                    <ListBox selectionMode="single" className="space-y-1 ">
                      {["1-10", "11-50", "51-200", "200+"].map((count) => (
                        <ListBox.Item
                          key={count}
                          id={`${count} employees`}
                          textValue={`${count} employees`}
                          className="rounded-lg text-sm text-gray-200 data-[hover=true]:bg-white/5"
                        >
                          {count} employees
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <div className="flex flex-col gap-2">
                  <label className={fieldClassNames.label}>Company Logo</label>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex items-center gap-4 p-3 bg-[#111] border border-white/5 rounded-xl">
                    <Button
                      onPress={() => fileInputRef.current?.click()}
                      className="w-5 h-5 shrink-0 rounded-lg border-2 border-dashed border-gray-600 bg-[#161616] flex items-center justify-center hover:border-gray-400 hover:bg-[#1a1a1a] cursor-pointer transition-colors min-w-0 p-0"
                      variant="tertiary"
                    >
                      <FiUploadCloud className="text-gray-500 w-4 h-4" />
                    </Button>
                    <div className="text-xs flex gap-3">
                      <Button
                        onPress={() => fileInputRef.current?.click()}
                        variant="ghost"
                        className="p-0 h-auto text-xs text-white font-semibold hover:underline min-w-0"
                      >
                        Choose image
                      </Button>
                      <Description className="text-gray-600 mt-0.5 text-xs">
                        PNG, JPG up to 5MB
                      </Description>
                    </div>
                  </div>
                  {imagePreview && (
                    <div className="mt-3 flex items-center gap-3 bg-[#111] border border-white/5 p-2.5 rounded-xl w-fit relative">
                      <Button
                        size="sm"
                        isIconOnly
                        variant="ghost"
                        onPress={() => {
                          setSelectedFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 min-w-0 rounded-full bg-danger text-white hover:bg-danger/80 z-10 p-0"
                      >
                        <FiX size={12} />
                      </Button>
                      <Image
                        src={imagePreview}
                        alt="Logo preview"
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-lg object-cover border border-white/5 shadow"
                      />
                      <div className="pr-1">
                        <p className="text-xs font-semibold text-gray-300 truncate max-w-[150px]">
                          {selectedFile
                            ? selectedFile.name
                            : "Image URL Loaded"}
                        </p>
                        <p className="text-[11px] text-success font-medium">
                          Ready for upload
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <TextField isRequired>
                  <Label className={fieldClassNames.label}>
                    Brief Description / Overview
                  </Label>
                  <TextArea
                    placeholder="Tell us about your company's mission, values, and culture..."
                    rows={4}
                    className="bg-[#111] border border-white/5 rounded-xl transition-colors data-[hover=true]:border-white/10 group-data-[focus=true]:border-[#5a45ff]/70 text-white placeholder:text-gray-600 p-4 text-sm"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                  <Description className="text-gray-600 mt-2">
                    Briefly introduce your company to job seekers (max 500
                    characters).
                  </Description>
                </TextField>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 py-6 border-t border-white/5 flex justify-end gap-4 bg-[#0a0a0a]">
              <Link href="dashboard/recruiter/company">
                <Button
                  variant="tertiary"
                  className="bg-white text-black font-bold px-10 py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                >
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                variant="tertiary"
                isDisabled={isSubmitting}
                className="bg-white text-black font-bold rounded-xl px-10 shadow-lg shadow-white/5 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Uploading..." : "Save & Continue"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
