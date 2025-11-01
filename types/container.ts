export type Incoterm = "EXW" | "FCA" | "FOB" | "CFR" | "CIF" | "DAP" | "DDP"

export type MilestoneType =
  | "deposito_vacios_origen"
  | "planta_origen"
  | "deposito_extraportuario_origen"
  | "puerto_origen"
  | "nave_1"
  | "puerto_transbordo"
  | "nave_2"
  | "puerto_destino"
  | "deposito_extraportuario_destino"
  | "planta_destino"
  | "deposito_vacios_destino"

export type MilestoneStatus = "completado" | "en_progreso" | "estimado" | "pendiente"

export interface TrackingMilestone {
  id: string
  type: MilestoneType
  titulo: string
  ubicacion: string
  codigoPuerto?: string
  detalles?: string
  fecha?: string
  status: MilestoneStatus
  coordenadas: { lat: number; lng: number }
}

export interface Container {
  id: string
  numero: string
  iso: string
  tara: string
  precintos: string[]
  estadoActual: string
  milestones: TrackingMilestone[]
}

// Milestone ranges for each Incoterm
export const incotermMilestoneRanges: Record<Incoterm, MilestoneType[]> = {
  EXW: ["planta_origen"],
  FCA: ["deposito_vacios_origen", "planta_origen", "deposito_extraportuario_origen", "puerto_origen"],
  FOB: ["deposito_vacios_origen", "planta_origen", "deposito_extraportuario_origen", "puerto_origen", "nave_1"],
  CFR: [
    "deposito_vacios_origen",
    "planta_origen",
    "deposito_extraportuario_origen",
    "puerto_origen",
    "nave_1",
    "puerto_transbordo",
    "nave_2",
    "puerto_destino",
  ],
  CIF: [
    "deposito_vacios_origen",
    "planta_origen",
    "deposito_extraportuario_origen",
    "puerto_origen",
    "nave_1",
    "puerto_transbordo",
    "nave_2",
    "puerto_destino",
  ],
  DAP: [
    "deposito_vacios_origen",
    "planta_origen",
    "deposito_extraportuario_origen",
    "puerto_origen",
    "nave_1",
    "puerto_transbordo",
    "nave_2",
    "puerto_destino",
    "deposito_extraportuario_destino",
    "planta_destino",
  ],
  DDP: [
    "deposito_vacios_origen",
    "planta_origen",
    "deposito_extraportuario_origen",
    "puerto_origen",
    "nave_1",
    "puerto_transbordo",
    "nave_2",
    "puerto_destino",
    "deposito_extraportuario_destino",
    "planta_destino",
    "deposito_vacios_destino",
  ],
}
