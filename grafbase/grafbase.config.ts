import { g, auth, config } from '@grafbase/sdk'

// @ts-ignore
const SolicitudesIngreso = g.model('Solicitudes',{
  dni:g.string().length({min:2,max:100}),
  nombre:g.string(),
  correoElectronico:g.string(),
  apellidos:g.string(),
  celular:g.string(),
  fechaNacimiento:g.date(),
  facebookUrl:g.string(),
  Provincia:g.string(),
  Distrito:g.string(),
  ModeloHyundai:g.string(),
  AnoFab:g.string(),
  Placa:g.string().unique(),
  VehiculoPropio:g.boolean(),
  NombrePropietarios:g.string(),
  ParentescoPropetario:g.string(),
  MantenimientoConcesionarios:g.boolean(),
  estadoAtendido:g.boolean().default(false),
  fechaRegistro:g.datetime().default(new Date())
});

// @ts-ignore
const User = g.model('User', {
  name: g.string().length({min:2,max:100}),
  email:g.string().unique(),
  rol:g.string(),
  avatarUrl: g.url(),
  description:g.string().optional(),
});

//@ts-ignore
const Viajes = g.model('Viajes',{
  title:g.string().search(),
  maxInscripciones:g.int(),
  inscripcionesActuales:g.int(),
  participantes: g.relation(()=> Participantes).optional().list().optional()
});

// @ts-ignore
const Participantes = g.model('Participantes',{
  title:g.string(),
  Viajes:g.relation(Viajes).optional()
});




export default config({
  schema: g
})
