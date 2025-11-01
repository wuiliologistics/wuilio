export interface Notify {
  id: string
  empresaNotify: string
  pais: string
  ruc: string
  direccion: string
  ciudad: string
  region?: string // Added region field to match cliente structure
  zipCode: string
  contacto: string
  telefono: string
  email: string
}

export interface Cliente {
  id: string
  pais: string
  ruc: string
  eori?: string
  empresa: string
  direccionCalle: string
  direccionNumero: string
  ciudad: string
  region?: string
  zipCode: string
  contacto: string
  telefono: string
  email: string
  emailsAdicionales?: string[]
  estado: "Activo" | "Inactivo"
  notifies: Notify[]
  condicionesPagoComercial?: string
}
