"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Cliente } from "@/types/cliente"

const COUNTRIES_DATA = {
  "Estados Unidos": {
    prefix: "+1",
    zipPattern: /^\d{5}(-\d{4})?$/,
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"],
  },
  "Países Bajos": {
    prefix: "+31",
    zipPattern: /^\d{4}\s?[A-Z]{2}$/,
    cities: ["Amsterdam", "Rotterdam", "La Haya", "Utrecht", "Eindhoven", "Tilburg", "Groningen"],
  },
  Brasil: {
    prefix: "+55",
    zipPattern: /^\d{5}-?\d{3}$/,
    cities: ["São Paulo", "Río de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaos"],
  },
  España: {
    prefix: "+34",
    zipPattern: /^\d{5}$/,
    cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma"],
  },
  China: {
    prefix: "+86",
    zipPattern: /^\d{6}$/,
    cities: ["Pekín", "Shanghái", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Wuhan", "Xian"],
  },
  Singapur: {
    prefix: "+65",
    zipPattern: /^\d{6}$/,
    cities: ["Singapur"],
  },
  Perú: {
    prefix: "+51",
    zipPattern: /^\d{5}$/,
    cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Cusco", "Iquitos"],
  },
}

interface ClienteFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (cliente: Partial<Cliente>) => void
  cliente?: Cliente | null
}

export function ClienteFormModal({ open, onClose, onSave, cliente }: ClienteFormModalProps) {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    pais: "",
    ruc: "",
    eori: "",
    empresa: "",
    direccionCalle: "",
    direccionNumero: "",
    ciudad: "",
    region: "",
    zipCode: "",
    contacto: "",
    telefono: "",
    email: "",
    estado: "Activo",
  })

  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [zipError, setZipError] = useState<string>("")

  useEffect(() => {
    if (cliente) {
      setFormData(cliente)
      if (cliente.pais && COUNTRIES_DATA[cliente.pais as keyof typeof COUNTRIES_DATA]) {
        setAvailableCities(COUNTRIES_DATA[cliente.pais as keyof typeof COUNTRIES_DATA].cities)
      }
    } else {
      setFormData({
        pais: "",
        ruc: "",
        eori: "",
        empresa: "",
        direccionCalle: "",
        direccionNumero: "",
        ciudad: "",
        region: "",
        zipCode: "",
        contacto: "",
        telefono: "",
        email: "",
        estado: "Activo",
      })
      setAvailableCities([])
    }
  }, [cliente, open])

  const handleCountryChange = (country: string) => {
    const countryData = COUNTRIES_DATA[country as keyof typeof COUNTRIES_DATA]
    setFormData({
      ...formData,
      pais: country,
      telefono: countryData?.prefix || "",
      ciudad: "",
    })
    setAvailableCities(countryData?.cities || [])
    setZipError("")
  }

  const handleZipCodeChange = (zip: string) => {
    setFormData({ ...formData, zipCode: zip })
    if (formData.pais && zip) {
      const countryData = COUNTRIES_DATA[formData.pais as keyof typeof COUNTRIES_DATA]
      if (countryData && !countryData.zipPattern.test(zip)) {
        setZipError("Formato de código postal inválido para este país")
      } else {
        setZipError("")
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zipError) return
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">{cliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Fiscal */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Información Fiscal</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pais" className="text-sm font-medium">
                  País <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.pais} onValueChange={handleCountryChange} required>
                  <SelectTrigger id="pais" autoFocus className="w-full">
                    <SelectValue placeholder="Seleccionar país" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(COUNTRIES_DATA).map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ruc" className="text-sm font-medium">
                  RUC / Tax ID / KVK <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ruc"
                  value={formData.ruc}
                  onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eori" className="text-sm font-medium">
                  EORI (opcional)
                </Label>
                <Input
                  id="eori"
                  value={formData.eori}
                  onChange={(e) => setFormData({ ...formData, eori: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Información de la Empresa */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Información de la Empresa</h3>
            <div className="space-y-2">
              <Label htmlFor="empresa" className="text-sm font-medium">
                Nombre de la empresa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="empresa"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Dirección</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-3 space-y-2">
                <Label htmlFor="direccionCalle" className="text-sm font-medium">
                  Calle <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="direccionCalle"
                  value={formData.direccionCalle}
                  onChange={(e) => setFormData({ ...formData, direccionCalle: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccionNumero" className="text-sm font-medium">
                  N° <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="direccionNumero"
                  value={formData.direccionNumero}
                  onChange={(e) => setFormData({ ...formData, direccionNumero: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ciudad" className="text-sm font-medium">
                  Ciudad <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.ciudad}
                  onValueChange={(value) => setFormData({ ...formData, ciudad: value })}
                  disabled={!formData.pais}
                  required
                >
                  <SelectTrigger id="ciudad" className="w-full">
                    <SelectValue placeholder={formData.pais ? "Seleccionar ciudad" : "Primero seleccione país"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region" className="text-sm font-medium">
                  Región / Estado / Provincia (opcional)
                </Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleZipCodeChange(e.target.value)}
                  className={`w-full ${zipError ? "border-red-500" : ""}`}
                  required
                />
                {zipError && <p className="text-xs text-red-500 mt-1">{zipError}</p>}
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Información de Contacto</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contacto" className="text-sm font-medium">
                  Contacto <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contacto"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-sm font-medium">
                  Teléfono <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder={formData.pais ? "Incluye prefijo del país" : ""}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Estado</h3>
            <div className="space-y-2">
              <Label htmlFor="estado" className="text-sm font-medium">
                Estado <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.estado}
                onValueChange={(value: "Activo" | "Inactivo") => setFormData({ ...formData, estado: value })}
              >
                <SelectTrigger id="estado" className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6" disabled={!!zipError}>
              {cliente ? "Guardar Cambios" : "Crear Cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
