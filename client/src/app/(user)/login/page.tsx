"use client";
import { useFormik } from "formik";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

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
        const res = await fetch("http://127.0.0.1:4000/auth/sign-in", {
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

        const decodedToken = jwtDecode(data.token);
        console.log("Decoded token:", decodedToken);

        const userRole = (decodedToken as any).role?.toLowerCase();
        console.log("User role:", userRole);

        if (userRole === "admin") {
          router.push("/food-menu");
        } else {
          router.push("/");
        }

        console.log("Login response:", data);
      } catch (err) {
        setError("Something went wrong");
      }
    },
  });

  return (
    <div className="flex h-screen">
      <div className="w-1/3 flex justify-center items-center">
        <form onSubmit={formik.handleSubmit} className="space-y-4 w-4/5">
          <Button variant="outline">
            <ChevronLeft />
          </Button>
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
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
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

          <p className=" underline text-sm text-zinc-800 cursor-pointer">
            Forgot password?
          </p>

          <Button type="submit" className="w-full">
            Let's Go
          </Button>
          <p className=" text-zinc-500 text-xs text-center">
            Dont have an account?
            <span className=" text-blue-600 cursor-pointer"> Sign up</span>
          </p>
        </form>
      </div>

      <div className="relative w-2/3 h-screen ">
        <Image
          src="/login.png"
          alt="Login"
          layout="fill"
          objectFit="cover"
          className="rounded-t-3xl rounded-b-3xl"
        />
      </div>
    </div>
  );
};

export default LoginForm;
