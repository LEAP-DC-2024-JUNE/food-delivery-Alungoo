"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { renderUrl } from "@/utils/render";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${renderUrl}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        router.push(`/link-sent?email=${encodeURIComponent(email)}`);
      } else {
        alert("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 w-4/5">
      <p className="text-2xl font-semibold">Reset your password</p>
      <p className="text-base text-zinc-500">
        Enter your email to receive a password reset link.
      </p>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        onClick={handleResetPassword}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Link"}
      </Button>

      <p className="text-zinc-500 text-xs text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default ResetPass;
