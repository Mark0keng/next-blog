'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { redirect } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onsubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(res.ok){
        redirect('/api/auth/signin')
      } else {
        setError((await res.json()).message)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={onsubmit}>
      {error && <Alert variant={'destructive'}><AlertDescription className="text-xs">{error}</AlertDescription></Alert>}
      <div className="grid w-full items-center gap-4 pb-4">
        <div className="flex flex-col space-y-1.5 pt-2">
          <Label htmlFor="name">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
          />
        </div>
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
      <Button>Register</Button>
    </form>
  )
}
