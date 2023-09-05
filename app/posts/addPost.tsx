"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import {SyntheticEvent, useState} from "react"

const AddPost = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  
  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async(e: SyntheticEvent) => {
    e.preventDefault()
    await axios.post('/api/post', {
      title: title,
      body: body,
    })
    setTitle("")
    setBody("")
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <button className="btn btn-primary mb-5" onClick={handleModal}>Add Post</button>

      <dialog className={ isOpen ? 'modal modal-open': 'modal'}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-5">Add New Post</h3>
            <div className="form-control w-full">
              <label className="label font-bold">Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"/>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Body</label>
              <input 
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="input input-bordered"/>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={handleModal}>Close</button>
              <button className="btn btn-primary">Save</button>
            </div>
        </form>
      </dialog>
    </div>
  )
}

export default AddPost