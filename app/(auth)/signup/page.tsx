"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  User,
  Building2,
  UserCheck,
  FileText,
  CheckCircle2,
  Info,
} from "lucide-react"
import type { SignupFormData } from "@/types/auth"
import { COUNTRIES_WORLD } from "@/lib/countries"
import { Checkbox } from "@/components/ui/checkbox"

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
  "El Salvador",
]

function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-block">
      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
      <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 rounded-md bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md border z-50">
        {text}
        <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-popover" />
      </div>
    </div>
  )
}

const STEPS = [
  { id: 1, title: "Usuario Master", description: "Información personal", icon: User },
  { id: 2, title: "Empresa", description: "Datos de la empresa", icon: Building2 },
  { id: 3, title: "Representante Legal", description: "Información del representante", icon: UserCheck },
  { id: 4, title: "Documentos", description: "Documentación requerida", icon: FileText },
  { id: 5, title: "Confirmación", description: "Revisar información", icon: CheckCircle2 },
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

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showLocalidad, setShowLocalidad] = useState(true)

  const [formData, setFormData] = useState<SignupFormData>({
    usuario: {
      nombreCompleto: "",
      documento: "",
      nacionalidad: "",
      contacto: "",
      cargo: "",
      correo: "",
      password: "",
    },
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

  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneCountryCode, setPhoneCountryCode] = useState("+51")
  const [repPhoneCountryCode, setRepPhoneCountryCode] = useState("+51")

  const progress = (currentStep / STEPS.length) * 100
  const CurrentStepIcon = STEPS[currentStep - 1].icon

  const checkCountrySubdivisions = async (countryName: string) => {
    try {
      if (COUNTRIES_WITH_LEVEL3.includes(countryName)) {
        setShowLocalidad(true)
      } else {
        setShowLocalidad(false)
      }
    } catch (error) {
      console.error("Error checking country subdivisions:", error)
      setShowLocalidad(true)
    }
  }

  useEffect(() => {
    if (formData.empresa.pais) {
      checkCountrySubdivisions(formData.empresa.pais)
    }
  }, [formData.empresa.pais])

  const isStep1Valid = () => {
    const { nombreCompleto, documento, nacionalidad, contacto, cargo, correo, password } = formData.usuario
    return (
      nombreCompleto.trim() !== "" &&
      documento.trim() !== "" &&
      nacionalidad.trim() !== "" &&
      contacto.trim() !== "" &&
      cargo.trim() !== "" &&
      correo.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword
    )
  }

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid()) {
      alert("Por favor completa todos los campos requeridos y asegúrate de que las contraseñas coincidan.")
      return
    }

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
    // Simular envío de formulario
    setTimeout(() => {
      router.push("/pending-approval")
    }, 1500)
  }

  const handleFileUpload = (field: keyof SignupFormData["documentos"], file: File | undefined) => {
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

          <p className="mt-2 text-muted-foreground">Completa el registro para acceder a la plataforma</p>
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
            {/* Step 1: Usuario Master */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombreCompleto">Nombres y Apellidos *</Label>
                    <Input
                      id="nombreCompleto"
                      value={formData.usuario.nombreCompleto}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usuario: { ...formData.usuario, nombreCompleto: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documento">Documento *</Label>
                    <Input
                      id="documento"
                      value={formData.usuario.documento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usuario: { ...formData.usuario, documento: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nacionalidad">País de Nacimiento *</Label>
                    <Select
                      value={formData.usuario.nacionalidad}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          usuario: { ...formData.usuario, nacionalidad: value },
                        })
                      }
                    >
                      <SelectTrigger id="nacionalidad" className="w-full">
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
                    <Label htmlFor="telefono">Celular *</Label>
                    <div className="flex gap-2">
                      <Select value={phoneCountryCode} onValueChange={setPhoneCountryCode}>
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
                        id="telefono"
                        type="tel"
                        className="flex-1"
                        value={formData.usuario.contacto}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            usuario: { ...formData.usuario, contacto: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo en empresa *</Label>
                    <Input
                      id="cargo"
                      value={formData.usuario.cargo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usuario: { ...formData.usuario, cargo: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo *</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={formData.usuario.correo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usuario: { ...formData.usuario, correo: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.usuario.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usuario: { ...formData.usuario, password: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Empresa */}
            {currentStep === 2 && (
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
                      placeholder="Ingrese región o estado"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad *</Label>
                    <Input
                      id="ciudad"
                      value={formData.empresa.ciudad}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          empresa: { ...formData.empresa, ciudad: e.target.value },
                        })
                      }
                      placeholder="Ingrese ciudad"
                      required
                    />
                  </div>

                  {showLocalidad && (
                    <div className="space-y-2">
                      <Label htmlFor="localidad" className="flex items-center gap-2">
                        Localidad
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
                        placeholder="Ingrese localidad"
                      />
                    </div>
                  )}

                  <div className={`space-y-2 ${showLocalidad ? "" : "md:col-span-1"}`}>
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
                      placeholder="Ingrese código postal"
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
                      placeholder="Calle, número, edificio, etc."
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Representante Legal */}
            {currentStep === 3 && (
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

            {/* Step 4: Documentos */}
            {currentStep === 4 && (
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

            {/* Step 5: Confirmación */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Usuario Master</h4>
                    <div className="rounded-lg border p-4 text-sm">
                      <p>
                        <span className="text-muted-foreground">Nombre:</span> {formData.usuario.nombreCompleto}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Documento:</span> {formData.usuario.documento}
                      </p>
                      <p>
                        <span className="text-muted-foreground">País de Nacimiento:</span>{" "}
                        {formData.usuario.nacionalidad}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Celular:</span> {phoneCountryCode}{" "}
                        {formData.usuario.contacto}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Cargo:</span> {formData.usuario.cargo}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Correo:</span> {formData.usuario.correo}
                      </p>
                    </div>
                  </div>

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
                      {showLocalidad && formData.empresa.localidad && (
                        <p>
                          <span className="text-muted-foreground">Localidad:</span> {formData.empresa.localidad}
                        </p>
                      )}
                      <p>
                        <span className="text-muted-foreground">Código Postal:</span> {formData.empresa.codigoPostal}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Dirección:</span> {formData.empresa.direccion}
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
                  {isLoading ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {currentStep === 1 && (
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">¿Ya tienes una cuenta? </span>
            <Link href="/login" className="hover:underline text-foreground font-medium">
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
