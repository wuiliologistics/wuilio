export interface Order {
  id: string
  estado: "Programado" | "Pendiente" | "Completado"
  etd: string
  cliente: string
  proforma: string
  destino: string
  booking: string
  tipo: "Marítimo" | "Aéreo" | "Terrestre"
}
