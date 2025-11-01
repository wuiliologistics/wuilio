"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Info, ChevronDown, ChevronUp, X, Plus } from "lucide-react"
import type { Proveedor } from "@/types/proveedor"

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block">
    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
    <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-lg border z-50">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border" />
    </div>
  </div>
)

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
  "Guinea Ecuatorial",
  "Guinea-Bisáu",
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
  "Rumanía",
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
  "Vaticano",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
]

const COUNTRIES_WITH_LEVEL3 = [
  "Perú",
  "Chile",
  "Colombia",
  "México",
  "Argentina",
  "Ecuador",
  "Bolivia",
  "Venezuela",
  "Guatemala",
  "Honduras",
  "Nicaragua",
  "Costa Rica",
  "Panamá",
  "República Dominicana",
  "El Salvador",
]

const COUNTRY_CODES = [
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+1", country: "Canadá", flag: "🇨🇦" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+51", country: "Perú", flag: "🇵🇪" },
  { code: "+34", country: "España", flag: "🇪🇸" },
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+31", country: "Países Bajos", flag: "🇳🇱" },
  { code: "+65", country: "Singapur", flag: "🇸🇬" },
  { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
  { code: "+49", country: "Alemania", flag: "🇩🇪" },
  { code: "+33", country: "Francia", flag: "🇫🇷" },
  { code: "+39", country: "Italia", flag: "🇮🇹" },
  { code: "+81", country: "Japón", flag: "🇯🇵" },
  { code: "+82", country: "Corea del Sur", flag: "🇰🇷" },
]

const TIPOS_PROVEEDOR = ["Agencia de Carga", "Operador Logístico", "Agencia de Aduanas", "Transporte", "Almacén"]

interface ProveedorFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (proveedor: Partial<Proveedor>) => void
  proveedor: Proveedor | null
}

export function ProveedorFormModal({ open, onClose, onSave, proveedor }: ProveedorFormModalProps) {
  const [formData, setFormData] = useState<Partial<Proveedor>>({
    pais: "",
    ruc: "",
    empresa: "",
    region: "",
    ciudad: "",
    localidad: "",
    direccion: "",
    codigoPostal: "",
    contacto: "",
    telefono: "",
    email: "",
    tiposProveedor: [],
    nombreBanco: "",
    numeroCuenta: "",
    cci: "",
    estado: "Activo",
  })

  const [phoneCode, setPhoneCode] = useState("+51-Perú")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showLocalidad, setShowLocalidad] = useState(true)
  const [showAdditionalEmails, setShowAdditionalEmails] = useState(false)
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([])

  useEffect(() => {
    if (proveedor) {
      setFormData({
        ...proveedor,
        region: proveedor.region || "",
        localidad: proveedor.localidad || "",
        codigoPostal: proveedor.codigoPostal || "",
        nombreBanco: proveedor.nombreBanco || "",
        numeroCuenta: proveedor.numeroCuenta || "",
        cci: proveedor.cci || "",
      })
      if (proveedor.emailsAdicionales && proveedor.emailsAdicionales.length > 0) {
        setAdditionalEmails(proveedor.emailsAdicionales)
        setShowAdditionalEmails(true)
      } else {
        setAdditionalEmails([])
        setShowAdditionalEmails(false)
      }
      if (proveedor.telefono) {
        const matchedCode = COUNTRY_CODES.find((cc) => proveedor.telefono?.startsWith(cc.code))
        if (matchedCode) {
          setPhoneCode(`${matchedCode.code}-${matchedCode.country}`)
          setPhoneNumber(proveedor.telefono.substring(matchedCode.code.length).trim())
        } else {
          setPhoneNumber(proveedor.telefono)
        }
      }
      if (proveedor.pais) {
        checkCountrySubdivisions(proveedor.pais)
      }
    } else {
      setFormData({
        pais: "",
        ruc: "",
        empresa: "",
        region: "",
        ciudad: "",
        localidad: "",
        direccion: "",
        codigoPostal: "",
        contacto: "",
        telefono: "",
        email: "",
        tiposProveedor: [],
        nombreBanco: "",
        numeroCuenta: "",
        cci: "",
        estado: "Activo",
      })
      setPhoneCode("+51-Perú")
      setPhoneNumber("")
      setShowLocalidad(true)
      setAdditionalEmails([])
      setShowAdditionalEmails(false)
    }
  }, [proveedor, open])

  const checkCountrySubdivisions = async (country: string) => {
    if (COUNTRIES_WITH_LEVEL3.includes(country)) {
      setShowLocalidad(true)
    } else {
      setShowLocalidad(false)
    }
  }

  const handleCountryChange = (country: string) => {
    setFormData({
      ...formData,
      pais: country,
      region: "",
      ciudad: "",
      localidad: "",
    })
    checkCountrySubdivisions(country)
  }

  const handleTipoProveedorChange = (tipo: string, checked: boolean) => {
    const currentTipos = formData.tiposProveedor || []
    if (checked) {
      setFormData({ ...formData, tiposProveedor: [...currentTipos, tipo] })
    } else {
      setFormData({ ...formData, tiposProveedor: currentTipos.filter((t) => t !== tipo) })
    }
  }

  const handleAddEmail = () => {
    setAdditionalEmails([...additionalEmails, ""])
  }

  const handleRemoveEmail = (index: number) => {
    const newEmails = additionalEmails.filter((_, i) => i !== index)
    setAdditionalEmails(newEmails)
    if (newEmails.length === 0) {
      setShowAdditionalEmails(false)
    }
  }

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...additionalEmails]
    newEmails[index] = value
    setAdditionalEmails(newEmails)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.tiposProveedor || formData.tiposProveedor.length === 0) {
      alert("Debe seleccionar al menos un tipo de proveedor")
      return
    }
    const fullPhone = phoneNumber ? `${phoneCode.split("-")[0]} ${phoneNumber}` : ""
    const validAdditionalEmails = additionalEmails.filter((email) => email.trim() !== "")
    onSave({
      ...formData,
      telefono: fullPhone,
      emailsAdicionales: validAdditionalEmails.length > 0 ? validAdditionalEmails : undefined,
    })
    onClose()
  }

  return (
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
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl">{proveedor ? "Editar Proveedor" : "Nuevo Proveedor"}</DialogTitle>
              <p className="text-sm text-muted-foreground">Completa la información del proveedor</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Fiscal */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Información Fiscal</h3>
              <Separator className="mt-2" />
            </div>

            {/* País e ID Compañía */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pais">
                  País <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.pais} onValueChange={handleCountryChange} required>
                  <SelectTrigger id="pais">
                    <SelectValue placeholder="Seleccione un país" />
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
                <Label htmlFor="ruc">
                  RUC / Tax ID / KVK <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ruc"
                  placeholder="Ingrese ID fiscal"
                  value={formData.ruc}
                  onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Nombre Empresa */}
            <div className="space-y-2">
              <Label htmlFor="empresa">
                Nombre de la empresa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="empresa"
                placeholder="Nombre completo de la empresa"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Dirección</h3>
              <Separator className="mt-2" />
            </div>

            {/* Región/Estado y Ciudad */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="region">
                    Región / Estado <span className="text-red-500">*</span>
                  </Label>
                  <InfoTooltip text="Región, provincia, departamento o estado" />
                </div>
                <Input
                  id="region"
                  placeholder="Ingrese región o estado"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">
                  Ciudad <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ciudad"
                  placeholder="Ingrese ciudad"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Localidad y Código Postal */}
            <div className="grid grid-cols-2 gap-4">
              {showLocalidad && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor="localidad">Localidad</Label>
                    <InfoTooltip text="Distrito, municipio o comuna" />
                  </div>
                  <Input
                    id="localidad"
                    placeholder="Ingrese localidad"
                    value={formData.localidad}
                    onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="codigoPostal">
                  Código Postal <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="codigoPostal"
                  placeholder="Ingrese código postal"
                  value={formData.codigoPostal}
                  onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Dirección Principal */}
            <div className="space-y-2">
              <Label htmlFor="direccion">
                Dirección Principal <span className="text-red-500">*</span>
              </Label>
              <Input
                id="direccion"
                placeholder="Calle, número, edificio, etc."
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Información de Contacto</h3>
              <Separator className="mt-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contacto">
                Contacto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contacto"
                placeholder="Nombre del contacto"
                value={formData.contacto}
                onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">
                  Teléfono <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select value={phoneCode} onValueChange={setPhoneCode}>
                    <SelectTrigger className="w-[140px]">
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
                    placeholder="Número de teléfono"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Emails */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowAdditionalEmails(!showAdditionalEmails)
                  if (!showAdditionalEmails && additionalEmails.length === 0) {
                    setAdditionalEmails([""])
                  }
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {showAdditionalEmails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span>Agregar más emails (CC)</span>
              </button>

              {showAdditionalEmails && (
                <div className="space-y-3 pl-6 border-l-2 border-border">
                  {additionalEmails.map((email, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <Input
                          type="email"
                          placeholder="email@empresa.com"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEmail(index)}
                        className="h-10 w-10 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddEmail}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar otro email
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Tipos de Proveedor */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Tipos de Proveedor</h3>
              <Separator className="mt-2" />
            </div>
            <div className="space-y-3">
              {TIPOS_PROVEEDOR.map((tipo) => (
                <div key={tipo} className="flex items-center space-x-2">
                  <Checkbox
                    id={tipo}
                    checked={formData.tiposProveedor?.includes(tipo)}
                    onCheckedChange={(checked) => handleTipoProveedorChange(tipo, checked as boolean)}
                  />
                  <Label htmlFor={tipo} className="font-normal cursor-pointer">
                    {tipo}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Datos Bancarios (Opcional) */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Datos Bancarios (Opcional)</h3>
              <Separator className="mt-2" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombreBanco">Nombre del Banco</Label>
                <Input
                  id="nombreBanco"
                  placeholder="Ingrese nombre del banco"
                  value={formData.nombreBanco}
                  onChange={(e) => setFormData({ ...formData, nombreBanco: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroCuenta">Número de Cuenta</Label>
                  <Input
                    id="numeroCuenta"
                    placeholder="Ingrese número de cuenta"
                    value={formData.numeroCuenta}
                    onChange={(e) => setFormData({ ...formData, numeroCuenta: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cci">CCI</Label>
                  <Input
                    id="cci"
                    placeholder="Ingrese CCI"
                    value={formData.cci}
                    onChange={(e) => setFormData({ ...formData, cci: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <Separator />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-black hover:bg-gray-900">
              {proveedor ? "Guardar Cambios" : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
