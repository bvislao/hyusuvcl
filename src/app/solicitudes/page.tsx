'use client'
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

const Solicitudes = async () => {
  const session = await getCurrentUser();
  if (!session?.user) {
    redirect("/");
  } else {
    if (session?.user.rol !== "ADMIN") {
      redirect("/");
    }
  }

  //*********  TABLE *******************//


  return (
    <div className="flexCenter  p-2 m-2 text-3xl">
      <br />
      <h1>Gestionar Solicitudes</h1>
      <br />
    </div>
  );
};

export default Solicitudes;
