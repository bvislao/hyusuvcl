import { createUserMutation,getUserQuery,createSolicitudes } from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { Solicitudes } from "../../common.types";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';


const client = new GraphQLClient(apiUrl);


const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
      client.setHeader("x-api-key",apiKey);
      return await client.request(query, variables);
    } catch (err) {
      throw err;
    }
  };


export const getUser = (email:string) => {
    return makeGraphQLRequest(getUserQuery,{email})
}

export const createUser = (name: string, email: string) => {
  const variables = {
      name: name,
      email: email
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const createSolicitudRegister = (solicitud: Solicitudes) => {
  console.log("solicitud",solicitud);
  const variables = {
    "dni": solicitud.dni,
	"correoElectronico": solicitud.correoElectronico,
	"nombre":solicitud.nombre ,
	"apellidos": solicitud.apellidos,
	"celular": solicitud.celular,
	"fechaNacimiento": solicitud.fechaNacimiento,
	"facebookUrl":solicitud.facebookUrl,
	"Provincia": solicitud.Provincia,
	"Distrito": solicitud.Distrito,
	"ModeloHyundai": solicitud.ModeloHyundai,
	"AnoFab":solicitud.AnoFab,
	"Placa": solicitud.Placa,
	"VehiculoPropio": solicitud.VehiculoPropio.toString() === "SI" ? true : false,
	"NombrePropietarios": solicitud.NombrePropietarios,
	"ParentescoPropetario": solicitud.ParentescoPropetario,
	"MantenimientoConcesionarios": solicitud.MantenimientoConcesionarios.toString() === "SI" ? true : false
};
  return makeGraphQLRequest(createSolicitudes, variables);
}
