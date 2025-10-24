"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Mail, CheckCircle2, FileCheck, Shield } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-3xl">
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0">
            <div className="px-8 text-center bg-white pt-0 pb-7">
              <Image src="/wuilio-pending-logo.svg" alt="Wuilio Logo" width={180} height={60} className="mx-auto my-0" />
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center text-white">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-3 text-3xl font-bold">¡Solicitud Recibida!</h1>
              <p className="mx-auto max-w-md text-lg text-blue-50">
                Tu registro está siendo revisado por nuestro equipo
              </p>
            </div>

            <div className="px-8 py-10 pb-0">
              <div className="rounded-xl bg-blue-50 p-6 mb-3">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <FileCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900">Proceso de Verificación</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Estamos revisando tu información y documentos para garantizar la seguridad de nuestra plataforma.
                      Este proceso generalmente toma entre{" "}
                      <span className="font-semibold text-blue-600">24 a 48 horas</span>.
                    </p>
                  </div>
                </div>
              </div>

              

              
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-slate-500">
          Recibirás actualizaciones en el correo electrónico que registraste.{" "}
          <Link href="/login" className="hover:underline text-foreground font-medium">
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
