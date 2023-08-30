
"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import auth from '../services/Auth';
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
 
  useEffect(() => {
    if (!auth.isAuthenticated())
      router.push("/login")
  }, [])
  return (
      <div> {children}</div>
  )
}
