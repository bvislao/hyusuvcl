import { g, auth,connector, config } from '@grafbase/sdk'

const mongodb = connector.MongoDB('MongoDB', {
  url: "https://data.mongodb-api.com/app/data-eqvxd/endpoint/data/v1", //g.env("MONGO_ATLAS_URL"),
  apiKey: "y1ugmP0VbJ2B696d7jZg8MCSONqyV8Awu6VYnJbAI1KVsYCOTZdOn36flS1f2eqn",//g.env("MONGO_API_KEY"),
  dataSource: "Cluster0",//g.env("MONGO_DATASOURCE"),
  database: "clubhyundaisuv",//g.env("MONGO_DATABASE")
})

/*** MONGO DB - Solicitud */
mongodb.model('Solicitud',{
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
}).collection('solicitudes').auth((rules) => {
  rules.public().read().create().update()
  rules.private().create().delete().update()
});

/*** MONGO DB - User */
mongodb.model('User', {
  name: g.string().length({min:2,max:100}),
  email:g.string().unique(),
  rol:g.string().default("EXTERNO"),
  misViajes:g.int().default(0),
  misRecorridosKM:g.int().default(0),
  ModeloHyundai:g.string().optional(),
  Placa:g.string().optional(),
  avatarUrl: g.url().default("https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/6f0dbf3e-2116-4750-ba5a-004d7ca279e3/9ae25e54-167c-47c8-aa82-e024cd6fcaf4.png"),
  description:g.string().optional(),
}).collection('users').auth((rules) => {
  rules.public().read()
});

/*** MONGO DB - Rol */
mongodb.model('Rol', {
  name: g.string().length({min:2,max:100}),
  estado:g.int().default(1)
}).auth((rules) => {
  rules.public().read().create().update()
});

/*** MONGO DB - Sponsors */
mongodb.model('Sponsor', {
    name: g.string().length({min:2,max:100}),
    logoUrl: g.url().default("https://sportwagen-peru.com/wp-content/uploads/2021/04/logotipo-sportwagen-hyundai.png"),
    description:g.string().optional(),
    beneficio:g.string().optional(),
    estado:g.int().default(1)
}).auth((rules) => {
    rules.public().read().create().update()
});


/*** MONGO DB - Convenio */
mongodb.model('Convenio', {
    name: g.string().length({min:2,max:100}),
    logoUrl: g.url().default("https://sportwagen-peru.com/wp-content/uploads/2021/04/logotipo-sportwagen-hyundai.png"),
    description:g.string().optional(),
    contacto:g.string().optional()
})

/*** MONGO DB - Viajes */
mongodb.model('Viaje', {
    title:g.string(),
    description:g.string(),
    maxInscripciones:g.int(),
    inscripcionesActuales:g.int(),
    Fecha:g.string(),
    Ruta:g.string(),
    TiempoDeViaje:g.string(),
    RecorridoKM:g.string(),
    BrochureURL:g.string(),
}).auth((rules) => {
    rules.public().read().create().update()
});

/*** MONGO DB - ViajesItinerario */
mongodb.model('ViajeItinerario', {
  title: g.string(),
  description: g.string(),
  horas: g.string(),
  kilometraje: g.string(),
  mapURLGoogle: g.string(),
  viajeId: g.string(),
  order:g.int()
}).auth((rules) => {
    rules.public().read().create().update()
});


/*** MONGO DB - ViajesUsuario */
mongodb.model('ViajeUsuario', {
    viajeId: g.string(),
    userId: g.string(),
    estado:g.int().default(1)
}).auth((rules) => {
    rules.public().read().create().update()
});

/*
const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})
*/
g.datasource(mongodb)

export default config({
  schema: g,
  cache: {
    rules: [
      {
        types: 'Query',
        maxAge: 60
      }
    ]
  }
  /*,auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },*/
})