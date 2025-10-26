"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import type { Producto } from "@/types/producto"

interface ProductoFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (producto: Partial<Producto>) => void
  producto: Producto | null
}

const unidadOptions = ["m²", "m³", "kg", "TM", "unidad", "caja", "litro"] as const
const empaqueBaseOptions = ["Unidad", "Caja", "Pallet", "Big bag", "Saco", "Tambor", "Bin"] as const
const empaqueSecundarioOptions = ["Si", "No"] as const
const unidadEmpaqueSecundarioOptions = ["Paleta"] as const

export function ProductoFormModal({ open, onClose, onSave, producto }: ProductoFormModalProps) {
  const defaultFormData: Partial<Producto> = {
    codigo_producto: "",
    descripcion_comercial: "",
    partida_arancelaria: "",
    formato_presentacion: "",
    unidades_comerciales_valor: 0,
    unidad: "kg",
    pais_origen: "",
    precio_fob_usd: 0,
    empaque_base: "Saco",
    peso_neto_kg: 0,
    peso_bruto_kg: 0,
    dimensiones_cm: "",
    empaque_secundario: "Si",
    unidad_empaque_secundario: "Paleta",
    cantidad_maxima_empaque_secundario: 0,
    estado: "Activo",
  }

  const [formData, setFormData] = useState<Partial<Producto>>(defaultFormData)

  useEffect(() => {
    if (producto) {
      setFormData({ ...defaultFormData, ...producto })
    } else {
      setFormData(defaultFormData)
    }
  }, [producto, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleChange = (field: keyof Producto, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{producto ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
        </DialogHeader>

        <TooltipProvider>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Código de Producto */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="codigo_producto">Código de Producto</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: ID1012930</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="codigo_producto"
                value={formData.codigo_producto}
                onChange={(e) => handleChange("codigo_producto", e.target.value)}
                required
              />
            </div>

            {/* 2. Descripción Comercial */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="descripcion_comercial">Descripción Comercial</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: PORCELAIN TILES</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="descripcion_comercial"
                value={formData.descripcion_comercial}
                onChange={(e) => handleChange("descripcion_comercial", e.target.value)}
                required
              />
            </div>

            {/* 3. Partida arancelaria */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="partida_arancelaria">Partida arancelaria</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: 00819221</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="partida_arancelaria"
                value={formData.partida_arancelaria}
                onChange={(e) => handleChange("partida_arancelaria", e.target.value)}
                required
              />
            </div>

            {/* 4. Formato Presentación */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="formato_presentacion">Formato Presentación</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: Caja de 4 piezas (60×60 cm)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="formato_presentacion"
                value={formData.formato_presentacion}
                onChange={(e) => handleChange("formato_presentacion", e.target.value)}
                required
              />
            </div>

            {/* 5. Unidades Físicas */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label>Unidades Físicas</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: 1.66 m²</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <Input
                  type="number"
                  step="0.01"
                  value={
                    isNaN(formData.unidades_comerciales_valor as number) ? "" : formData.unidades_comerciales_valor
                  }
                  onChange={(e) =>
                    handleChange(
                      "unidades_comerciales_valor",
                      e.target.value === "" ? 0 : Number.parseFloat(e.target.value),
                    )
                  }
                  required
                />
                <Select value={formData.unidad} onValueChange={(value) => handleChange("unidad", value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unidadOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 6. País de Origen */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="pais_origen">País de Origen</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: Peru</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="pais_origen"
                value={formData.pais_origen}
                onChange={(e) => handleChange("pais_origen", e.target.value)}
                required
              />
            </div>

            {/* 7. Precio FOB (USD) */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="precio_fob_usd">Precio FOB (USD)</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: 12.5</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="precio_fob_usd"
                type="number"
                step="0.01"
                value={isNaN(formData.precio_fob_usd as number) ? "" : formData.precio_fob_usd}
                onChange={(e) =>
                  handleChange("precio_fob_usd", e.target.value === "" ? 0 : Number.parseFloat(e.target.value))
                }
                required
              />
            </div>

            {/* 8. Empaque base */}
            <div className="space-y-2">
              <Label htmlFor="empaque_base">Empaque base</Label>
              <Select value={formData.empaque_base} onValueChange={(value) => handleChange("empaque_base", value)}>
                <SelectTrigger id="empaque_base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {empaqueBaseOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 9. Peso neto y Peso bruto */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="peso_neto_kg">Peso neto (Kg)</Label>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ejemplo: 25</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="peso_neto_kg"
                  type="number"
                  step="0.01"
                  value={isNaN(formData.peso_neto_kg as number) ? "" : formData.peso_neto_kg}
                  onChange={(e) =>
                    handleChange("peso_neto_kg", e.target.value === "" ? 0 : Number.parseFloat(e.target.value))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="peso_bruto_kg">Peso bruto (Kg)</Label>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ejemplo: 26</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="peso_bruto_kg"
                  type="number"
                  step="0.01"
                  value={isNaN(formData.peso_bruto_kg as number) ? "" : formData.peso_bruto_kg}
                  onChange={(e) =>
                    handleChange("peso_bruto_kg", e.target.value === "" ? 0 : Number.parseFloat(e.target.value))
                  }
                  required
                />
              </div>
            </div>

            {/* 10. Dimensiones de unidad base (cm) */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label>Dimensiones de unidad base (cm)</Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: L: 60, A: 60, H: 10</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="L"
                  value={formData.dimensiones_cm?.split("x")[0]?.trim() || ""}
                  onChange={(e) => {
                    const parts = formData.dimensiones_cm?.split("x") || ["", "", ""]
                    parts[0] = e.target.value
                    handleChange("dimensiones_cm", parts.join(" x "))
                  }}
                  required
                />
                <Input
                  placeholder="A"
                  value={formData.dimensiones_cm?.split("x")[1]?.trim() || ""}
                  onChange={(e) => {
                    const parts = formData.dimensiones_cm?.split("x") || ["", "", ""]
                    parts[1] = e.target.value
                    handleChange("dimensiones_cm", parts.join(" x "))
                  }}
                  required
                />
                <Input
                  placeholder="H"
                  value={formData.dimensiones_cm?.split("x")[2]?.trim() || ""}
                  onChange={(e) => {
                    const parts = formData.dimensiones_cm?.split("x") || ["", "", ""]
                    parts[2] = e.target.value
                    handleChange("dimensiones_cm", parts.join(" x "))
                  }}
                  required
                />
              </div>
            </div>

            {/* 11. Empaque Secundario */}
            <div className="space-y-2">
              <Label>Empaque Final</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={formData.empaque_secundario}
                  onValueChange={(value) => handleChange("empaque_secundario", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {empaqueSecundarioOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.unidad_empaque_secundario}
                  onValueChange={(value) => handleChange("unidad_empaque_secundario", value)}
                  disabled={formData.empaque_secundario !== "Si"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unidadEmpaqueSecundarioOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 12. Cantidad máxima / Empaque secundario */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="cantidad_maxima_empaque_secundario">
                  Cantidad máxima de empaque base por empaque secundario
                </Label>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ejemplo: 200</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="cantidad_maxima_empaque_secundario"
                type="number"
                value={
                  isNaN(formData.cantidad_maxima_empaque_secundario as number)
                    ? ""
                    : formData.cantidad_maxima_empaque_secundario
                }
                onChange={(e) =>
                  handleChange(
                    "cantidad_maxima_empaque_secundario",
                    e.target.value === "" ? 0 : Number.parseInt(e.target.value),
                  )
                }
                disabled={formData.empaque_secundario !== "Si"}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {producto ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </div>
          </form>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  )
}
