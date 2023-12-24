import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {getSolicitudesPorAtender} from "@/lib/actions";
import {
  Edge
} from "../../../common.types";

const Solicitudes = async () => {
  const session = await getCurrentUser();
  if (!session?.user) {
    redirect("/");
  } else {
    if (session?.user.rol !== "ADMIN") {
      redirect("/");
    }
  }


  const dataSolicitudes  = await getSolicitudesPorAtender() as Edge[];
  //const objRegistro = dataSolicitudes[0] as mongoDBListSolicitud;
  //*********  TABLE ***************c****//
  dataSolicitudes.map((objRegistro) => {
      console.log("xx",objRegistro.node.nombre);
  });

  return (
    <div className="flexCenter  p-2 m-2 text-3xl">
      <br />
      <h1>Gestionar Solicitudes</h1>
      <br />
    </div>
  );
};

export default Solicitudes;
