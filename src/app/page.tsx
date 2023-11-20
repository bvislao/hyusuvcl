'use client'
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/register")
  return (
   <section className="flex-start flex-col padding mb-16">
    Hola Mundo

   </section>
  )
}
