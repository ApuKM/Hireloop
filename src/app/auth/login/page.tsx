"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Input,
  Button,
  Separator,
  Link,
  TextField,
  FieldError,
  Label,
} from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { LoginFormInputs } from "@/utils/types/HomePageTypes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      //   console.log("React Hook Form successfully extracted:", data);
      const { data: authData, error: authError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/",
        });
      if (authError) {
        setError("root", {
          message:
            authError.message || "Failed to create account. Please try again.",
        });
        return;
      }
      console.log("Login succesful:", data);
      router.push("/")
    } catch (err) {
      setError("root", { message: "Network error. Please try again later." });
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative font-sans overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#5a45ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="dark relative w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm">
            Sign in to continue to HireLoop.
          </p>
        </div>

        <Button
          fullWidth
          className="bg-[#111] border-white/10 text-gray-200 hover:bg-[#161616] h-12 rounded-xl text-sm font-medium transition-colors flex items-center"
          onPress={() => console.log("Google Auth Triggered")}
        >
          <FcGoogle className="text-xl" />
          Log in with Google
        </Button>

        <div className="flex items-center my-6 gap-4">
          <Separator className="flex-1 bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium shrink-0">
            or
          </span>
          <Separator className="flex-1 bg-white/10" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-4"
        >
          {/* Email Field - Removed HeroUI's isRequired */}
          <TextField fullWidth isInvalid={!!errors.email}>
            {/* Added manual asterisk if you want to keep the visual indicator */}
            <Label>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              placeholder="user@example.com"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <FieldError className="text-red-500 text-xs mt-1">
                {errors?.email?.message}
              </FieldError>
            )}
          </TextField>

          {/* Password Field - Removed HeroUI's isRequired */}
          <TextField fullWidth isInvalid={!!errors.password}>
            <Label>
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative flex w-full items-center">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pr-10"
                {...register("password", {
                  required: "Password is required.",
                })}
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
            {errors.password && (
              <FieldError className="text-red-500 text-xs mt-1">
                {errors?.password?.message}
              </FieldError>
            )}
          </TextField>

          {errors.root && (
            <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg mt-2">
              {errors?.root?.message}
            </p>
          )}

          <div className="flex justify-end w-full">
            <Link
              href="/auth/reset-password"
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            fullWidth
            type="submit"
            className="bg-[#5a45ff] hover:bg-[#4936e0] font-medium text-white text-sm h-12 rounded-xl shadow-lg shadow-[#5a45ff]/20 transition-all mt-4"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#5a45ff] hover:text-[#7664ff] hover:underline font-medium text-xs ml-1 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
