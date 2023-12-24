import { User, Session } from 'next-auth'

interface Node {
    id?: string,
    dni?: string,
    nombre?: string,
    apellidos?: string,
    correoElectronico?: string,
    facebookUrl?: string,
    ModeloHyundai?: string,
    AnoFab?: string,
    Placa?: string,
    estadoAtendido?: boolean | false,
}

export interface Edge {
    node: Node; // 'node' field within each 'Edge' object
}

interface SolicitudCollection {
    edges: Edge[]; // Array of Edge objects
}

interface MongoDB {
    solicitudCollection: SolicitudCollection;
}

export interface GraphQLResponseTypes {
    mongoDB: MongoDB;
}
export interface mongoDB{
    solicitudCollection?: solicitudCollection
    solicitudCreate? : solicitudCreate
    userCollection? : userCollection
}
export interface solicitudCollection{
    edges?: []
}
export interface userCollection{
    edges?: []
}
export interface  solicitudCreate{
    insertedId?: string
}
export interface UserProfile {
    id: string;
    name: string;
    rol:string;
    ModeloHyundai:string;
    Placa:string;
    misViajes:string;
    misRecorridosKM:string;
    email: string;
    description: string | null;
    avatarUrl: string;
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    rol:string;
    ModeloHyundai:string;
    Placa:string;
  };
}


export interface Solicitudes {
  id: string;
  dni: string;
  nombre:string;
  apellidos:string;
  correoElectronico:string;
  celular: string;
  fechaNacimiento: string;
  facebookUrl: string;
  Provincia:string;
  Distrito: string;
  ModeloHyundai: string;
  AnoFab: string;
  Placa:string;
  VehiculoPropio: string;
  NombrePropietarios: string;
  ParentescoPropetario: string;
  MantenimientoConcesionarios:string;
  estadoAtendido: boolean;
  fechaRegistro: Date;
}

