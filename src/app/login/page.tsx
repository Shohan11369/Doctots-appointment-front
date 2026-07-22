"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getMe, login } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setError(null);
      await login({ email: data.email, password: data.password });
      const user = await getMe();
      const nextPath =
        user.role === "admin"
          ? "/admin-dashboard"
          : user.role === "doctor"
            ? "/doctor-dashboard"
            : redirectPath;

      setSuccess(true);
      setTimeout(() => {
        router.push(nextPath);
      }, 500);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/60 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...form.register("email")}
            type="email"
            placeholder="Email"
            className="bg-card/50"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...form.register("password")}
              placeholder="Password"
              className="bg-card/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && (
            <p className="text-sm text-destructive font-medium text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-emerald-500 font-medium text-center">
              Login successful! Redirecting...
            </p>
          )}
          <Button className="w-full" type="submit" disabled={success}>
            Login
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() =>
            (window.location.href =`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`)
          }
        >
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
