import type { OrderDetail } from "@/types/order-detail"

export const mockOrderDetail: OrderDetail = {
  id: "SLE-20250022",
  estado: "En Progreso",
  progreso: 50,

  // Condiciones Generales
  shipper: "GLOBAL BRIDGE TRADING S.A.C.",
  consignee: "CERAMICOS DEL SUR S.A.",
  notify: "CERAMICOS DEL SUR S.A.",
  incoterms: "FOB",
  terminosFlete: "Collect",
  origen: "Callao (PECLL), Perú",
  destino: "Dafeng (CNDFE), China",

  // Productos
  productos: [
    {
      id: "1",
      nombre: "Porcelain tiles",
      hsCode: "200.01029.10",
      presentacion: "60×60 (4 PIEZAS DE 1.44 M2)",
      empaque: "1900 Cajas / 22 Paletas",
      pesoNeto: "120,000",
      pesoBruto: "125,000",
      volumen: "No Aplica",
      valorFOB: "1,200,000.00",
      certificado: "Certificado de Origen",
    },
    {
      id: "2",
      nombre: "Porcelain tiles",
      hsCode: "200.01029.10",
      presentacion: "60×60 (4 PIEZAS DE 1.44 M2)",
      empaque: "1900 Cajas / 22 Paletas",
      pesoNeto: "120,000",
      pesoBruto: "125,000",
      volumen: "No Aplica",
      valorFOB: "1,200,000.00",
      certificado: "Certificado de Origen",
    },
    {
      id: "3",
      nombre: "Porcelain tiles",
      hsCode: "200.01029.10",
      presentacion: "60×60 (4 PIEZAS DE 1.44 M2)",
      empaque: "1900 Cajas / 22 Paletas",
      pesoNeto: "120,000",
      pesoBruto: "125,000",
      volumen: "No Aplica",
      valorFOB: "1,200,000.00",
      certificado: "Certificado de Origen",
    },
    {
      id: "4",
      nombre: "Porcelain tiles",
      hsCode: "200.01029.10",
      presentacion: "60×60 (4 PIEZAS DE 1.44 M2)",
      empaque: "1900 Cajas / 22 Paletas",
      pesoNeto: "120,000",
      pesoBruto: "125,000",
      volumen: "No Aplica",
      valorFOB: "1,200,000.00",
      certificado: "Certificado de Origen",
    },
  ],

  // Logística Internacional
  transporte: "Marítimo",
  freightForwarder: "DSV FREIGHT FORWARDING",
  lineaNaviera: "EVERGREEN SHIPPING LINES",
  naveViaje: "EVER LAWFUL EN1005",
  tipoBL: "Telex Release",
  contenedorTipo: "20 DV",
  hazImoReefer: "No Aplica",
  emptyPickup: "12/09/2025 07:00",
  shippingInstructions: "12/09/2025 07:00",
  verifiedGrossMass: "12/09/2025 07:00",
  dryCY: "12/09/2025 07:00",
  reeferCY: "12/09/2025 07:00",
  correccionBL: "12/09/2025 07:00",

  // Logística Origen
  tipoEmbarque: "Vía Depósito Temporal",
  planta: "CHILCA",
  agenciaAduanas: "AGENCIA TRANSOCEANIC SAC",
  operadorTransporte: "RANSA SAC",
  depositoVacios: "RANSA SAC",
  depositoTemporal: "DP WORLD LOGISTICS SRL",
}

export function getOrderDetail(id: string): OrderDetail | null {
  // For now, return the mock data for any id
  // In a real app, this would fetch from a database
  if (id === mockOrderDetail.id) {
    return mockOrderDetail
  }

  // Return mock data for any other id (for demo purposes)
  return {
    ...mockOrderDetail,
    id,
  }
}
