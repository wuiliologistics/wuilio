export interface Proveedor {
  id: string
  pais: string
  ruc: string
  empresa: string
  region?: string
  ciudad: string
  localidad?: string
  direccion: string
  codigoPostal: string
  contacto: string
  telefono: string
  email: string
  emailsAdicionales?: string[]
  tiposProveedor: string[] // Array of: "Agencia de Carga", "Agencia de Aduana", "Transporte", "Operador Logístico", "Almacén"
  nombreBanco?: string
  numeroCuenta?: string
  cci?: string
  estado: "Activo" | "Inactivo"
}
