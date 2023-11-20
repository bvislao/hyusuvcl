import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

const Solicitudes = async () => {
  const session = await getCurrentUser();
  if (!session?.user) {
    redirect("/register")
  }{
    if(session?.user.rol !== "ADMIN"){
        redirect("/register")
    }
  }

  return (
    <div>Registrar Solicitudes</div>
  );
};

export default Solicitudes;