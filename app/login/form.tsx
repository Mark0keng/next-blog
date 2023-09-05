'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter , useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signIn } from "next-auth/react"

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl
      })

      if(!res?.error) {
        router.push(callbackUrl)
      } else {
        setError(res?.error || 'Invalid Email or Password')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <Alert variant={'destructive'}><AlertDescription className="text-xs">{error}</AlertDescription></Alert>}
      <div className="grid w-full items-center gap-4 pb-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
      </div>
      <Button>Login</Button>
    </form>
  )
}