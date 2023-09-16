import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { resetPassword } from "./_action";

export default function ForgotPassword() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <Card className="lg:w-1/4">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={resetPassword}>
            {/* {error && <Alert variant={'destructive'}><AlertDescription className="text-xs">{error}</AlertDescription></Alert>} */}
            <div className="grid w-full items-center gap-4 pb-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" />
              </div>
            </div>
            <Button>Reset Password</Button>
          </form>
          <p className="pt-3 text-sm">
            <Link className="text-indigo-800" href="/login">
              Return to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
