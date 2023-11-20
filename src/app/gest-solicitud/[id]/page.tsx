import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

const GestionarSolicitud = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect("/")
  }{
    if(session?.user.rol !== "ADMIN"){
        redirect("/")
    }
  }

  return (
    <div>{id}</div>
  );
};

export default GestionarSolicitud;