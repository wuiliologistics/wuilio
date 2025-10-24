export interface OrderDetail {
  id: string
  estado: "En Progreso" | "Completado" | "Pendiente" | "Programado"
  progreso: number

  // Condiciones Generales
  shipper: string
  consignee: string
  notify: string
  incoterms: string
  terminosFlete: string
  origen: string
  destino: string

  // Productos
  productos: ProductoDetalle[]

  // Logística Internacional
  transporte: string
  freightForwarder: string
  lineaNaviera: string
  naveViaje: string
  tipoBL: string
  contenedorTipo: string
  hazImoReefer: string
  emptyPickup: string
  shippingInstructions: string
  verifiedGrossMass: string
  dryCY: string
  reeferCY: string
  correccionBL: string

  // Logística Origen
  tipoEmbarque: string
  planta: string
  agenciaAduanas: string
  operadorTransporte: string
  depositoVacios: string
  depositoTemporal: string
}

export interface ProductoDetalle {
  id: string
  nombre: string
  hsCode: string
  presentacion: string
  empaque: string
  pesoNeto: string
  pesoBruto: string
  volumen: string
  valorFOB: string
  certificado: string
}
