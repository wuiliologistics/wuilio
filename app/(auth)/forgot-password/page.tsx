"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular envío de correo
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex-col justify-between">
        <div className="flex items-center justify-center h-full">
          <div className="max-w-lg">
            <Image src="/wuilio-login-logo.svg" alt="Wuilio Logo" width={320} height={128} className="mb-7" />

            <h1 className="font-bold text-slate-900 mb-6 text-4xl">Recupera tu acceso</h1>

            <p className="text-lg text-slate-600 mb-12">
              Te enviaremos un enlace seguro a tu correo electrónico para que puedas restablecer tu contraseña y volver
              a acceder a tu cuenta.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Image src="/wuilio-login-logo.svg" alt="Wuilio Logo" width={240} height={96} className="mx-auto mb-4" />
          </div>

          {/* Back to Login Link */}
          

          {!isSuccess ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">¿Olvidaste tu contraseña?</h2>
                <p className="text-slate-600">
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
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

                {/* Submit Button */}
                <Button type="submit" className="w-full rounded-xl h-12 text-base font-medium" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">¡Correo enviado!</h2>
                <p className="text-slate-600">
                  Hemos enviado un enlace de recuperación a <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-slate-500">
                  Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/login">
                  <Button className="w-full rounded-xl h-12 text-base font-medium">Volver al inicio de sesión</Button>
                </Link>
              </div>

              <div className="text-sm text-slate-600">
                ¿No recibiste el correo?{" "}
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    setEmail("")
                  }}
                  className="font-medium text-foreground hover:underline"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
