import { g, auth,connector, config } from '@grafbase/sdk'

const mongodb = connector.MongoDB('MongoDB', {
  url: g.env("MONGO_ATLAS_URL"),
  apiKey: g.env("MONGO_API_KEY"),
  dataSource: g.env("MONGO_DATASOURCE"),
  database: g.env("MONGO_DATABASE")
})


const Solicitud = g.model('Solicitud',{
  dni:g.string().length({min:2,max:100}).unique(),
  nombre:g.string(),
  correoElectronico:g.string().unique(),
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
}).auth((rules) => {
  rules.public().read().create().update()
  rules.private().create().delete().update()
});


/*
// @ts-ignore
const SolicitudesIngreso = g.model('Solicitudes',{
  dni:g.string().length({min:2,max:100}).unique(),
  nombre:g.string(),
  correoElectronico:g.string().unique(),
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
}).auth((rules) => {
  rules.public().read().create().update()
  rules.private().create().delete().update()
});
*/
// @ts-ignore
const User = g.model('User', {
  name: g.string().length({min:2,max:100}),
  email:g.string().unique(),
  rol:g.string().default("EXTERNO"),
  ModeloHyundai:g.string().optional(),
  Placa:g.string().optional(),
  avatarUrl: g.url().default("https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/6f0dbf3e-2116-4750-ba5a-004d7ca279e3/9ae25e54-167c-47c8-aa82-e024cd6fcaf4.png"),
  description:g.string().optional(),
}).auth((rules) => {
  rules.public().read()
});


// @ts-ignore
const Rol = g.model('Rol', {
  name: g.string().length({min:2,max:100}),
  estado:g.int().default(1)
}).auth((rules) => {
  rules.public().read().create().update()
});
 
// @ts-ignore
const Viajes = g.model('Viajes', {
  title:g.string(),
  maxInscripciones:g.int(),
  inscripcionesActuales:g.int(),
  inscripciones: g.relation(() => User).list().optional(),
}).auth((rules) => {
  rules.public().read().create().update()
})





/*
//@ts-ignore
const Viajes = g.model('Viajes',{
  title:g.string().search(),
  maxInscripciones:g.int(),
  inscripcionesActuales:g.int(),
  participantes: g.relation(()=> Participantes).optional().list().optional()
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
});

// @ts-ignore
const Participantes = g.model('Participantes',{
  title:g.string(),
  Viajes:g.relation(Viajes).optional()
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
});

*/
const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})

g.datasource(mongodb)

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },
})