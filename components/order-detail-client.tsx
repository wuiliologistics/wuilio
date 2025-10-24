"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Ship, FileText, Package, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { OrderDetail } from "@/types/order-detail"
import { useState } from "react"

const statusColors = {
  "En Progreso": "bg-green-100 text-green-700 hover:bg-green-100",
  Completado: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Pendiente: "bg-red-100 text-red-700 hover:bg-red-100",
  Programado: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
}

interface OrderDetailClientProps {
  order: OrderDetail
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("informacion")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">{order.id}</h1>
        <Badge variant="secondary" className={cn(statusColors[order.estado])}>
          {order.estado}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="informacion">Información</TabsTrigger>
          <TabsTrigger value="trazabilidad">Trazabilidad</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion" className="mt-0 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Progreso del envío */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Ship className="h-5 w-5" />
                    Progreso del envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-semibold text-blue-600">{order.progreso}%</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={order.progreso} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Condiciones Generales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-5 w-5" />
                    Condiciones Generales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Shipper</p>
                      <p className="font-medium text-blue-600">{order.shipper}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Consignee</p>
                      <p className="font-medium text-blue-600">{order.consignee}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Notify</p>
                      <p className="font-medium text-blue-600">{order.notify}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Incoterms® 2020</p>
                      <p className="font-medium text-green-600">{order.incoterms}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Términos de Flete</p>
                      <p className="font-medium">{order.terminosFlete}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Origen</p>
                      <p className="font-medium text-green-600">{order.origen}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Destino</p>
                      <p className="font-medium text-green-600">{order.destino}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Productos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Package className="h-5 w-5" />
                    Productos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {order.productos.map((producto) => (
                    <Collapsible key={producto.id}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-background p-4 hover:bg-accent">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{producto.nombre}</span>
                          <span className="text-sm text-muted-foreground">({producto.hsCode})</span>
                          <Badge variant="outline" className="text-blue-600">
                            {producto.empaque.split("/")[0].trim()}
                          </Badge>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform ui-expanded:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 rounded-lg border bg-background p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Certificado/Inspección</p>
                            <p className="font-medium">{producto.certificado}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Presentación</p>
                            <p className="font-medium text-blue-600">{producto.presentacion}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Empaque</p>
                            <p className="font-medium text-blue-600">{producto.empaque}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Pesos Net/Brut (Kg)</p>
                            <p className="font-medium">
                              {producto.pesoNeto} / {producto.pesoBruto}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Volumen</p>
                            <p className="font-medium">{producto.volumen}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Valor FOB (USD)</p>
                            <p className="font-medium">{producto.valorFOB}</p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Logística Internacional */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Ship className="h-5 w-5" />
                    Logística Internacional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Transporte</p>
                    <p className="font-medium">{order.transporte}</p>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Freight Forwarder</p>
                    <p className="font-medium text-blue-600">{order.freightForwarder}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Línea Naviera</p>
                    <p className="font-medium text-blue-600">{order.lineaNaviera}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Nave y Viaje</p>
                    <p className="font-medium">{order.naveViaje}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de BL</p>
                    <p className="font-medium text-green-600">{order.tipoBL}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Contenedores y Tipo</p>
                    <p className="font-medium">{order.contenedorTipo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">HAZ/IMO/REEFER</p>
                    <p className="font-medium text-green-600">{order.hazImoReefer}</p>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Empty Pickup</p>
                      <p className="text-sm font-medium">{order.emptyPickup}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Shipping Instructions (SI)</p>
                      <p className="text-sm font-medium">{order.shippingInstructions}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Verified Gross Mass (VGM)</p>
                      <p className="text-sm font-medium">{order.verifiedGrossMass}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Dry CY</p>
                      <p className="text-sm font-medium">{order.dryCY}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Reefer CY</p>
                      <p className="text-sm font-medium">{order.reeferCY}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Corrección BL</p>
                      <p className="text-sm font-medium">{order.correccionBL}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logística Origen */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Package className="h-5 w-5" />
                    Logística Origen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de Embarque</p>
                    <p className="font-medium text-blue-600">{order.tipoEmbarque}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Planta</p>
                    <p className="font-medium">{order.planta}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Agencia de Aduanas</p>
                    <p className="font-medium text-blue-600">{order.agenciaAduanas}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Operador / Transporte</p>
                    <p className="font-medium text-blue-600">{order.operadorTransporte}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Depósito de Vacíos</p>
                    <p className="font-medium text-blue-600">{order.depositoVacios}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Depósito Temporal</p>
                    <p className="font-medium text-blue-600">{order.depositoTemporal}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trazabilidad" className="mt-0">
          <Card>
            <CardContent className="flex h-[400px] items-center justify-center">
              <p className="text-muted-foreground">Contenido de Trazabilidad próximamente</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos" className="mt-0">
          <Card>
            <CardContent className="flex h-[400px] items-center justify-center">
              <p className="text-muted-foreground">Contenido de Documentos próximamente</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="mt-0">
          <Card>
            <CardContent className="flex h-[400px] items-center justify-center">
              <p className="text-muted-foreground">Contenido de Historial próximamente</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagos" className="mt-0">
          <Card>
            <CardContent className="flex h-[400px] items-center justify-center">
              <p className="text-muted-foreground">Contenido de Pagos próximamente</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
