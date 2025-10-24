export type UserStatus = "pending" | "approved" | "rejected"

export interface SignupUserData {
  nombreCompleto: string
  documento: string
  nacionalidad: string
  contacto: string
  cargo: string
  correo: string
  password: string
}

export interface SignupEmpresaData {
  empresa: string
  ruc: string
  pais: string
  tipoEmpresa: string[]
  ciudad: string
  direccion: string
  telefono: string
}

export interface SignupRepresentanteData {
  nombre: string
  documento: string
  paisNacimiento: string
  celular: string
  correo: string
}

export interface SignupDocumentos {
  fichaRuc?: File
  vigenciaPoder?: File
  documentoIdentidad?: File
}

export interface SignupFormData {
  usuario: SignupUserData
  empresa: SignupEmpresaData
  representante: SignupRepresentanteData
  documentos: SignupDocumentos
}

export interface UserAccount {
  id: string
  status: UserStatus
  rejectionReason?: string
  createdAt: Date
  approvedAt?: Date
  userData: SignupUserData
  empresaData: SignupEmpresaData
  representanteData: SignupRepresentanteData
}
