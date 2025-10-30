"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import type { Cliente, Notify } from "@/types/cliente"
import { Plus, Trash2, Info } from "lucide-react"
import NotifyFormModal from "./notify-form-modal"

const ALL_COUNTRIES = [
  "Afganistán",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Benín",
  "Bielorrusia",
  "Birmania",
  "Bolivia",
  "Bosnia y Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunéi",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Colombia",
  "Comoras",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guinea",
  "Guinea-Bisáu",
  "Guinea Ecuatorial",
  "Guyana",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Macedonia del Norte",
  "Madagascar",
  "Malasia",
  "Malaui",
  "Maldivas",
  "Malí",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Centroafricana",
  "República Checa",
  "República del Congo",
  "República Democrática del Congo",
  "República Dominicana",
  "Ruanda",
  "Rumania",
  "Rusia",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Suazilandia",
  "Sudáfrica",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turkmenistán",
  "Turquía",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
]

const COUNTRY_CODES = [
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+1", country: "Canadá", flag: "🇨🇦" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+53", country: "Cuba", flag: "🇨🇺" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+51", country: "Perú", flag: "🇵🇪" },
  { code: "+591", country: "Bolivia", flag: "🇧🇴" },
  { code: "+592", country: "Guyana", flag: "🇬🇾" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+594", country: "Guayana Francesa", flag: "🇬🇫" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾" },
  { code: "+596", country: "Martinica", flag: "🇲🇶" },
  { code: "+597", country: "Surinam", flag: "🇸🇷" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+507", country: "Panamá", flag: "🇵🇦" },
  { code: "+509", country: "Haití", flag: "🇭🇹" },
  { code: "+1-787", country: "Puerto Rico", flag: "🇵🇷" },
  { code: "+1-809", country: "República Dominicana", flag: "🇩🇴" },
  { code: "+1-876", country: "Jamaica", flag: "🇯🇲" },
  { code: "+1-246", country: "Barbados", flag: "🇧🇧" },
  { code: "+1-268", country: "Antigua y Barbuda", flag: "🇦🇬" },
  { code: "+1-284", country: "Islas Vírgenes Británicas", flag: "🇻🇬" },
  { code: "+1-345", country: "Islas Caimán", flag: "🇰🇾" },
  { code: "+1-441", country: "Bermudas", flag: "🇧🇲" },
  { code: "+1-473", country: "Granada", flag: "🇬🇩" },
  { code: "+1-649", country: "Islas Turcas y Caicos", flag: "🇹🇨" },
  { code: "+1-664", country: "Montserrat", flag: "🇲🇸" },
  { code: "+1-758", country: "Santa Lucía", flag: "🇱🇨" },
  { code: "+1-767", country: "Dominica", flag: "🇩🇲" },
  { code: "+1-784", country: "San Vicente y las Granadinas", flag: "🇻🇨" },
  { code: "+1-868", country: "Trinidad y Tobago", flag: "🇹🇹" },
]

const COUNTRIES_WITH_LEVEL3_SUBDIVISIONS = [
  "Perú",
  "Chile",
  "Colombia",
  "México",
  "Argentina",
  "Brasil",
  "Venezuela",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Uruguay",
  "Guatemala",
  "Honduras",
  "El Salvador",
  "Nicaragua",
  "Costa Rica",
  "Panamá",
  "Cuba",
  "República Dominicana",
  "Haití",
  "Jamaica",
  "Trinidad y Tobago",
  "España",
  "Italia",
  "Francia",
  "Portugal",
  "Filipinas",
  "Indonesia",
  "Tailandia",
  "Vietnam",
  "India",
  "Pakistán",
  "Bangladés",
  "Japón",
  "Corea del Sur",
  "China",
]

const COUNTRY_TO_ISO: Record<string, string> = {
  Perú: "PE",
  Chile: "CL",
  Colombia: "CO",
  México: "MX",
  Argentina: "AR",
  "Estados Unidos": "US",
  Canadá: "CA",
  Brasil: "BR",
  Francia: "FR",
  Alemania: "DE",
  España: "ES",
  Italia: "IT",
  "Reino Unido": "GB",
  China: "CN",
  Japón: "JP",
  India: "IN",
  Australia: "AU",
  Rusia: "RU",
  "Países Bajos": "NL",
  Singapur: "SG",
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
    empresa: "",
    direccionCalle: "",
    ciudad: "",
    region: "",
    localidad: "",
    zipCode: "",
    contacto: "",
    telefono: "",
    email: "",
    estado: "Activo",
    notifies: [],
  })

  const [phoneCode, setPhoneCode] = useState("+1-US")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [editingNotify, setEditingNotify] = useState<Notify | null>(null)
  const [showLocalidad, setShowLocalidad] = useState(true)

  useEffect(() => {
    if (cliente) {
      setFormData({
        ...cliente,
        region: cliente.region || "",
        localidad: cliente.localidad || "",
        zipCode: cliente.zipCode || "",
        codigoPostal: cliente.codigoPostal || "",
        notifies: cliente.notifies || [],
      })
      if (cliente.telefono) {
        const matchedCode = COUNTRY_CODES.find((cc) => cliente.telefono?.startsWith(cc.code))
        if (matchedCode) {
          setPhoneCode(`${matchedCode.code}-${matchedCode.country}`)
          setPhoneNumber(cliente.telefono.substring(matchedCode.code.length).trim())
        } else {
          setPhoneNumber(cliente.telefono)
        }
      }
    } else {
      setFormData({
        pais: "",
        ruc: "",
        empresa: "",
        direccionCalle: "",
        ciudad: "",
        region: "",
        localidad: "",
        zipCode: "",
        contacto: "",
        telefono: "",
        email: "",
        estado: "Activo",
        notifies: [],
      })
      setPhoneCode("+1-US")
      setPhoneNumber("")
    }
  }, [cliente, open])

  const checkCountrySubdivisions = async (country: string) => {
    const hasLevel3 = COUNTRIES_WITH_LEVEL3_SUBDIVISIONS.includes(country)
    setShowLocalidad(hasLevel3)
  }

  const handleCountryChange = (country: string) => {
    setFormData({
      ...formData,
      pais: country,
      ciudad: "",
      localidad: "",
    })
    checkCountrySubdivisions(country)
  }

  const handleAddNotify = () => {
    setEditingNotify(null)
    setShowNotifyModal(true)
  }

  const handleSaveNotify = (notify: Partial<Notify>) => {
    const notifies = formData.notifies || []
    if (editingNotify) {
      const updatedNotifies = notifies.map((n) => (n.id === editingNotify.id ? { ...n, ...notify } : n))
      setFormData({ ...formData, notifies: updatedNotifies })
    } else {
      const newNotify: Notify = {
        id: Date.now().toString(),
        empresaNotify: notify.empresaNotify || "",
        pais: notify.pais || "",
        ruc: notify.ruc || "",
        direccion: notify.direccion || "",
        ciudad: notify.ciudad || "",
        zipCode: notify.zipCode || "",
        contacto: notify.contacto || "",
        telefono: notify.telefono || "",
        email: notify.email || "",
      }
      setFormData({ ...formData, notifies: [...notifies, newNotify] })
    }
    setShowNotifyModal(false)
  }

  const handleDeleteNotify = (notifyId: string) => {
    const notifies = formData.notifies || []
    setFormData({ ...formData, notifies: notifies.filter((n) => n.id !== notifyId) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const actualCode = phoneCode.split("-")[0]
    const fullPhone = phoneNumber ? `${actualCode} ${phoneNumber}` : ""
    onSave({ ...formData, telefono: fullPhone })
    onClose()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="!max-w-3xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-xl">{cliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {cliente ? "Actualiza la información del cliente" : "Completa la información del cliente"}
                </p>
              </div>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Fiscal */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Información Fiscal</h3>
                <Separator className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pais" className="text-sm font-medium">
                    País <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.pais} onValueChange={handleCountryChange} required>
                    <SelectTrigger id="pais" autoFocus className="w-full">
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_COUNTRIES.map((country) => (
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
              </div>
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
              <div>
                <h3 className="text-sm font-semibold text-foreground">Dirección</h3>
                <Separator className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="region" className="text-sm font-medium">
                      Región / Estado <span className="text-red-500">*</span>
                    </Label>
                    <div className="group relative">
                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      <div className="absolute left-0 top-6 z-50 hidden w-48 rounded-md bg-popover p-2 text-xs text-popover-foreground shadow-md group-hover:block">
                        Región, provincia, departamento o estado
                      </div>
                    </div>
                  </div>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad" className="text-sm font-medium">
                    Ciudad <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full"
                    placeholder="Ingrese ciudad"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {showLocalidad && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="localidad" className="text-sm font-medium">
                        Localidad
                      </Label>
                      <div className="group relative">
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        <div className="absolute left-0 top-6 z-50 hidden w-48 rounded-md bg-popover p-2 text-xs text-popover-foreground shadow-md group-hover:block">
                          Distrito, municipio o comuna
                        </div>
                      </div>
                    </div>
                    <Input
                      id="localidad"
                      value={formData.localidad}
                      onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
                      className="w-full"
                      placeholder="Ingrese localidad"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium">
                    Código Postal <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccionCalle" className="text-sm font-medium">
                  Dirección Principal <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="direccionCalle"
                  value={formData.direccionCalle}
                  onChange={(e) => setFormData({ ...formData, direccionCalle: e.target.value })}
                  className="w-full"
                  placeholder="Calle, número, etc."
                  required
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Información de Contacto</h3>
                <Separator className="mt-2" />
              </div>
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
              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-sm font-medium">
                    Teléfono <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Select value={phoneCode} onValueChange={setPhoneCode}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue>
                          {(() => {
                            const selected = COUNTRY_CODES.find((cc) => `${cc.code}-${cc.country}` === phoneCode)
                            return selected ? `${selected.flag} ${selected.code}` : phoneCode.split("-")[0]
                          })()}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((cc, index) => (
                          <SelectItem key={`${cc.code}-${cc.country}-${index}`} value={`${cc.code}-${cc.country}`}>
                            <span className="flex items-center gap-2">
                              <span>{cc.flag}</span>
                              <span>{cc.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="telefono"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Número de teléfono"
                      className="flex-1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Estado */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Estado</h3>
                <Separator className="mt-2" />
              </div>
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

            {/* Notify */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Notify</h3>
                <Separator className="mt-2" />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddNotify}
                className="gap-2 bg-transparent"
              >
                <Plus className="h-4 w-4" />
                Agregar Notify
              </Button>
              {formData.notifies && formData.notifies.length > 0 && (
                <div className="space-y-2">
                  {formData.notifies.map((notify) => (
                    <div
                      key={notify.id}
                      className="flex items-center justify-between p-3 border rounded-md bg-slate-50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notify.empresaNotify}</p>
                        <p className="text-xs text-slate-600">
                          {notify.contacto} • {notify.email}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNotify(notify.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <Separator />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="px-6 bg-black hover:bg-gray-900">
                {cliente ? "Guardar Cambios" : "Guardar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Notify Form Modal */}
      <NotifyFormModal
        open={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
        onSave={handleSaveNotify}
        notify={editingNotify}
      />
    </>
  )
}
