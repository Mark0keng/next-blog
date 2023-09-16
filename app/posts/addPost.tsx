"use client"

import { useRouter } from "next/navigation"
import {SyntheticEvent, useState} from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export const AddPost = async() => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const session = await getServerSession(authOptions)
  const router = useRouter()

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          // authorId: session?.user.name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(res.ok){
        router.push('/posts')
      } else {
        setError((await res.json()).message)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
      <Dialog>
        <DialogTrigger>
          <Button>Add Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Post</DialogTitle>
          </DialogHeader>
            <form action="" className="space-y-4">
              <div>
              <Label htmlFor="title">Judul</Label>
              <Input></Input>
              </div>
              <div>
              <Label htmlFor="content">Konten / Isi</Label>
              <Textarea></Textarea>
              </div>
            </form>
          <DialogFooter>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}