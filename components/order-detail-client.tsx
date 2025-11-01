"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Package, Ship, Container, ChevronDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type { OrderDetail } from "@/types/order-detail"
import { useState } from "react"
import TrazabilidadTab from "./trazabilidad-tab"

const statusColors = {
  "En Progreso": "bg-green-100 text-green-700 hover:bg-green-100",
  Completado: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Creado: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Programado: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
}

interface OrderDetailClientProps {
  order: OrderDetail
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("informacion")
  const [openSections, setOpenSections] = useState({
    datosBase: true,
    productos: true,
    logisticaInternacional: true,
    logisticaOrigen: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">{order.id}</h1>
        <Badge variant="secondary" className={cn(statusColors[order.estado])}>
          {order.estado}
        </Badge>
      </div>

      {/* Tabs with Export Button */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-6">
        <div className="flex items-center justify-between gap-4">
          <TabsList className="grid w-full max-w-2xl grid-cols-5 gap-0">
            <TabsTrigger value="informacion">Información</TabsTrigger>
            <TabsTrigger value="trazabilidad">Trazabilidad</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
            <TabsTrigger value="pagos">Pagos</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>

        {/* Información Tab - Document View */}
        <TabsContent value="informacion" className="mt-0">
          <div className="bg-white rounded-lg border">
            <div className="p-6 space-y-6">
              {/* Datos Base Section */}
              <Collapsible open={openSections.datosBase} onOpenChange={() => toggleSection("datosBase")}>
                <div className="space-y-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b hover:opacity-70 transition-opacity">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-black" />
                      <h2 className="text-base font-semibold">Datos Base</h2>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-black transition-transform duration-200",
                        openSections.datosBase && "rotate-180",
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Proforma</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.proforma}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Shipper</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.shipper}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Consignee</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.consignee}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Notify</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.notify}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Origen</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.origen}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Destino</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.destino}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Tipo de Envío</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.transporte}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Incoterms® 2020</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.incoterms}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Condiciones de Pago Comercial</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.condicionesPago || "N/A"}
                        </p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Condición Flete</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.terminosFlete}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Régimen Aduanero Principal</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.regimenAduanero || "Exportación Definitiva"}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Tratamiento Especial</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.tratamientoEspecial || "Ninguno"}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* Productos Section */}
              <Collapsible open={openSections.productos} onOpenChange={() => toggleSection("productos")}>
                <div className="space-y-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b hover:opacity-70 transition-opacity">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-black" />
                      <h2 className="text-base font-semibold">Productos</h2>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-black transition-transform duration-200",
                        openSections.productos && "rotate-180",
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="space-y-4">
                      {order.productos.map((producto, index) => (
                        <div key={producto.id} className="space-y-4 p-4 rounded-lg border bg-gray-50/50">
                          <h3 className="font-semibold text-sm">Producto {index + 1}</h3>

                          <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Código + Descripción Comercial</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.nombre}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Partida Arancelaria</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.hsCode}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Unidad Comercial</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.presentacion}
                              </p>
                            </div>

                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">País de Origen</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.paisOrigen || "Perú"}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Precio FOB Unitario (USD)</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.precioUnitario || "N/A"}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Dimensiones de Unidad Comercial (cm³)</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.dimensiones || "N/A"}
                              </p>
                            </div>

                            <div className="col-span-3 border-t pt-4" />

                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Unidades Comerciales Totales</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.cantidad || "N/A"}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Descuento</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.descuento || "0"}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Certificados Requeridos</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.certificado}
                              </p>
                            </div>

                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Precio FOB Total (USD)</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.valorFOB}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Empaques Secundarios Totales (Bultos)</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.empaque}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Unidades Físicas Totales</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.unidadesFisicas || "N/A"}
                              </p>
                            </div>

                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Peso Neto Total (Kg)</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.pesoNeto}
                              </p>
                            </div>
                            <div className="space-y-0">
                              <p className="text-sm text-muted-foreground">Peso Bruto Total (Kg)</p>
                              <p className="font-light leading-5 text-foreground text-sm uppercase">
                                {producto.pesoBruto}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* Logística Internacional Section */}
              <Collapsible
                open={openSections.logisticaInternacional}
                onOpenChange={() => toggleSection("logisticaInternacional")}
              >
                <div className="space-y-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b hover:opacity-70 transition-opacity">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-black" />
                      <h2 className="text-base font-semibold">Logística Internacional</h2>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-black transition-transform duration-200",
                        openSections.logisticaInternacional && "rotate-180",
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Tipo de Carga</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.tipoCarga || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Tipo de BL</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.tipoBL}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Agente de Carga</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.agenteCarga || "N/A"}
                        </p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Naviera</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.lineaNaviera}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">N° de Booking</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.numeroBooking || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">N° de Viaje / Buque</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.naveViaje}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Tipo de Contenedores</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.tipoContenedor || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Cantidad de Contenedores</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.contenedorTipo}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Depósito de Retiro</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.depositoRetiro || "N/A"}
                        </p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Puerto de Origen</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.puertoOrigen || order.origen}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Puerto de Destino</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.puertoDestino || order.destino}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Fecha Estimada de Embarque (ETD)</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.etd}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Freight Forwarder</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.freightForwarder}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">HAZ/IMO/REEFER</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.hazImoReefer}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Empty Pickup</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.emptyPickup}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Shipping Instructions (SI)</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.shippingInstructions}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Verified Gross Mass (VGM)</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.verifiedGrossMass}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Dry CY</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.dryCY}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Reefer CY</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.reeferCY}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Corrección BL</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.correccionBL}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* Logística en Origen Section */}
              <Collapsible open={openSections.logisticaOrigen} onOpenChange={() => toggleSection("logisticaOrigen")}>
                <div className="space-y-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b hover:opacity-70 transition-opacity">
                    <div className="flex items-center gap-2">
                      <Container className="h-4 w-4 text-black" />
                      <h2 className="text-base font-semibold">Logística en Origen</h2>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-black transition-transform duration-200",
                        openSections.logisticaOrigen && "rotate-180",
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Operador Logístico</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.operadorTransporte}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Agencia de Aduana</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.agenciaAduanas}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Planta</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.planta}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Modalidad de despacho</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.modalidadDespacho || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Terminal de Ingreso (Puerto o DT)</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.terminalIngreso || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Tipo de Embarque</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.tipoEmbarque}</p>
                      </div>

                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Depósito de Vacíos</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">{order.depositoVacios}</p>
                      </div>
                      <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Depósito Temporal</p>
                        <p className="font-light leading-5 text-foreground text-sm uppercase">
                          {order.depositoTemporal}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs */}
        <TabsContent value="trazabilidad" className="mt-0">
          <TrazabilidadTab contenedores={order.contenedores || []} incoterm={order.incoterms} />
        </TabsContent>

        <TabsContent value="documentos" className="mt-0">
          <div className="bg-white rounded-lg border p-8">
            <p className="text-center text-muted-foreground">Contenido de Documentos próximamente</p>
          </div>
        </TabsContent>

        <TabsContent value="historial" className="mt-0">
          <div className="bg-white rounded-lg border p-8">
            <p className="text-center text-muted-foreground">Contenido de Historial próximamente</p>
          </div>
        </TabsContent>

        <TabsContent value="pagos" className="mt-0">
          <div className="bg-white rounded-lg border p-8">
            <p className="text-center text-muted-foreground">Contenido de Pagos próximamente</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
