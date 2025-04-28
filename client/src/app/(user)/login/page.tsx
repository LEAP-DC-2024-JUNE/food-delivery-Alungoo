"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { renderUrl } from "@/utils/render";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email is invalid").required("Email required"),
      password: Yup.string().min(8, "Too short").required("Password required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${renderUrl}/auth/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        console.log("res data>>>", data);

        if (!data.token) {
          console.error("No token received");
          setError("Login failed: No token received");
          return;
        }

        localStorage.setItem("token", data.token);

        const userRole = data.role;
        console.log("User role:", userRole);

        if (userRole === "ADMIN") {
          router.push("/food-menu");
        } else {
          router.push("/");
        }
      } catch (err) {
        setError("Something went wrong");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 w-4/5">
      <div className=" flex flex-col gap-0">
        <p className=" font-bold">Login</p>
        <p className=" text-xs text-zinc-500">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <div>
        <Input
          name="email"
          value={formik.values.email}
          type="email"
          placeholder="Enter your email address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <Input
          name="password"
          value={formik.values.password}
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <Link
        href="/forget-password"
        className=" underline text-sm text-zinc-800 cursor-pointer mt-2"
      >
        Forgot password?
      </Link>

      <Button type="submit" className="w-full">
        Let's Go
      </Button>
      <p className=" text-zinc-500 text-xs text-center">
        Dont have an account?
        <Link href={"/signup"} className=" text-blue-600 cursor-pointer">
          {" "}
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
