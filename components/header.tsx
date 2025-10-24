"use client"

import { Bell, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const isNuevaOrden = pathname === "/ordenes/nueva"
  const isClientes = pathname === "/clientes"
  const isProductos = pathname === "/productos"
  const isConfiguraciones = pathname === "/configuraciones"
  const isOrderDetail = pathname.startsWith("/ordenes/ver/")

  if (isConfiguraciones || isOrderDetail) {
    return null
  }

  let title = "Órdenes"
  if (isNuevaOrden) title = "Nueva Orden"
  if (isClientes) title = "Clientes"
  if (isProductos) title = "Productos"

  return (
    <header className="border-border border-none bg-slate-50 px-6 mx-0 gap-0 border-b border-r-0 my-0">
      <div className={isNuevaOrden ? "space-y-2 py-4" : "flex items-center justify-between h-16"}>
        <div className="flex items-center gap-3">
          {isNuevaOrden && (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold py-0 my-0">{title}</h1>
        </div>

        {isNuevaOrden && (
          <p className="text-sm text-muted-foreground pl-11">Completa todos los campos para crear una nueva orden.</p>
        )}

        {!isNuevaOrden && !isClientes && !isProductos && (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>

            <Button onClick={() => router.push("/ordenes/nueva")} className="bg-blue-600 hover:bg-blue-700">
              + Nueva Orden
            </Button>
          </div>
        )}

        {isClientes && (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                const event = new CustomEvent("openClienteModal")
                window.dispatchEvent(event)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              + Nuevo Cliente
            </Button>
          </div>
        )}

        {isProductos && (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                const event = new CustomEvent("openProductoModal")
                window.dispatchEvent(event)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              + Nuevo Producto
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
