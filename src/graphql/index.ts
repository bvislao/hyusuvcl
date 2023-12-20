export const getUserQuery = `
query MongoDB($email: String!) {
  mongoDB {
    userCollection(
      filter: { email: { eq: $email } }
      first: 10
    ) {
      edges {
        node {
          id
          name
          email
          rol
          misViajes
          misRecorridosKM
          ModeloHyundai
          Placa
          avatarUrl
          description
        }
      }
    }
  }
}

`;


/*
{
	"email": "bvislao95@gmail.com",
	"name": "Bryan VC",
	"rol": "ADMIN",
	"ModeloHyundai": "HYUNDAI SANTA FE",
	"Placa": "V4F-273"
}

*/
export const updateUserMutation = `
`;

export const createUserMutation = `
mutation MongoDB($name:String!,$email:String!,
$rol:String!,$ModeloHyundai:String!,$Placa:String!){
  mongoDB {
    userCreate(input: {
        name:$name,
        email:$email ,rol:$rol
    }) {
      insertedId
    }
  }
}
`;


/*
{
	"dni": "72854591"
}
*/
export const atenderSolicitudOK = `
mutation MongoDB($dni:String!) {
  mongoDB {
    solicitudUpdate(by: {
      dni:$dni
    }, input: {
      estadoAtendido:{
        set:true
      }
    }) {
      matchedCount
      modifiedCount
    }
  }
}
`

/*
{
	"dni": "728545495551",
	"correoElectronico": "bvislao95@gmail.com",
	"nombre": "bryan",
	"apellidos": "vislao",
	"celular": "930712645",
	"fechaNacimiento": "2023-10-01",
	"facebookUrl": "fff",
	"Provincia": "LIMA",
	"Distrito": "LIMA",
	"ModeloHyundai": "HYUNDAI SANTA FE",
	"AnoFab": "2013",
	"Placa": "V4F453",
	"VehiculoPropio": true,
	"NombrePropietarios": "BRYAN VISLAO CHAVEZ",
	"ParentescoPropetario": "BRYAN VISLAO CHAVEZ",
	"MantenimientoConcesionarios": false
}
*/
export const createSolicitudes = `
mutation MongoDB(
  $dni: String!
  $nombre: String!
  $correoElectronico: String!
  $apellidos: String!
  $celular: String!
  $fechaNacimiento: Date!
  $facebookUrl: String!
  $Provincia: String!
  $Distrito: String!
  $ModeloHyundai: String!
  $AnoFab: String!
  $Placa: String!
  $VehiculoPropio: Boolean!
  $NombrePropietarios: String!
  $ParentescoPropetario: String!
  $MantenimientoConcesionarios: Boolean!
) {
  mongoDB {
    solicitudCreate(
      input: {
        dni: $dni
        nombre: $nombre
        correoElectronico: $correoElectronico
        apellidos: $apellidos
        celular: $celular
        fechaNacimiento: $fechaNacimiento
        facebookUrl: $facebookUrl
        Provincia: $Provincia
        Distrito: $Distrito
        ModeloHyundai: $ModeloHyundai
        AnoFab: $AnoFab
        Placa: $Placa
        VehiculoPropio: $VehiculoPropio
        NombrePropietarios: $NombrePropietarios
        ParentescoPropetario: $ParentescoPropetario
        MantenimientoConcesionarios: $MantenimientoConcesionarios
      }
    ) {
      insertedId
    }
  }
}

`
