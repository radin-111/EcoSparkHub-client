"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { verifyEmail } from "@/Actions/auth.action";
import { toast } from "sonner";

const OTP_LENGTH = 6;

export default function VerifyEmail() {
    const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  
   

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(paste)) return;

    const pasteArr = paste.slice(0, OTP_LENGTH).split("");
    const newOtp = [...otp];

    pasteArr.forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    // focus last filled input
    const lastIndex = pasteArr.length - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    const toastId = toast.loading("Verifying email...");
    try {
      
      const response = await verifyEmail(otpString);
      if(response.success){
        router.push("/dashboard");
        toast.success("Verification successful!",{
          id: toastId
        });
      }
    } catch (error:any) {
      
      toast.error("Invalid OTP. Please try again.",{
        id: toastId
      });
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP BOXES */}
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="
                    w-12 h-12 text-center text-lg font-semibold
                    border rounded-md
                    focus:outline-none focus:ring-2 focus:ring-primary
                    transition
                  "
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Didn’t receive the code?{" "}
            <button
              type="button"
              className="text-primary underline underline-offset-4"
            >
              Resend
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
