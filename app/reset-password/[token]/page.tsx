"use client";

import { resetPassword } from "@/app/reset-password/[token]/_action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const [error, setError] = useState<string>("");

  async function submit(data: FormData) {
    const { error } = await resetPassword(params.token, data);
    setError(error || "");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <Card className="lg:w-1/4">
        <CardHeader>
          <CardTitle>Create New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={submit}>
            {/* {error && <Alert variant={'destructive'}><AlertDescription className="text-xs">{error}</AlertDescription></Alert>} */}
            <div className="grid w-full items-center gap-4 pb-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input name="password" id="password" type="password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input name="confirm" id="confirm" type="password" />
              </div>
            </div>
            <Button>Reset Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
