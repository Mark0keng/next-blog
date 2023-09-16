import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Success() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <Card className="lg:w-1/4">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            The email has sent, please check your email!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
