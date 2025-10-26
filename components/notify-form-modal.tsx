"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Notify } from "@/types/cliente"

const COUNTRY_CODES = [
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+51", country: "Perú", flag: "🇵🇪" },
  { code: "+34", country: "España", flag: "🇪🇸" },
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+31", country: "Países Bajos", flag: "🇳🇱" },
  { code: "+65", country: "Singapur", flag: "🇸🇬" },
  { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
  { code: "+49", country: "Alemania", flag: "🇩🇪" },
]

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

interface NotifyFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (notify: Partial<Notify>) => void
  notify?: Notify | null
}

export default function NotifyFormModal({ open, onClose, onSave, notify }: NotifyFormModalProps) {
  const [formData, setFormData] = useState<Partial<Notify>>({
    empresaNotify: "",
    pais: "",
    ruc: "",
    direccion: "",
    ciudad: "",
    zipCode: "",
    contacto: "",
    telefono: "",
    email: "",
    region: "", // Added region field
  })

  const [phoneCode, setPhoneCode] = useState("+1")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [zipError, setZipError] = useState<string>("")

  useEffect(() => {
    if (notify) {
      setFormData(notify)
      if (notify.telefono) {
        const matchedCode = COUNTRY_CODES.find((cc) => notify.telefono?.startsWith(cc.code))
        if (matchedCode) {
          setPhoneCode(matchedCode.code)
          setPhoneNumber(notify.telefono.substring(matchedCode.code.length).trim())
        } else {
          setPhoneNumber(notify.telefono)
        }
      }
      if (notify.pais && COUNTRIES_DATA[notify.pais as keyof typeof COUNTRIES_DATA]) {
        setAvailableCities(COUNTRIES_DATA[notify.pais as keyof typeof COUNTRIES_DATA].cities)
      }
    } else {
      setFormData({
        empresaNotify: "",
        pais: "",
        ruc: "",
        direccion: "",
        ciudad: "",
        zipCode: "",
        contacto: "",
        telefono: "",
        email: "",
        region: "", // Added region field
      })
      setPhoneCode("+1")
      setPhoneNumber("")
      setAvailableCities([])
    }
  }, [notify, open])

  const handleCountryChange = (country: string) => {
    const countryData = COUNTRIES_DATA[country as keyof typeof COUNTRIES_DATA]
    setFormData({
      ...formData,
      pais: country,
      ciudad: "",
      region: "", // Reset region when country changes
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
    const fullPhone = phoneNumber ? `${phoneCode} ${phoneNumber}` : ""
    onSave({ ...formData, telefono: fullPhone })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        {" "}
        {/* Increased max-width */}
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">{notify ? "Editar Notify" : "Nuevo Notify"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Fiscal */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Información Fiscal</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="notify-pais" className="text-sm font-medium">
                  País <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.pais} onValueChange={handleCountryChange} required>
                  <SelectTrigger id="notify-pais" autoFocus className="w-full">
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
                <Label htmlFor="notify-ruc" className="text-sm font-medium">
                  RUC / Tax ID / KVK <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="notify-ruc"
                  value={formData.ruc}
                  onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información de la Empresa */}
          <div className="space-y-4">
            <div className="space-y-2 pt-0">
              <Label htmlFor="notify-empresa" className="text-sm font-medium">
                Nombre de la empresa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="notify-empresa"
                value={formData.empresaNotify}
                onChange={(e) => setFormData({ ...formData, empresaNotify: e.target.value })}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 border-b pb-2">Dirección</h3>
            <div className="space-y-2">
              <Label htmlFor="notify-direccion" className="text-sm font-medium">
                Dirección <span className="text-red-500">*</span>
              </Label>
              <Input
                id="notify-direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="notify-ciudad" className="text-sm font-medium">
                  Ciudad <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.ciudad}
                  onValueChange={(value) => setFormData({ ...formData, ciudad: value })}
                  disabled={!formData.pais}
                  required
                >
                  <SelectTrigger id="notify-ciudad" className="w-full">
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
                <Label htmlFor="notify-region" className="text-sm font-medium">
                  Región / Estado / Provincia
                </Label>
                <Input
                  id="notify-region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="notify-zipCode" className="text-sm font-medium">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="notify-zipCode"
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
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="notify-contacto" className="text-sm font-medium">
                  Contacto <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="notify-contacto"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notify-telefono" className="text-sm font-medium">
                  Teléfono <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select value={phoneCode} onValueChange={setPhoneCode}>
                    <SelectTrigger className="w-[120px]">
                      {" "}
                      {/* Reduced width */}
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_CODES.map((cc) => (
                        <SelectItem key={cc.code} value={cc.code}>
                          <span className="flex items-center gap-2">
                            <span>{cc.flag}</span>
                            <span>{cc.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="notify-telefono"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Número de teléfono"
                    className="flex-1"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notify-email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="notify-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="px-6" disabled={!!zipError}>
              {notify ? "Guardar Cambios" : "Agregar Notify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
