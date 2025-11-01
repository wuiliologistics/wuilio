export interface Order {
  id: string
  estado: "Borrador" | "Pendiente" | "Programado" | "En progreso" | "Completado" | "Cancelado"
  etd: string
  cliente: string
  proforma: string
  destino: string
  booking: string
  tipo: "Marítimo" | "Aéreo" | "Terrestre"
  motivoCancelacion?: string
}
