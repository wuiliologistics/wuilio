"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, Upload, Building2, UserCheck, FileText, CheckCircle2 } from "lucide-react"
import { COUNTRIES_WORLD } from "@/lib/countries"
import { Checkbox } from "@/components/ui/checkbox"

const STEPS = [
  { id: 1, title: "Empresa", description: "Datos de la empresa", icon: Building2 },
  { id: 2, title: "Representante Legal", description: "Información del representante", icon: UserCheck },
  { id: 3, title: "Documentos", description: "Documentación requerida", icon: FileText },
  { id: 4, title: "Confirmación", description: "Revisar información", icon: CheckCircle2 },
]

const COMPANY_TYPES = [
  "Exportador",
  "Importador",
  "Agente de Aduana",
  "Transporte",
  "Operador Logístico",
  "Depósito Temporal",
  "Almacén",
]

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
  "Islas Marshall",
  "Islas Salomón",
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

const COUNTRIES_WITH_LEVEL_3 = [
  "Perú",
  "Chile",
  "Colombia",
  "México",
  "Argentina",
  "Brasil",
  "Ecuador",
  "Bolivia",
  "Venezuela",
  "Paraguay",
  "Uruguay",
  "Panamá",
  "Costa Rica",
  "Guatemala",
  "Honduras",
  "Nicaragua",
  "El Salvador",
  "República Dominicana",
  "España",
  "Italia",
  "Francia",
]

interface CompanyFormData {
  empresa: {
    empresa: string
    ruc: string
    pais: string
    tipoEmpresa: string[]
    region: string
    ciudad: string
    localidad: string
    direccion: string
    codigoPostal: string
  }
  representante: {
    nombre: string
    documento: string
    paisNacimiento: string
    celular: string
    correo: string
  }
  documentos: {
    fichaRuc?: File
    vigenciaPoder?: File
    documentoIdentidad?: File
  }
}

export default function RegistrarEmpresaPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showLocalidad, setShowLocalidad] = useState(true)

  const [formData, setFormData] = useState<CompanyFormData>({
    empresa: {
      empresa: "",
      ruc: "",
      pais: "",
      tipoEmpresa: [],
      region: "",
      ciudad: "",
      localidad: "",
      direccion: "",
      codigoPostal: "",
    },
    representante: {
      nombre: "",
      documento: "",
      paisNacimiento: "",
      celular: "",
      correo: "",
    },
    documentos: {},
  })

  const [repPhoneCountryCode, setRepPhoneCountryCode] = useState("+51")

  const checkCountrySubdivisions = (countryName: string) => {
    const hasLevel3 = COUNTRIES_WITH_LEVEL_3.includes(countryName)
    setShowLocalidad(hasLevel3)
  }

  const progress = (currentStep / STEPS.length) * 100
  const CurrentStepIcon = STEPS[currentStep - 1].icon

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push("/pending-approval")
    }, 1500)
  }

  const handleFileUpload = (field: keyof CompanyFormData["documentos"], file: File | undefined) => {
    setFormData({
      ...formData,
      documentos: {
        ...formData.documentos,
        [field]: file,
      },
    })
  }

  const handleCompanyTypeChange = (type: string, checked: boolean) => {
    setFormData({
      ...formData,
      empresa: {
        ...formData.empresa,
        tipoEmpresa: checked
          ? [...formData.empresa.tipoEmpresa, type]
          : formData.empresa.tipoEmpresa.filter((t) => t !== type),
      },
    })
  }

  const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600">
        i
      </div>
      <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden w-48 -translate-x-1/2 rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
        {text}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 items-center justify-center">
            <Image
              src="/wuilio-signup-logo.svg"
              alt="Wuilio Logo"
              width={120}
              height={48}
              className="w-auto object-contain h-32"
            />
          </div>
          <h1 className="text-3xl font-bold">Registrar Nueva Empresa</h1>
          <p className="mt-2 text-muted-foreground">Completa la información de la empresa para asociarla a tu cuenta</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep > step.id
                      ? "border-blue-600 bg-blue-600 text-white"
                      : currentStep === step.id
                        ? "border-blue-600 bg-white text-blue-600"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-0.5 w-12 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-background bg-ring">
                <CurrentStepIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{STEPS[currentStep - 1].title}</h3>
                <p className="text-sm text-muted-foreground">{STEPS[currentStep - 1].description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Step 1: Empresa */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Nombre de Empresa *</Label>
                    <Input
                      id="empresa"
                      value={formData.empresa.empresa}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, empresa: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruc">RUC *</Label>
                    <Input
                      id="ruc"
                      value={formData.empresa.ruc}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, ruc: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Tipo de Empresa * (Puedes seleccionar más de uno)</Label>
                    <div className="grid grid-cols-2 gap-3 rounded-lg border p-4">
                      {COMPANY_TYPES.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`company-type-${type}`}
                            checked={formData.empresa.tipoEmpresa.includes(type)}
                            onCheckedChange={(checked) => handleCompanyTypeChange(type, checked as boolean)}
                          />
                          <label
                            htmlFor={`company-type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="pais">País *</Label>
                    <Select
                      value={formData.empresa.pais}
                      onValueChange={(value) => {
                        checkCountrySubdivisions(value)
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, pais: value },
                        })
                      }}
                    >
                      <SelectTrigger id="pais" className="w-full">
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
                    <Label htmlFor="region" className="flex items-center gap-2">
                      Región / Estado *
                      <InfoTooltip text="Región, provincia, departamento o estado" />
                    </Label>
                    <Input
                      id="region"
                      value={formData.empresa.region}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, region: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad *</Label>
                    <Input
                      id="ciudad"
                      placeholder="Ingrese ciudad"
                      value={formData.empresa.ciudad}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, ciudad: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  {showLocalidad && (
                    <div className="space-y-2">
                      <Label htmlFor="localidad" className="flex items-center gap-2">
                        Localidad *
                        <InfoTooltip text="Distrito, municipio o comuna" />
                      </Label>
                      <Input
                        id="localidad"
                        value={formData.empresa.localidad}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            empresa: { ...formData.empresa, localidad: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="codigoPostal">Código Postal *</Label>
                    <Input
                      id="codigoPostal"
                      value={formData.empresa.codigoPostal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, codigoPostal: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="direccion">Dirección Principal *</Label>
                    <Input
                      id="direccion"
                      value={formData.empresa.direccion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, direccion: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Representante Legal */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="repNombre">Nombres y Apellidos *</Label>
                    <Input
                      id="repNombre"
                      value={formData.representante.nombre}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          representante: { ...formData.representante, nombre: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repDocumento">Documento *</Label>
                    <Input
                      id="repDocumento"
                      value={formData.representante.documento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          representante: { ...formData.representante, documento: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repPaisNacimiento">País de Nacimiento *</Label>
                    <Select
                      value={formData.representante.paisNacimiento}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          representante: { ...formData.representante, paisNacimiento: value },
                        })
                      }
                    >
                      <SelectTrigger id="repPaisNacimiento" className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES_WORLD.map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repCelular">Celular *</Label>
                    <div className="flex gap-2">
                      <Select value={repPhoneCountryCode} onValueChange={setRepPhoneCountryCode}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES_WORLD.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="repCelular"
                        type="tel"
                        className="flex-1"
                        value={formData.representante.celular}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            representante: { ...formData.representante, celular: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repCorreo">Correo *</Label>
                    <Input
                      id="repCorreo"
                      type="email"
                      value={formData.representante.correo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          representante: { ...formData.representante, correo: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documentos */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-lg border border-dashed border-gray-300 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">Ficha RUC</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.documentos.fichaRuc ? formData.documentos.fichaRuc.name : "PDF, máximo 5MB"}
                        </p>
                      </div>
                      <input
                        type="file"
                        id="fichaRuc"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload("fichaRuc", e.target.files?.[0])}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("fichaRuc")?.click()}
                        type="button"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {formData.documentos.fichaRuc ? "Cambiar" : "Subir"}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-gray-300 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">Vigencia de Poder</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.documentos.vigenciaPoder
                            ? formData.documentos.vigenciaPoder.name
                            : "PDF, máximo 5MB"}
                        </p>
                      </div>
                      <input
                        type="file"
                        id="vigenciaPoder"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload("vigenciaPoder", e.target.files?.[0])}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("vigenciaPoder")?.click()}
                        type="button"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {formData.documentos.vigenciaPoder ? "Cambiar" : "Subir"}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-gray-300 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">Documento de Identidad (Representante Legal)</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.documentos.documentoIdentidad
                            ? formData.documentos.documentoIdentidad.name
                            : "PDF, máximo 5MB"}
                        </p>
                      </div>
                      <input
                        type="file"
                        id="documentoIdentidad"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload("documentoIdentidad", e.target.files?.[0])}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("documentoIdentidad")?.click()}
                        type="button"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {formData.documentos.documentoIdentidad ? "Cambiar" : "Subir"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmación */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Empresa</h4>
                    <div className="rounded-lg border p-4 text-sm">
                      <p>
                        <span className="text-muted-foreground">Empresa:</span> {formData.empresa.empresa}
                      </p>
                      <p>
                        <span className="text-muted-foreground">RUC:</span> {formData.empresa.ruc}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Tipo de Empresa:</span>{" "}
                        {formData.empresa.tipoEmpresa.join(", ")}
                      </p>
                      <p>
                        <span className="text-muted-foreground">País:</span> {formData.empresa.pais}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Región/Estado:</span> {formData.empresa.region}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Ciudad:</span> {formData.empresa.ciudad}
                      </p>
                      {showLocalidad && (
                        <p>
                          <span className="text-muted-foreground">Localidad:</span> {formData.empresa.localidad}
                        </p>
                      )}
                      <p>
                        <span className="text-muted-foreground">Código Postal:</span> {formData.empresa.codigoPostal}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Dirección Principal:</span> {formData.empresa.direccion}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Representante Legal</h4>
                    <div className="rounded-lg border p-4 text-sm">
                      <p>
                        <span className="text-muted-foreground">Nombre:</span> {formData.representante.nombre}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Documento:</span> {formData.representante.documento}
                      </p>
                      <p>
                        <span className="text-muted-foreground">País de Nacimiento:</span>{" "}
                        {formData.representante.paisNacimiento}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Celular:</span> {repPhoneCountryCode}{" "}
                        {formData.representante.celular}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Correo:</span> {formData.representante.correo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Registrar Empresa"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
