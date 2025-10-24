"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular autenticación
    setTimeout(() => {
      router.push("/ordenes")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex-col justify-between">
        <div className="flex items-center justify-center h-full">
          <div className="max-w-lg">
            <Image src="/wuilio-login-logo.svg" alt="Wuilio Logo" width={320} height={128} className="mb-7" />

            <h1 className="font-bold text-slate-900 mb-6 text-4xl">Bienvenido de vuelta</h1>

            <p className="text-lg text-slate-600 mb-12">
              Accede a tu plataforma de gestión logística y continúa optimizando tus operaciones de comercio exterior.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Image src="/wuilio-login-logo.svg" alt="Wuilio Logo" width={240} height={96} className="mx-auto mb-4" />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Inicia Sesión</h2>
            <p className="text-slate-600">Ingresa a tu cuenta de empresa</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                  Recordar sesión
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm hover:underline text-foreground border-background font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-xl h-12 text-base font-medium" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Ingresar"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <span className="text-slate-600">¿No tienes una cuenta? </span>
            <Link href="/signup" className="hover:underline font-medium text-foreground">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
