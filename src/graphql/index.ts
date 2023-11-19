export const getUserQuery = `
query User($email:String!) {
  user(by: {email:$email}) {
    name
    email
    rol
    ModeloHyundai
    Placa
    avatarUrl
    description
    id
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
mutation UpdateUser($name:String!,
	$email:String!,
	$rol:String!,
	$ModeloHyundai:String!,
	$Placa:String!,
){
	userUpdate(by: {	email:$email,} ,input : {
		name:$name,	
		rol:$rol,
		ModeloHyundai:$ModeloHyundai
		Placa:$Placa
	}){
		user{
			name
    email
    rol
    ModeloHyundai
    Placa
    avatarUrl
    description
    id
    updatedAt
    createdAt
		}
	}
}
`;

export const createUserMutation = `
mutation UserCreate($name:String!,$email:String!) {
  userCreate(input: {
    email:$email,
    name:$name
  }) {
    user {
      name
      email
      rol
      ModeloHyundai
      Placa
      avatarUrl
      description
    }
  }
`;


//***SOLICITUDES***/
/*
{
	"dni": "72854591"
}
*/
export const atenderSolicitudOK = `
mutation SolicitudUpdate (
  $dni:String!
){
  solicitudUpdate(by: {dni:$dni}, input: {
    estadoAtendido:true
  }) {
    solicitud {
      dni
      estadoAtendido
      nombre
      correoElectronico
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
mutation SolicitudCreate(
  $dni:String!,$nombre:String!,$correoElectronico:String!,$apellidos:String!,
			$celular:String!,
$fechaNacimiento:Date!,
$facebookUrl:String!,
$Provincia:String!,
$Distrito:String!,
$ModeloHyundai:String!,
$AnoFab:String!,
$Placa:String!,
$VehiculoPropio:Boolean!,
$NombrePropietarios:String!,
$ParentescoPropetario:String!,
$MantenimientoConcesionarios:Boolean!
) {
  solicitudCreate(input: {
dni : $dni,
nombre : $nombre, 
correoElectronico :$correoElectronico,
apellidos : $apellidos,
celular : $celular,
fechaNacimiento : $fechaNacimiento,
facebookUrl :$facebookUrl,
Provincia :$Provincia,
Distrito :$Distrito,
ModeloHyundai :$ModeloHyundai,
AnoFab :$AnoFab,
Placa :$Placa,
VehiculoPropio :$VehiculoPropio,
NombrePropietarios :$NombrePropietarios,
ParentescoPropetario :$ParentescoPropetario,
MantenimientoConcesionarios :$MantenimientoConcesionarios
  }) {
    solicitud {
      dni
      nombre
      correoElectronico
      apellidos
      celular
      fechaRegistro
      fechaNacimiento
      facebookUrl
      Provincia
      Distrito
      ModeloHyundai
      AnoFab
      Placa
      VehiculoPropio
      NombrePropietarios
      ParentescoPropetario
      MantenimientoConcesionarios
    }
  }
}
`
/*
{
	"name": "fffff",
	"email": "fdasfda@gmail.com",
	"rol": "MIEMBRO",
	"ModeloHyundai": "Hyundai CRETA",
	"Placa": "xds333"
}
*/
export const createUserSolicitud = `
mutation UserCreateHyundai($name:String!,$email:String!,
  $rol:String!,$ModeloHyundai:String!,$Placa:String!) {
    userCreate(input: {
      email:$email,
      name:$name
      ,rol:$rol
      ,ModeloHyundai:$ModeloHyundai
      ,Placa:$Placa
    }) {
      user {  
        name
        email
        rol
        ModeloHyundai
        Placa
        avatarUrl
        description
      }
    }
  }`