'use client'

import {signIn, signOut} from 'next-auth/react'

export const LoginButton = () => {
  return <button onClick={() => signIn()} className="btn btn-info">Login</button>
}

export const LogoutButton = () => {
  return <button onClick={() => signOut()} className="btn btn-error">Logout</button>
}