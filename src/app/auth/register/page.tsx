"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Separator,
  Link,
  TextField,
  Description,
  FieldError,
  Label,
} from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { SignUpFormData } from "@/utils/types/homePageTypes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Role = "seeker" | "recruiter";

export default function SignUpForm() {
  // Centralized Form State
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    role: "seeker",
  });
  const router = useRouter();

  // Processing & UI States
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- Real-time Validation Logic ---
  // Using derived state ensures validation is always perfectly in sync with input values.
  const isUsernameInvalid = React.useMemo(() => {
    return formData.username.length > 0 && formData.username.length < 3;
  }, [formData.username]);

  const isEmailInvalid = React.useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formData.email.length > 0 && !emailRegex.test(formData.email);
  }, [formData.email]);

  const isPasswordInvalid = React.useMemo(() => {
    const password = formData.password;

    // Do not show an error if the user hasn't typed anything yet
    if (password.length === 0) return false;

    // Validation rules
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password); // Checks for anything that is NOT a letter or number

    // Returns true (invalid) if ANY of the conditions are false
    return !(hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar);
  }, [formData.password]);

  // General handler for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear global API errors once the user starts typing again
    if (apiError) setApiError("");
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    // Prevent submission if fields are currently invalid or empty
    if (isUsernameInvalid || isEmailInvalid || isPasswordInvalid) return;
    if (!formData.username || !formData.email || !formData.password) {
      setApiError("Please fill out all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      // Simulating network latency
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // console.log("Form Data successfully processed:", formData);
      // Proceed to routing or success state here
      const { data, error: authError } = await authClient.signUp.email({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        image: formData.imageUrl ? formData.imageUrl : undefined,
        role: formData.role,  
      });
      // console.log(data)
      if (authError) {
        setApiError(
          authError.message || "Failed to create account. Please try again.",
        );
        return;
      }
      console.log("Account successfully created:", data);

      // Redirect to dashboard or login page upon success
      router.push("/");
    } catch (err) {
      setApiError(
        "Something went wrong establishing a connection. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative font-sans overflow-hidden">
      {/* Background glow matching the Hero page theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#5a45ff]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="dark relative w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
            Create an account
          </h2>
          <p className="text-gray-400 text-sm">
            Join HireLoop and find your dream career.
          </p>
        </div>

        {/* OAuth Button */}
        <Button
          fullWidth
          className="bg-[#111] border-white/10 text-gray-200 hover:bg-[#161616] h-12 rounded-xl text-sm font-medium transition-colors flex items-center"
          onPress={() => console.log("Google Auth Triggered")}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center my-6 gap-4">
          <Separator className="flex-1 bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium shrink-0">
            or
          </span>
          <Separator className="flex-1 bg-white/10" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          {/* Username Field */}
          <TextField
            isRequired
            fullWidth
            isInvalid={isUsernameInvalid}
            name="username"
          >
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="jane_doe"
              value={formData.username}
              onChange={handleChange}
            />
            {isUsernameInvalid ? (
              <FieldError className="text-red-500 text-xs mt-1">
                Username must be at least 3 characters.
              </FieldError>
            ) : (
              <Description className="text-gray-500 text-xs mt-1">
                Choose a unique username for your profile.
              </Description>
            )}
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            fullWidth
            isInvalid={isEmailInvalid}
            name="email"
          >
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {isEmailInvalid && (
              <FieldError className="text-red-500 text-xs mt-1">
                Please enter a valid email address.
              </FieldError>
            )}
          </TextField>

          {/* Password Field */}
          {/* Password Field */}
          <TextField
            isRequired
            fullWidth
            isInvalid={isPasswordInvalid}
            name="password"
          >
            <Label>Password</Label>
            {/* Relative wrapper to hold the input and the absolute button */}
            <div className="relative flex w-full items-center">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pr-10" // Padding right to prevent text overlap with the icon
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 focus:outline-none text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
            {isPasswordInvalid && (
              <FieldError className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters long. 1 uppercase, 1
                lowercase and special character.
              </FieldError>
            )}
          </TextField>

          {/* Optional Avatar Field */}
          <TextField fullWidth name="imageUrl">
            <Label>Avatar URL (Optional)</Label>
            <Input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/avatar.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </TextField>

          {/* Radio */}
          <div className="flex flex-col gap-4">
            <Label>What are you?</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              orientation="horizontal"
              value={formData.role}
              onChange={(value) => {
                setFormData((prev) =>({
                  ...prev,
                  role: value as Role,
                }))
              }}
              isRequired
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Global Form Error */}
          {apiError && (
            <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
              {apiError}
            </p>
          )}

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            isDisabled={
              isUsernameInvalid || isEmailInvalid || isPasswordInvalid
            }
            className="bg-[#5a45ff] hover:bg-[#4936e0] font-medium text-white text-sm h-12 rounded-xl shadow-lg shadow-[#5a45ff]/20 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#5a45ff] hover:text-[#7664ff] hover:underline font-medium text-xs ml-1 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
