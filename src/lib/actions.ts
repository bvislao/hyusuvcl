import {
    createSolicitudes,
    createUserMutation,
    getUserQuery,
    searchSolicitudExistenteDNI, searchSolicitudExistenteEmail, searchSolicitudExistentePlaca
} from "@/graphql";
import {GraphQLClient} from "graphql-request";
import {mongoDB, Solicitudes} from "../../common.types";
// @ts-ignore
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';
const rolInterno = 'INTERNO';

const client = new GraphQLClient(apiUrl);



const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        client.setHeader("x-api-key", apiKey);
        return await client.request(query, variables);
    } catch (err) {
        throw err;
    }
};


export const getUser = async (email: string) => {
    const userExists = await makeGraphQLRequest(getUserQuery, {email : email.trim()});
    // @ts-ignore
    if(userExists?.mongoDB?.userCollection.edges.length > 0){
        // @ts-ignore
        return userExists?.mongoDB?.userCollection.edges[0].node;
    }else
    {
        return null;
    }
}

export const createUser = (name: string, email: string) => {
    const variables = {
        name: name,
        email: email,
        rol: rolInterno
    };
    return makeGraphQLRequest(createUserMutation, variables);
};


export const validarSolicitudRegister = async (solicitud: Solicitudes) => {
    var Reg: number = 0;
    try {
        const consultOne = await makeGraphQLRequest(searchSolicitudExistenteDNI, {"dni": solicitud.dni.trim()}) as mongoDB;
        const consultTwo = await makeGraphQLRequest(searchSolicitudExistentePlaca, {"placa": solicitud.Placa.trim()}) as mongoDB;
        const consultThreww = await makeGraphQLRequest(searchSolicitudExistenteEmail, {"correoElectronico": solicitud.correoElectronico.trim()}) as mongoDB;

        // @ts-ignore
        if(consultOne?.solicitudCollection?.edges?.length > 0){
            Reg++;
        }
        // @ts-ignore
        if(consultTwo?.solicitudCollection?.edges?.length > 0){
            Reg++;
        }
        // @ts-ignore
        if(consultThreww?.solicitudCollection?.edges?.length > 0){
            Reg++;
        }

        return Reg;
    } catch (err) {
        Reg = 99;
        return Reg;
    }

}
export const createSolicitudRegister = async (solicitud: Solicitudes) => {
    const variables = {
        "dni": solicitud.dni,
        "correoElectronico": solicitud.correoElectronico,
        "nombre": solicitud.nombre,
        "apellidos": solicitud.apellidos,
        "celular": solicitud.celular,
        "fechaNacimiento": solicitud.fechaNacimiento,
        "facebookUrl": solicitud.facebookUrl,
        "Provincia": solicitud.Provincia,
        "Distrito": solicitud.Distrito,
        "ModeloHyundai": solicitud.ModeloHyundai,
        "AnoFab": solicitud.AnoFab,
        "Placa": solicitud.Placa,
        "VehiculoPropio": solicitud.VehiculoPropio.toString() === "SI" ? true : false,
        "NombrePropietarios": solicitud.NombrePropietarios,
        "ParentescoPropetario": solicitud.ParentescoPropetario,
        "MantenimientoConcesionarios": solicitud.MantenimientoConcesionarios.toString() === "SI" ? true : false
    };
    try {
        const registerSolicitud = await makeGraphQLRequest(createSolicitudes, variables) as mongoDB;

        if(registerSolicitud.solicitudCreate?.insertedId) return registerSolicitud.solicitudCreate?.insertedId; else return null;


        /*.then(value => {
            return value?.mongoDB?.solicitudCreate?.insertedId;
        });*/
    } catch (err) {
        return null;
    }


}
