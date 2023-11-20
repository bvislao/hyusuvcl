import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

const Solicitudes = async () => {
  const session = await getCurrentUser();
  if (!session?.user) {
    redirect("/")
  }{
    if(session?.user.rol !== "ADMIN"){
        redirect("/")
    }
  }

  return (
    <div>Gestionar Solicitudes</div>
  );
};

export default Solicitudes;