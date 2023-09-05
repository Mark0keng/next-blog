import Link from "next/link"
import { RegisterForm } from "./form"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="lg:w-1/4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm/>
          <p className="pt-3 text-sm">Have an Account? <Link className="text-indigo-800" href='/api/auth/signin'>Login</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
