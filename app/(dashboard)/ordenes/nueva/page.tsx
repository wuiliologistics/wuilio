"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Package, EarthIcon, LucideContainer as LucideContainerIcon, Plus, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { mockProductos } from "@/lib/mock-data-productos"
import { mockClientes } from "@/lib/mock-data"
import { mockProveedores } from "@/lib/mock-data-proveedores" // Import mockProveedores
import { useCompany } from "@/contexts/company-context"
import { ClienteFormModal } from "@/components/cliente-form-modal" // Import ClienteFormModal
import { ProductoFormModal } from "@/components/producto-form-modal" // Import ProductoFormModal
import { ProveedorFormModal } from "@/components/proveedor-form-modal" // Import ProveedorFormModal
import type { Cliente } from "@/types/cliente" // Import Cliente type
import type { Producto } from "@/types/producto" // Import Producto type
import type { Proveedor } from "@/types/proveedor" // Import Proveedor type

interface Product {
  id: string
  productoId: string // Added to track selected product
  description: string
  formatoPresentacion: string
  paisOrigen: string
  precioFobUnitario: number
  dimensiones: string
  cantidadExportar: number
  descuento: number
  descuentoTipo: "porcentaje" | "monto"
  certificados: string[]
  partidaArancelaria: string
  empaqueBase: string
  empaqueSecundario: string
  empaqueSecundarioUnidades: number // Max units per secondary package
  cantidadEmpaquesSecundarios: number // Calculated number of secondary packages
  unidadesComerciales: number
  unidadesComercialesUnidad: string // Added unit field for physical units display
  pesoNetoUnitario: number
  pesoBrutoUnitario: number
  pesoNetoTotal: number
  pesoBrutoTotal: number
  unidadesComercialesTotal: number
  precioFobTotal: number
}

export default function NuevaOrdenPage() {
  const router = useRouter()
  const { selectedCompanyName, registerFormDirty } = useCompany()

  const [tipoEnvio, setTipoEnvio] = useState<string>("")
  const [modalidadDespacho, setModalidadDespacho] = useState<string>("")
  const [terminalIngreso, setTerminalIngreso] = useState<string>("")

  const [logisticsMode, setLogisticsMode] = useState<"none" | "document" | "manual">("none")

  const fileInputRefMaritimo = useRef<HTMLInputElement>(null)
  const fileInputRefAereo = useRef<HTMLInputElement>(null)
  const fileInputRefTerrestre = useRef<HTMLInputElement>(null)

  const [selectedConsignee, setSelectedConsignee] = useState<string>("")
  const [condicionesPago, setCondicionesPago] = useState<string>("")

  const [showClienteModal, setShowClienteModal] = useState(false)
  const [showProductoModal, setShowProductoModal] = useState(false)
  const [showProveedorModal, setShowProveedorModal] = useState(false)
  const [proveedorModalType, setProveedorModalType] = useState<"agente" | "operador" | "agencia">("agente")

  const [localClientes, setLocalClientes] = useState(mockClientes)
  const [localProductos, setLocalProductos] = useState(mockProductos)
  const [localProveedores, setLocalProveedores] = useState(mockProveedores)

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      productoId: "",
      description: "",
      formatoPresentacion: "",
      paisOrigen: "",
      precioFobUnitario: 0,
      dimensiones: "",
      cantidadExportar: 0,
      descuento: 0,
      descuentoTipo: "porcentaje",
      certificados: [],
      partidaArancelaria: "",
      empaqueBase: "",
      empaqueSecundario: "",
      empaqueSecundarioUnidades: 0,
      cantidadEmpaquesSecundarios: 0,
      unidadesComerciales: 0,
      unidadesComercialesUnidad: "",
      pesoNetoUnitario: 0,
      pesoBrutoUnitario: 0,
      pesoNetoTotal: 0,
      pesoBrutoTotal: 0,
      unidadesComercialesTotal: 0,
      precioFobTotal: 0,
    },
  ])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasChanges =
        tipoEnvio !== "" ||
        selectedConsignee !== "" ||
        condicionesPago !== "" ||
        products.some((p) => p.productoId !== "" || p.cantidadExportar > 0)

      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [tipoEnvio, selectedConsignee, condicionesPago, products])

  useEffect(() => {
    const hasChanges =
      tipoEnvio !== "" ||
      selectedConsignee !== "" ||
      condicionesPago !== "" ||
      products.some((p) => p.productoId !== "" || p.cantidadExportar > 0)

    registerFormDirty(hasChanges)
    console.log("[v0] Form dirty state:", hasChanges)
  }, [tipoEnvio, selectedConsignee, condicionesPago, products, registerFormDirty])

  const handleConsigneeChange = (clienteId: string) => {
    if (clienteId === "create-new") {
      setShowClienteModal(true)
      return
    }

    setSelectedConsignee(clienteId)
    const cliente = localClientes.find((c) => c.id === clienteId)
    if (cliente) {
      // Auto-fill condiciones de pago from client data
      setCondicionesPago(cliente.condicionesPagoComercial || "")
    }
  }

  const handleSaveCliente = (clienteData: Partial<Cliente>) => {
    const newCliente: Cliente = {
      ...clienteData,
      id: `CLI-${String(localClientes.length + 1).padStart(3, "0")}`,
      estado: "Activo",
      notifies: clienteData.notifies || [],
    } as Cliente
    setLocalClientes([...localClientes, newCliente])
    setSelectedConsignee(newCliente.id)
    setShowClienteModal(false)
  }

  const handleSaveProducto = (productoData: Partial<Producto>) => {
    const newProducto: Producto = {
      ...productoData,
      id: `PROD-${String(localProductos.length + 1).padStart(3, "0")}`,
      estado: "Activo",
    } as Producto
    setLocalProductos([...localProductos, newProducto])
    setShowProductoModal(false)
  }

  const handleSaveProveedor = (proveedorData: Partial<Proveedor>) => {
    const newProveedor: Proveedor = {
      ...proveedorData,
      id: `PROV-${String(localProveedores.length + 1).padStart(3, "0")}`,
      estado: "Activo",
    } as Proveedor
    setLocalProveedores([...localProveedores, newProveedor])
    setShowProveedorModal(false)
  }

  const handleProductSelect = (productIndex: number, productoId: string) => {
    if (productoId === "create-new") {
      setShowProductoModal(true)
      return
    }

    const selectedProducto = localProductos.find((p) => p.id === productoId)
    if (!selectedProducto) return

    const updatedProducts = [...products]
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      productoId: selectedProducto.id,
      description: `${selectedProducto.codigo_producto} - ${selectedProducto.descripcion_comercial}`,
      formatoPresentacion: selectedProducto.formato_comercial,
      paisOrigen: selectedProducto.pais_origen,
      precioFobUnitario: selectedProducto.precio_fob_usd,
      dimensiones: selectedProducto.dimensiones_cm,
      partidaArancelaria: selectedProducto.hs_code,
      empaqueBase: selectedProducto.empaque_base,
      empaqueSecundario: `${selectedProducto.cantidad_maxima_empaque_secundario} ${selectedProducto.empaque_secundario}`,
      empaqueSecundarioUnidades: selectedProducto.cantidad_maxima_empaque_secundario,
      unidadesComerciales: selectedProducto.unidades_comerciales_valor,
      unidadesComercialesUnidad: selectedProducto.unidad, // Fixed: use 'unidad' field instead of 'unidades_comerciales_unidad'
      pesoNetoUnitario: selectedProducto.peso_neto_kg,
      pesoBrutoUnitario: selectedProducto.peso_bruto_kg,
    }

    if (updatedProducts[productIndex].cantidadExportar > 0) {
      calculateTotals(updatedProducts, productIndex)
    }

    setProducts(updatedProducts)
  }

  const handleQuantityChange = (productIndex: number, cantidad: number) => {
    const updatedProducts = [...products]
    updatedProducts[productIndex].cantidadExportar = cantidad
    calculateTotals(updatedProducts, productIndex)
    setProducts(updatedProducts)
  }

  const handleDiscountChange = (productIndex: number, descuento: number, tipo: "porcentaje" | "monto") => {
    const updatedProducts = [...products]
    updatedProducts[productIndex].descuento = descuento
    updatedProducts[productIndex].descuentoTipo = tipo
    calculateTotals(updatedProducts, productIndex)
    setProducts(updatedProducts)
  }

  const handleCertificateToggle = (productIndex: number, certificate: string) => {
    const updatedProducts = [...products]
    const currentCertificates = updatedProducts[productIndex].certificados

    if (currentCertificates.includes(certificate)) {
      updatedProducts[productIndex].certificados = currentCertificates.filter((c) => c !== certificate)
    } else {
      updatedProducts[productIndex].certificados = [...currentCertificates, certificate]
    }

    setProducts(updatedProducts)
  }

  const calculateTotals = (productsArray: Product[], index: number) => {
    const product = productsArray[index]
    const cantidad = product.cantidadExportar

    product.pesoNetoTotal = product.pesoNetoUnitario * cantidad
    product.pesoBrutoTotal = product.pesoBrutoUnitario * cantidad
    product.unidadesComercialesTotal = product.unidadesComerciales * cantidad

    if (product.empaqueSecundarioUnidades > 0) {
      product.cantidadEmpaquesSecundarios = Math.ceil(cantidad / product.empaqueSecundarioUnidades)
    } else {
      product.cantidadEmpaquesSecundarios = 0
    }

    const subtotal = product.precioFobUnitario * cantidad
    let descuentoMonto = 0

    if (product.descuentoTipo === "porcentaje") {
      descuentoMonto = (subtotal * product.descuento) / 100
    } else {
      descuentoMonto = product.descuento
    }

    product.precioFobTotal = subtotal - descuentoMonto
  }

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        productoId: "",
        description: "",
        formatoPresentacion: "",
        paisOrigen: "",
        precioFobUnitario: 0,
        dimensiones: "",
        cantidadExportar: 0,
        descuento: 0,
        descuentoTipo: "porcentaje",
        certificados: [],
        partidaArancelaria: "",
        empaqueBase: "",
        empaqueSecundario: "",
        empaqueSecundarioUnidades: 0,
        cantidadEmpaquesSecundarios: 0,
        unidadesComerciales: 0,
        unidadesComercialesUnidad: "",
        pesoNetoUnitario: 0,
        pesoBrutoUnitario: 0,
        pesoNetoTotal: 0,
        pesoBrutoTotal: 0,
        unidadesComercialesTotal: 0,
        precioFobTotal: 0,
      },
    ])
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleSaveDraft = () => {
    const draftOrder = {
      tipoEnvio,
      products,
      logisticsMode,
      timestamp: new Date().toISOString(),
      status: "borrador",
    }

    // Save to localStorage for now (until backend is implemented)
    const existingDrafts = JSON.parse(localStorage.getItem("orderDrafts") || "[]")
    existingDrafts.push(draftOrder)
    localStorage.setItem("orderDrafts", JSON.stringify(existingDrafts))

    // Show success message (you can add a toast notification here)
    alert("Borrador guardado exitosamente")
    console.log("[v0] Draft saved:", draftOrder)
  }

  const handleCreateOrder = () => {
    console.log("[v0] Creating order...")
    router.push("/ordenes")
  }

  const getIncotermsOptions = () => {
    if (tipoEnvio === "maritimo") {
      return [
        { value: "exw", label: "EXW (Ex Works)" },
        { value: "fca", label: "FCA (Free Carrier)" },
        { value: "fas", label: "FAS (Free Alongside Ship)" },
        { value: "fob", label: "FOB (Free On Board)" },
        { value: "cfr", label: "CFR (Cost and Freight)" },
        { value: "cif", label: "CIF (Cost, Insurance and Freight)" },
        { value: "cpt", label: "CPT (Carriage Paid To)" },
        { value: "cip", label: "CIP (Carriage and Insurance Paid To)" },
        { value: "dap", label: "DAP (Delivered At Place)" },
        { value: "dpu", label: "DPU (Delivered at Place Unloaded)" },
        { value: "ddp", label: "DDP (Delivered Duty Paid)" },
      ]
    } else if (tipoEnvio === "aereo" || tipoEnvio === "terrestre") {
      return [
        { value: "exw", label: "EXW (Ex Works)" },
        { value: "fca", label: "FCA (Free Carrier)" },
        { value: "cpt", label: "CPT (Carriage Paid To)" },
        { value: "cip", label: "CIP (Carriage and Insurance Paid To)" },
        { value: "dap", label: "DAP (Delivered At Place)" },
        { value: "dpu", label: "DPU (Delivered at Place Unloaded)" },
        { value: "ddp", label: "DDP (Delivered Duty Paid)" },
      ]
    }
    return []
  }

  const handleLoadDocument = (type: "maritimo" | "aereo" | "terrestre") => {
    setLogisticsMode("document")
    if (type === "maritimo" && fileInputRefMaritimo.current) {
      fileInputRefMaritimo.current.click()
    } else if (type === "aereo" && fileInputRefAereo.current) {
      fileInputRefAereo.current.click()
    } else if (type === "terrestre" && fileInputRefTerrestre.current) {
      fileInputRefTerrestre.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("[v0] File selected:", file.name)
      // TODO: Implement document parsing logic here
      // For now, just log the file
    }
  }

  const getTerminalOptions = () => {
    if (modalidadDespacho === "via-directa") {
      return [
        { value: "apm-terminals", label: "Puerto del Callao - APM Terminals" },
        { value: "dp-world", label: "Puerto del Callao - DP World" },
        { value: "terminal-norte", label: "Puerto del Callao - Terminal Norte Multipropósito" },
      ]
    } else if (modalidadDespacho === "via-dt") {
      return [
        { value: "dt-ransa", label: "DT Ransa Callao" },
        { value: "dt-neptunia", label: "DT Neptunia" },
        { value: "dt-almacenes", label: "DT Almacenes del Perú" },
      ]
    }
    return []
  }

  const handleModalidadChange = (value: string) => {
    setModalidadDespacho(value)
    setTerminalIngreso("") // Reset terminal selection
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Datos Base Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-black" />
            Datos Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="proforma">
                Proforma <span className="text-red-500">*</span>
              </Label>
              <Input id="proforma" className="w-full" placeholder="Número de proforma" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipper">
                Shipper <span className="text-red-500">*</span>
              </Label>
              <Input id="shipper" className="w-full bg-muted" value={selectedCompanyName} readOnly required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consignee">
                Consignee <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedConsignee} onValueChange={handleConsigneeChange} required>
                <SelectTrigger id="consignee" className="w-full">
                  <SelectValue placeholder="Seleccionar consignee" />
                </SelectTrigger>
                <SelectContent>
                  {localClientes
                    .filter((c) => c.estado === "Activo")
                    .map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.empresa}
                      </SelectItem>
                    ))}
                  <SelectItem value="create-new" className="text-primary font-medium border-t">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Crear nuevo cliente
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="notify">
                Notify <span className="text-red-500">*</span>
              </Label>
              <Select disabled={!selectedConsignee} required>
                <SelectTrigger id="notify" className="w-full">
                  <SelectValue
                    placeholder={selectedConsignee ? "Seleccionar notify" : "Primero seleccione consignee"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {selectedConsignee &&
                    localClientes
                      .find((c) => c.id === selectedConsignee)
                      ?.notifies.map((notify) => (
                        <SelectItem key={notify.id} value={notify.id}>
                          {notify.empresaNotify}
                        </SelectItem>
                      ))}
                  {selectedConsignee &&
                    localClientes.find((c) => c.id === selectedConsignee)?.notifies.length === 0 && (
                      <SelectItem value="none" disabled>
                        No hay notifies disponibles
                      </SelectItem>
                    )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">
                Origen <span className="text-red-500">*</span>
              </Label>
              <Select required>
                <SelectTrigger id="origin" className="w-full">
                  <SelectValue placeholder="Seleccionar origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="callao">Callao (PECLL), Perú</SelectItem>
                  <SelectItem value="lima">Lima, Perú</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">
                Destino <span className="text-red-500">*</span>
              </Label>
              <Select required>
                <SelectTrigger id="destination" className="w-full">
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dafeng">Dafeng (CNDFE), China</SelectItem>
                  <SelectItem value="shanghai">Shanghai, China</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tipo-envio">
                Tipo de Envío <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={setTipoEnvio} required>
                <SelectTrigger id="tipo-envio" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de envío" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maritimo">Marítimo</SelectItem>
                  <SelectItem value="aereo">Aéreo</SelectItem>
                  <SelectItem value="terrestre">Terrestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="incoterms">
                Incoterms® 2020 <span className="text-red-500">*</span>
              </Label>
              <Select disabled={!tipoEnvio} required>
                <SelectTrigger id="incoterms" className="w-full">
                  <SelectValue placeholder={tipoEnvio ? "Seleccionar incoterm" : "Primero seleccione tipo de envío"} />
                </SelectTrigger>
                <SelectContent>
                  {getIncotermsOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condiciones-pago">
                Condiciones de Pago Comercial <span className="text-red-500">*</span>
              </Label>
              <Input
                id="condiciones-pago"
                className="w-full"
                placeholder="Ej: 30% adelanto, 70% contra BL"
                value={condicionesPago}
                onChange={(e) => setCondicionesPago(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="condicion-flete">
                Condición Flete <span className="text-red-500">*</span>
              </Label>
              <Select required>
                <SelectTrigger id="condicion-flete" className="w-full">
                  <SelectValue placeholder="Seleccionar condición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                  <SelectItem value="collect">Collect</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regimen-aduanero">
                Régimen Aduanero Principal <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="exportacion-definitiva" required>
                <SelectTrigger id="regimen-aduanero" className="w-full">
                  <SelectValue placeholder="Seleccionar régimen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exportacion-definitiva">Exportación Definitiva</SelectItem>
                  <SelectItem value="exportacion-temporal">Exportación Temporal</SelectItem>
                  <SelectItem value="reexportacion">Reexportación</SelectItem>
                  <SelectItem value="exportacion-simplificada">Exportación Simplificada</SelectItem>
                  <SelectItem value="envios-urgencia">Envíos de Urgencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tratamiento-especial">Tratamiento Especial</Label>
              <Select>
                <SelectTrigger id="tratamiento-especial" className="w-full">
                  <SelectValue placeholder="Seleccionar tratamiento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ninguno">Ninguno</SelectItem>
                  <SelectItem value="drawback">Drawback</SelectItem>
                  <SelectItem value="reposicion-franquicia">Reposición de Mercancías en Franquicia</SelectItem>
                  <SelectItem value="admision-temporal">Admisión Temporal</SelectItem>
                  <SelectItem value="zona-franca">Zona Franca</SelectItem>
                  <SelectItem value="regimen-especial">Régimen Especial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productos Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-5 w-5 text-foreground" />
            Productos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6">
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

              {/* Row 1: Basic product info */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`description-${product.id}`}>
                    Código + Descripción Comercial <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={product.productoId}
                    onValueChange={(value) => handleProductSelect(index, value)}
                    required
                  >
                    <SelectTrigger id={`description-${product.id}`} className="w-full">
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {localProductos
                        .filter((p) => p.estado === "Activo")
                        .map((producto) => (
                          <SelectItem key={producto.id} value={producto.id}>
                            {producto.codigo_producto} - {producto.descripcion_comercial}
                          </SelectItem>
                        ))}
                      <SelectItem value="create-new" className="text-primary font-medium border-t">
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Crear nuevo producto
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`partida-${product.id}`}>Partida Arancelaria</Label>
                  <Input
                    id={`partida-${product.id}`}
                    className="w-full bg-muted"
                    value={product.partidaArancelaria}
                    placeholder="Automático"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`formato-${product.id}`}>Unidad Comercial</Label>
                  <Input
                    id={`formato-${product.id}`}
                    className="w-full bg-muted"
                    value={product.formatoPresentacion}
                    placeholder="Automático"
                    readOnly
                  />
                </div>
              </div>

              {/* Row 2: Unit-level details */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`pais-origen-${product.id}`}>País de Origen</Label>
                  <Input
                    id={`pais-origen-${product.id}`}
                    className="w-full bg-muted"
                    value={product.paisOrigen}
                    placeholder="Automático"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`precio-unitario-${product.id}`}>Precio FOB Unitario (USD)</Label>
                  <Input
                    id={`precio-unitario-${product.id}`}
                    className="w-full bg-muted"
                    type="number"
                    value={product.precioFobUnitario || ""}
                    placeholder="Automático"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`dimensiones-${product.id}`}>Dimensiones de Unidad Comercial (cm³) </Label>
                  <Input
                    id={`dimensiones-${product.id}`}
                    className="w-full bg-muted"
                    value={product.dimensiones}
                    placeholder="Automático"
                    readOnly
                  />
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Row 3: User inputs */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`cantidad-${product.id}`}>
                    Unidades Comerciales Totales <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`cantidad-${product.id}`}
                      className="w-full"
                      type="number"
                      value={product.cantidadExportar || ""}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      placeholder="Ingrese cantidad"
                    />
                    {product.empaqueBase && (
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{product.empaqueBase}</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`descuento-${product.id}`}>Descuento (% o USD)</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`descuento-${product.id}`}
                      className="w-full"
                      type="number"
                      value={product.descuento || ""}
                      onChange={(e) => handleDiscountChange(index, Number(e.target.value), product.descuentoTipo)}
                      placeholder="0"
                    />
                    <Select
                      value={product.descuentoTipo}
                      onValueChange={(value: "porcentaje" | "monto") =>
                        handleDiscountChange(index, product.descuento, value)
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="porcentaje">%</SelectItem>
                        <SelectItem value="monto">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`certificados-${product.id}`}>Certificados Requeridos</Label>
                  <Select value={product.certificados.length > 0 ? "selected" : ""}>
                    <SelectTrigger id={`certificados-${product.id}`} className="w-full h-10">
                      <SelectValue placeholder="Seleccionar certificados">
                        {product.certificados.length > 0
                          ? `${product.certificados.length} seleccionado${product.certificados.length > 1 ? "s" : ""}`
                          : "Seleccionar certificados"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="space-y-2 p-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`cert-origen-${product.id}`}
                            checked={product.certificados.includes("Certificado de Origen")}
                            onCheckedChange={() => handleCertificateToggle(index, "Certificado de Origen")}
                          />
                          <label htmlFor={`cert-origen-${product.id}`} className="text-sm cursor-pointer">
                            Certificado de Origen
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`cert-fito-${product.id}`}
                            checked={product.certificados.includes("Certificado Fitosanitario")}
                            onCheckedChange={() => handleCertificateToggle(index, "Certificado Fitosanitario")}
                          />
                          <label htmlFor={`cert-fito-${product.id}`} className="text-sm cursor-pointer">
                            Certificado Fitosanitario
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`cert-calidad-${product.id}`}
                            checked={product.certificados.includes("Certificado de Calidad")}
                            onCheckedChange={() => handleCertificateToggle(index, "Certificado de Calidad")}
                          />
                          <label htmlFor={`cert-calidad-${product.id}`} className="text-sm cursor-pointer">
                            Certificado de Calidad
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`cert-inspeccion-${product.id}`}
                            checked={product.certificados.includes("Certificado de Inspección")}
                            onCheckedChange={() => handleCertificateToggle(index, "Certificado de Inspección")}
                          />
                          <label htmlFor={`cert-inspeccion-${product.id}`} className="text-sm cursor-pointer">
                            Certificado de Inspección
                          </label>
                        </div>
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Calculated totals */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`fob-total-${product.id}`}>Precio FOB Total (USD)</Label>
                  <Input
                    id={`fob-total-${product.id}`}
                    className="w-full bg-muted"
                    type="number"
                    value={product.precioFobTotal.toFixed(2)}
                    placeholder="Calculado"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`cantidad-empaque-secundario-${product.id}`}>
                    Empaques Secundarios Totales (Bultos)
                  </Label>
                  <Input
                    id={`cantidad-empaque-secundario-${product.id}`}
                    className="w-full bg-muted"
                    value={
                      product.cantidadEmpaquesSecundarios > 0
                        ? `${product.cantidadEmpaquesSecundarios} ${product.empaqueSecundario.split(" ").pop() || ""}`
                        : ""
                    }
                    placeholder="Calculado"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`unidades-${product.id}`}>Unidades Físicas Totales</Label>
                  <Input
                    id={`unidades-${product.id}`}
                    className="w-full bg-muted"
                    value={
                      product.unidadesComercialesTotal > 0 && product.unidadesComercialesUnidad
                        ? `${product.unidadesComercialesTotal} ${product.unidadesComercialesUnidad}`
                        : product.unidadesComercialesTotal || ""
                    }
                    placeholder="Calculado"
                    readOnly
                  />
                </div>
              </div>

              {/* Row 5: Weight totals */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`peso-neto-${product.id}`}>Peso Neto Total (Kg)</Label>
                  <Input
                    id={`peso-neto-${product.id}`}
                    className="w-full bg-muted"
                    type="number"
                    value={product.pesoNetoTotal || ""}
                    placeholder="Calculado"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`peso-bruto-${product.id}`}>Peso Bruto Total (Kg)</Label>
                  <Input
                    id={`peso-bruto-${product.id}`}
                    className="w-full bg-muted"
                    type="number"
                    value={product.pesoBrutoTotal || ""}
                    placeholder="Calculado"
                    readOnly
                  />
                </div>
                <div className="space-y-2">{/* Empty cell for grid alignment */}</div>
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
      {tipoEnvio && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <EarthIcon className="h-5 w-5 text-black" />
              Logística Internacional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6">
            {/* Marítimo Section */}
            {tipoEnvio === "maritimo" && (
              <div className="space-y-6">
                <h3 className="font-semibold text-sm">Envío Marítimo</h3>

                {/* Manual fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-carga">Tipo de Carga</Label>
                    <Select>
                      <SelectTrigger id="tipo-carga" className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fcl">FCL (Full Container Load)</SelectItem>
                        <SelectItem value="lcl">LCL (Less than Container Load)</SelectItem>
                        <SelectItem value="break-bulk">Break Bulk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-bl">Tipo de BL</Label>
                    <Select>
                      <SelectTrigger id="tipo-bl" className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original</SelectItem>
                        <SelectItem value="telex">Telex Release</SelectItem>
                        <SelectItem value="express">Express Release</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agente-carga-maritimo">Agente de Carga</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value === "create-new") {
                          setProveedorModalType("agente")
                          setShowProveedorModal(true)
                        }
                      }}
                    >
                      <SelectTrigger id="agente-carga-maritimo" className="w-full">
                        <SelectValue placeholder="Seleccionar agente" />
                      </SelectTrigger>
                      <SelectContent>
                        {localProveedores
                          .filter((p) => p.estado === "Activo")
                          .map((proveedor) => (
                            <SelectItem key={proveedor.id} value={proveedor.id}>
                              {proveedor.empresa}
                            </SelectItem>
                          ))}
                        <SelectItem value="create-new" className="text-primary font-medium border-t">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear nuevo agente
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <input
                  ref={fileInputRefMaritimo}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex gap-3">
                  <Button
                    variant={logisticsMode === "document" ? "default" : "outline"}
                    onClick={() => handleLoadDocument("maritimo")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Cargar Booking
                  </Button>
                  <Button
                    variant={logisticsMode === "manual" ? "default" : "outline"}
                    onClick={() => setLogisticsMode("manual")}
                  >
                    Cambiar a Manual
                  </Button>
                </div>

                {/* Automatic fields - appear when document loaded or manual mode */}
                {logisticsMode !== "none" && (
                  <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="naviera">Naviera</Label>
                        <Select>
                          <SelectTrigger id="naviera" className="w-full">
                            <SelectValue placeholder="Seleccionar naviera" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maersk">Maersk Line</SelectItem>
                            <SelectItem value="msc">MSC (Mediterranean Shipping Company)</SelectItem>
                            <SelectItem value="cma-cgm">CMA CGM</SelectItem>
                            <SelectItem value="cosco">COSCO Shipping</SelectItem>
                            <SelectItem value="hapag-lloyd">Hapag-Lloyd</SelectItem>
                            <SelectItem value="evergreen">Evergreen Line</SelectItem>
                            <SelectItem value="one">ONE (Ocean Network Express)</SelectItem>
                            <SelectItem value="yang-ming">Yang Ming</SelectItem>
                            <SelectItem value="hmm">HMM (Hyundai Merchant Marine)</SelectItem>
                            <SelectItem value="zim">ZIM Integrated Shipping</SelectItem>
                            <SelectItem value="wan-hai">Wan Hai Lines</SelectItem>
                            <SelectItem value="other">Otra naviera</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="num-booking">N° de Booking</Label>
                        <Input id="num-booking" className="w-full" placeholder="Número de booking" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="num-viaje">N° de Viaje / Buque</Label>
                        <Input id="num-viaje" className="w-full" placeholder="Número de viaje o buque" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="tipo-contenedores">Tipo de Contenedores</Label>
                        <Select>
                          <SelectTrigger id="tipo-contenedores" className="w-full">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20dv">20DV</SelectItem>
                            <SelectItem value="40hc">40HC</SelectItem>
                            <SelectItem value="40rf">40RF</SelectItem>
                            <SelectItem value="break-bulk">Break Bulk</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cantidad-contenedores">Cantidad de Contenedores</Label>
                        <Input id="cantidad-contenedores" className="w-full" type="number" placeholder="Cantidad" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deposito-retiro">Depósito de Retiro</Label>
                        <Input id="deposito-retiro" className="w-full" placeholder="Nombre del depósito" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="puerto-origen-maritimo">Puerto de Origen</Label>
                        <Select>
                          <SelectTrigger id="puerto-origen-maritimo" className="w-full">
                            <SelectValue placeholder="Seleccionar puerto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pecll">Callao (PECLL), Perú</SelectItem>
                            <SelectItem value="pepio">Paita (PEPIO), Perú</SelectItem>
                            <SelectItem value="pemol">Matarani (PEMOL), Perú</SelectItem>
                            <SelectItem value="other">Otro puerto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="puerto-destino-maritimo">Puerto de Destino</Label>
                        <Select>
                          <SelectTrigger id="puerto-destino-maritimo" className="w-full">
                            <SelectValue placeholder="Seleccionar puerto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cndfe">Dafeng (CNDFE), China</SelectItem>
                            <SelectItem value="cnsha">Shanghai (CNSHA), China</SelectItem>
                            <SelectItem value="cnytn">Yantian (CNYTN), China</SelectItem>
                            <SelectItem value="other">Otro puerto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="etd-maritimo">Fecha Estimada de Embarque (ETD)</Label>
                        <Input id="etd-maritimo" className="w-full" type="date" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3"></div>
                  </>
                )}
              </div>
            )}

            {/* Aéreo Section */}
            {tipoEnvio === "aereo" && (
              <div className="space-y-6">
                <h3 className="font-semibold text-sm">Envío Aéreo</h3>

                {/* Manual fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-guia">
                      Tipo de Guía <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger id="tipo-guia" className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mawb">MAWB (Master Air Waybill)</SelectItem>
                        <SelectItem value="hawb">HAWB (House Air Waybill)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-documento-aereo">
                      Tipo de Documento <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger id="tipo-documento-aereo" className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awb">Air Waybill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agente-carga-aereo">Agente de Carga</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value === "create-new") {
                          setProveedorModalType("agente")
                          setShowProveedorModal(true)
                        }
                      }}
                    >
                      <SelectTrigger id="agente-carga-aereo" className="w-full">
                        <SelectValue placeholder="Seleccionar agente" />
                      </SelectTrigger>
                      <SelectContent>
                        {localProveedores
                          .filter((p) => p.estado === "Activo")
                          .map((proveedor) => (
                            <SelectItem key={proveedor.id} value={proveedor.id}>
                              {proveedor.empresa}
                            </SelectItem>
                          ))}
                        <SelectItem value="create-new" className="text-primary font-medium border-t">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear nuevo agente
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <input
                  ref={fileInputRefAereo}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex gap-3">
                  <Button
                    variant={logisticsMode === "document" ? "default" : "outline"}
                    onClick={() => handleLoadDocument("aereo")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Cargar AWB
                  </Button>
                  <Button
                    variant={logisticsMode === "manual" ? "default" : "outline"}
                    onClick={() => setLogisticsMode("manual")}
                  >
                    Cambiar a Manual
                  </Button>
                </div>

                {/* Automatic fields */}
                {logisticsMode !== "none" && (
                  <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="aerolinea">Aerolínea</Label>
                        <Input id="aerolinea" className="w-full" placeholder="Nombre de la aerolínea" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="num-awb">N° de Guía Aérea (AWB)</Label>
                        <Input id="num-awb" className="w-full" placeholder="Número de AWB" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aeropuerto-origen">Aeropuerto de Origen</Label>
                        <Input id="aeropuerto-origen" className="w-full" placeholder="Aeropuerto de origen" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="aeropuerto-destino">Aeropuerto de Destino</Label>
                        <Input id="aeropuerto-destino" className="w-full" placeholder="Aeropuerto de destino" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="etd-aereo">Fecha de Vuelo (ETD)</Label>
                        <Input id="etd-aereo" className="w-full" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eta-aereo">Fecha Estimada de Llegada (ETA)</Label>
                        <Input id="eta-aereo" className="w-full" type="date" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="cantidad-bultos">Cantidad de Bultos</Label>
                        <Input id="cantidad-bultos" className="w-full" type="number" placeholder="Cantidad" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="peso-total-aereo">Peso Total (Kg)</Label>
                        <Input id="peso-total-aereo" className="w-full" type="number" placeholder="Peso total" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Terrestre Section */}
            {tipoEnvio === "terrestre" && (
              <div className="space-y-6">
                <h3 className="font-semibold text-sm">Envío Terrestre</h3>

                {/* Manual fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-documento-terrestre">
                      Tipo de Documento <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger id="tipo-documento-terrestre" className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carta-porte">Carta Porte</SelectItem>
                        <SelectItem value="cmr">CMR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo-unidad">
                      Tipo de Unidad <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger id="tipo-unidad" className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="camion">Camión</SelectItem>
                        <SelectItem value="trailer">Tráiler</SelectItem>
                        <SelectItem value="plataforma">Plataforma</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cantidad-unidades">
                      Cantidad de Unidades <span className="text-red-500">*</span>
                    </Label>
                    <Input id="cantidad-unidades" className="w-full" type="number" placeholder="Cantidad" />
                  </div>
                </div>

                <input
                  ref={fileInputRefTerrestre}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex gap-3">
                  <Button
                    variant={logisticsMode === "document" ? "default" : "outline"}
                    onClick={() => handleLoadDocument("terrestre")}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Cargar Carta Porte
                  </Button>
                  <Button
                    variant={logisticsMode === "manual" ? "default" : "outline"}
                    onClick={() => setLogisticsMode("manual")}
                  >
                    Cambiar a Manual
                  </Button>
                </div>

                {/* Automatic fields */}
                {logisticsMode !== "none" && (
                  <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="transportista">Transportista</Label>
                        <Input id="transportista" className="w-full" placeholder="Nombre del transportista" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="num-documento-terrestre">N° de Carta Porte / CMR</Label>
                        <Input id="num-documento-terrestre" className="w-full" placeholder="Número de documento" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pais-origen-terrestre">País de Origen</Label>
                        <Input id="pais-origen-terrestre" className="w-full" placeholder="País de origen" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="pais-destino-terrestre">País de Destino</Label>
                        <Input id="pais-destino-terrestre" className="w-full" placeholder="País de destino" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pais-transito">País de Tránsito</Label>
                        <Input id="pais-transito" className="w-full" placeholder="País de tránsito (si aplica)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="etd-terrestre">Fecha de Salida (ETD)</Label>
                        <Input id="etd-terrestre" className="w-full" type="date" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="eta-terrestre">Fecha Estimada de Llegada (ETA)</Label>
                        <Input id="eta-terrestre" className="w-full" type="date" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Logística en Origen Section */}
      {tipoEnvio && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LucideContainerIcon className="h-5 w-5 text-black" />
              Logística en Origen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6">
            {tipoEnvio === "maritimo" ? (
              <>
                {/* Show all fields for Marítimo */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="logistics-operator">Operador Logístico</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value === "create-new") {
                          setProveedorModalType("operador")
                          setShowProveedorModal(true)
                        }
                      }}
                    >
                      <SelectTrigger id="logistics-operator" className="w-full">
                        <SelectValue placeholder="Seleccionar operador" />
                      </SelectTrigger>
                      <SelectContent>
                        {localProveedores
                          .filter((p) => p.estado === "Activo")
                          .map((proveedor) => (
                            <SelectItem key={proveedor.id} value={proveedor.id}>
                              {proveedor.empresa}
                            </SelectItem>
                          ))}
                        <SelectItem value="create-new" className="text-primary font-medium border-t">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear nuevo operador
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customs-agency">Agencia de Aduana</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value === "create-new") {
                          setProveedorModalType("agencia")
                          setShowProveedorModal(true)
                        }
                      }}
                    >
                      <SelectTrigger id="customs-agency" className="w-full">
                        <SelectValue placeholder="Seleccionar agencia" />
                      </SelectTrigger>
                      <SelectContent>
                        {localProveedores
                          .filter((p) => p.estado === "Activo")
                          .map((proveedor) => (
                            <SelectItem key={proveedor.id} value={proveedor.id}>
                              {proveedor.empresa}
                            </SelectItem>
                          ))}
                        <SelectItem value="create-new" className="text-primary font-medium border-t">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear nueva agencia
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warehouse">Planta</Label>
                    <Select>
                      <SelectTrigger id="warehouse" className="w-full">
                        <SelectValue placeholder="Seleccionar planta" />
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
                    <Label htmlFor="dispatch-mode">
                      Modalidad de despacho <span className="text-red-500">*</span>
                    </Label>
                    <Select value={modalidadDespacho} onValueChange={handleModalidadChange} required>
                      <SelectTrigger id="dispatch-mode" className="w-full">
                        <SelectValue placeholder="Seleccionar modalidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="via-directa">Vía Directa</SelectItem>
                        <SelectItem value="via-dt">Vía Depósito Temporal (DT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entry-terminal">
                      Terminal de Ingreso (Puerto o DT) <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={terminalIngreso}
                      onValueChange={setTerminalIngreso}
                      disabled={!modalidadDespacho}
                      required
                    >
                      <SelectTrigger id="entry-terminal" className="w-full">
                        <SelectValue
                          placeholder={
                            modalidadDespacho ? "Seleccionar terminal" : "Primero seleccione modalidad de despacho"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {getTerminalOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                        {modalidadDespacho && getTerminalOptions().length === 0 && (
                          <SelectItem value="none" disabled>
                            No hay terminales disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : tipoEnvio === "aereo" || tipoEnvio === "terrestre" ? (
              <>
                {/* Show limited fields for Aéreo/Terrestre */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="customs-agency">Agencia de Aduana</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value === "create-new") {
                          setProveedorModalType("agencia")
                          setShowProveedorModal(true)
                        }
                      }}
                    >
                      <SelectTrigger id="customs-agency" className="w-full">
                        <SelectValue placeholder="Seleccionar agencia" />
                      </SelectTrigger>
                      <SelectContent>
                        {localProveedores
                          .filter((p) => p.estado === "Activo")
                          .map((proveedor) => (
                            <SelectItem key={proveedor.id} value={proveedor.id}>
                              {proveedor.empresa}
                            </SelectItem>
                          ))}
                        <SelectItem value="create-new" className="text-primary font-medium border-t">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear nueva agencia
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warehouse">Almacén</Label>
                    <Select>
                      <SelectTrigger id="warehouse" className="w-full">
                        <SelectValue placeholder="Seleccionar planta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lima">Almacén Central Lima</SelectItem>
                        <SelectItem value="other">Otro almacén</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filling-date">Fecha y hora</Label>
                    <Input
                      id="filling-date"
                      className="w-full"
                      type="datetime-local"
                      placeholder="MM/DD/AAAA hh:mm aa"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Seleccione un tipo de envío en "Datos Base" para continuar
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSaveDraft}>
          Guardar Borrador
        </Button>
        <Button onClick={handleCreateOrder}>Crear Orden</Button>
      </div>

      {/* Modals */}
      <ClienteFormModal
        open={showClienteModal}
        onClose={() => setShowClienteModal(false)}
        onSave={handleSaveCliente}
        cliente={null}
      />

      <ProductoFormModal
        open={showProductoModal}
        onClose={() => setShowProductoModal(false)}
        onSave={handleSaveProducto}
        producto={null}
      />

      <ProveedorFormModal
        open={showProveedorModal}
        onClose={() => setShowProveedorModal(false)}
        onSave={handleSaveProveedor}
        proveedor={null}
      />
    </div>
  )
}
