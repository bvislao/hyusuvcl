import { User, Session } from 'next-auth'


export interface UserProfile {
    id: string;
    name: string;
    rol:string;
    ModeloHyundai:string;
    Placa:string;
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
  id: string | "";
  dni: string| "";
  nombre:string| "";
  apellidos:string| "";
  correoElectronico:string| "";
  celular: string| "";
  fechaNacimiento: string| "";
  facebookUrl: string| "";
  Provincia:string| "";
  Distrito: string| "";
  ModeloHyundai: string| "";
  AnoFab: string| "";
  Placa:string| "";
  VehiculoPropio: boolean  | false;
  NombrePropietarios: string| "";
  ParentescoPropetario: string| "";
  MantenimientoConcesionarios:boolean | false;
  estadoAtendido: boolean | false;
  fechaRegistro: Date | null;
}

