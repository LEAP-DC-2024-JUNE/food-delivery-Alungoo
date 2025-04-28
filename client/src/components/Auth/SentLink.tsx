"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { renderUrl } from "@/utils/render";

const SentLink = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    if (!email) return;

    setIsResending(true);

    try {
      await fetch(`${renderUrl}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      alert("Email sent again!");
    } catch (error) {
      alert("Error sending email");
    }

    setIsResending(false);
  };

  return (
    <div className="flex flex-col gap-4 w-4/5">
      <p className="text-2xl font-semibold">Please verify Your Email</p>
      <p className="text-base text-zinc-500">
        We just sent an email to{" "}
        <strong>{email || "your email address"}</strong>. Click the link in the
        email to verify your account.
      </p>
      <Button onClick={handleResendEmail} className="w-full">
        {isResending ? "Sending..." : "Resend email"}
      </Button>
    </div>
  );
};

export default SentLink;
