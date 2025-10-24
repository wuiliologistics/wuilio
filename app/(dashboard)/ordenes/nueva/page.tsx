"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Package, Anchor, FileCheck, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: string
  description: string
  fobTotal: string
  quantity: string
  packaging: string
  secondaryPackaging: string
  tariffCode: string
  commercialUnits: string
  netWeight: string
  grossWeight: string
}

export default function NuevaOrdenPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      description: "",
      fobTotal: "",
      quantity: "",
      packaging: "",
      secondaryPackaging: "",
      tariffCode: "",
      commercialUnits: "",
      netWeight: "",
      grossWeight: "",
    },
  ])

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        description: "",
        fobTotal: "",
        quantity: "",
        packaging: "",
        secondaryPackaging: "",
        tariffCode: "",
        commercialUnits: "",
        netWeight: "",
        grossWeight: "",
      },
    ])
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleSaveDraft = () => {
    // TODO: Implement save draft logic
    console.log("[v0] Saving draft...")
    router.push("/ordenes")
  }

  const handleCreateOrder = () => {
    // TODO: Implement create order logic with validation
    console.log("[v0] Creating order...")
    router.push("/ordenes")
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Datos Base Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-blue-600" />
            Datos Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="shipper">Shipper</Label>
              <Input id="shipper" className="w-full" defaultValue="WUILIO PERU S.A.C." disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consignee">Consignee</Label>
              <Select>
                <SelectTrigger id="consignee" className="w-full">
                  <SelectValue placeholder="Seleccionar consignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceramicos">CERAMICOS DEL SUR S.A.</SelectItem>
                  <SelectItem value="other">Otro consignee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notify">Notify</Label>
              <Select>
                <SelectTrigger id="notify" className="w-full">
                  <SelectValue placeholder="Seleccionar notify" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceramicos">CERAMICOS DEL SUR S.A.</SelectItem>
                  <SelectItem value="other">Otro notify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="incoterms">Incoterms® 2020</Label>
              <Select>
                <SelectTrigger id="incoterms" className="w-full">
                  <SelectValue placeholder="Seleccionar incoterm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fob">FOB</SelectItem>
                  <SelectItem value="cif">CIF</SelectItem>
                  <SelectItem value="exw">EXW</SelectItem>
                  <SelectItem value="fca">FCA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="freight-terms">Términos de Flete</Label>
              <Select>
                <SelectTrigger id="freight-terms" className="w-full">
                  <SelectValue placeholder="Seleccionar términos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collect">Collect</SelectItem>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origen</Label>
              <Select>
                <SelectTrigger id="origin" className="w-full">
                  <SelectValue placeholder="Seleccionar origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="callao">Callao (PECLL), Perú</SelectItem>
                  <SelectItem value="lima">Lima, Perú</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="destination">Destino</Label>
              <Select>
                <SelectTrigger id="destination" className="w-full">
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dafeng">Dafeng (CNDFE), China</SelectItem>
                  <SelectItem value="shanghai">Shanghai, China</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cargo-type">Tipo de Carga</Label>
              <Select>
                <SelectTrigger id="cargo-type" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fcl">FCL (Full Container Load)</SelectItem>
                  <SelectItem value="lcl">LCL (Less than Container Load)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proforma">Proforma/Referencia</Label>
              <Input id="proforma" className="w-full" placeholder="REF" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productos Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-5 w-5 text-blue-600" />
            Productos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {products.map((product, index) => (
            <div key={product.id} className="space-y-6 rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Producto {index + 1}</h3>
                {products.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeProduct(product.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`description-${product.id}`}>
                    Descripción del Producto <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger id={`description-${product.id}`} className="w-full">
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiles">Porcelain Tiles Caja de 4 piezas (60x60 cm)</SelectItem>
                      <SelectItem value="other">Otro producto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`fob-${product.id}`}>Total FOB (USD)</Label>
                  <Input id={`fob-${product.id}`} className="w-full" type="number" placeholder="12,500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`quantity-${product.id}`}>Cantidad</Label>
                  <Input id={`quantity-${product.id}`} className="w-full" type="number" placeholder="1000" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`packaging-${product.id}`}>Empaque (UC)</Label>
                  <Input id={`packaging-${product.id}`} className="w-full" placeholder="Cajas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`secondary-${product.id}`}>Empaque Secundario</Label>
                  <Input id={`secondary-${product.id}`} className="w-full" placeholder="48 pallets" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`tariff-${product.id}`}>Partida Arancelaria</Label>
                  <Input id={`tariff-${product.id}`} className="w-full" placeholder="200.01029.10" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`commercial-${product.id}`}>Unidades Comerciales Totales</Label>
                  <Input id={`commercial-${product.id}`} className="w-full" placeholder="2,755.4 m2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`net-weight-${product.id}`}>Peso Neto Total (Kg)</Label>
                  <Input id={`net-weight-${product.id}`} className="w-full" type="number" placeholder="25,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`gross-weight-${product.id}`}>Peso Bruto Total (Kg)</Label>
                  <Input id={`gross-weight-${product.id}`} className="w-full" type="number" placeholder="26,000" />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addProduct} className="w-full bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Producto
          </Button>
        </CardContent>
      </Card>

      {/* Logística Internacional Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Anchor className="h-5 w-5 text-blue-600" />
            Logística Internacional
          </CardTitle>
          <Button variant="outline" size="sm">
            Cargar Booking
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="shipping-type">
                Tipo de Envío <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="shipping-type" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maritime">Marítimo</SelectItem>
                  <SelectItem value="air">Aéreo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="incoterm-logistics">
                Incoterm <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="incoterm-logistics" className="w-full">
                  <SelectValue placeholder="Seleccionar incoterm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fob">FOB (Free On Board)</SelectItem>
                  <SelectItem value="cif">CIF (Cost, Insurance & Freight)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-condition">
                Condición de Pago <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="payment-condition" className="w-full">
                  <SelectValue placeholder="Seleccionar condición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advance">Pago Anticipado</SelectItem>
                  <SelectItem value="credit">Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="origin-port">
                Puerto Origen <span className="text-red-500">*</span>
              </Label>
              <Input id="origin-port" className="w-full" placeholder="Puerto de origen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination-port">
                Puerto Destino <span className="text-red-500">*</span>
              </Label>
              <Input id="destination-port" className="w-full" placeholder="Puerto de destino" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bl-place">Lugar Emisión BL</Label>
              <Input id="bl-place" className="w-full" placeholder="Lugar de emisión del Bill of Lading" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="special-regime">Régimen Especial</Label>
              <Select>
                <SelectTrigger id="special-regime" className="w-full">
                  <SelectValue placeholder="Seleccionar régimen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguno</SelectItem>
                  <SelectItem value="temporary">Temporal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspections">Inspecciones</Label>
              <Input id="inspections" className="w-full" placeholder="Tipo de inspecciones requeridas" />
            </div>
            <div className="space-y-2">{/* Empty cell for grid alignment */}</div>
          </div>
        </CardContent>
      </Card>

      {/* Logística en Origen Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileCheck className="h-5 w-5 text-blue-600" />
            Logística en Origen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="logistics-operator">
                Operador Logístico <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="logistics-operator" className="w-full">
                  <SelectValue placeholder="Seleccionar operador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ocean">Ocean Freight Solutions</SelectItem>
                  <SelectItem value="other">Otro operador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customs-agency">
                Agencia de Aduana <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="customs-agency" className="w-full">
                  <SelectValue placeholder="Seleccionar agencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customs">Customs Brokerage Inc.</SelectItem>
                  <SelectItem value="other">Otra agencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="warehouse">Almacén</Label>
              <Select>
                <SelectTrigger id="warehouse" className="w-full">
                  <SelectValue placeholder="Seleccionar almacén" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lima">Almacén Central Lima</SelectItem>
                  <SelectItem value="other">Otro almacén</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="filling-date">
                Fecha y hora para llenado <span className="text-red-500">*</span>
              </Label>
              <Input id="filling-date" className="w-full" type="datetime-local" placeholder="MM/DD/AAAA hh:mm aa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dispatch-mode">
                Modalidad de despacho <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="dispatch-mode" className="w-full">
                  <SelectValue placeholder="Seleccionar modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Directo</SelectItem>
                  <SelectItem value="indirect">Indirecto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-terminal">Terminal de Ingreso (Puerto o DT)</Label>
              <Select>
                <SelectTrigger id="entry-terminal" className="w-full">
                  <SelectValue placeholder="Seleccionar terminal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="callao">Terminal Marítimo Callao</SelectItem>
                  <SelectItem value="other">Otro terminal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSaveDraft}>
          Guardar Borrador
        </Button>
        <Button onClick={handleCreateOrder}>Crear Orden</Button>
      </div>
    </div>
  )
}
