import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <Card className="lg:w-1/4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Link
            className="pt-3 text-sm text-indigo-800"
            href={"/forgot-password"}
          >
            Forgot Password?
          </Link>
          <p className="pt-3 text-sm">
            Does Not Have Account?{" "}
            <Link className="text-indigo-800" href="/register">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
