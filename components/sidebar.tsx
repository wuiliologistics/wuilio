"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Radio,
  Calendar,
  FileText,
  Receipt,
  Container,
  Box,
  PanelLeft,
  Users,
  Truck,
  Factory,
  Settings,
  LogOut,
  Plus,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ConfiguracionesModal } from "@/components/configuraciones-modal"
import Image from "next/image"

const navigation = [
  {
    title: "Operaciones",
    items: [
      { name: "Control Tower", href: "/control-tower", icon: Radio },
      { name: "Órdenes", href: "/ordenes", icon: Container },
      { name: "Programación", href: "/programacion", icon: Calendar },
    ],
  },
  {
    title: "Finanzas",
    items: [
      { name: "Facturas", href: "/facturas", icon: FileText },
      { name: "Tarifario", href: "/tarifario", icon: Receipt },
    ],
  },
  {
    title: "Maestro",
    items: [
      { name: "Clientes", href: "/clientes", icon: Users },
      { name: "Logística", href: "/logistica", icon: Truck },
      { name: "Plantas", href: "/plantas", icon: Factory },
      { name: "Productos", href: "/productos", icon: Box },
    ],
  },
]

const companies = [
  { id: "wuilio-peru", name: "WUILIO PERU S.A.C.", status: "approved" },
  { id: "global-bridge", name: "GLOBAL BRIDGE S.A.C.", status: "approved" },
  { id: "nueva-empresa", name: "NUEVA EMPRESA S.A.C.", status: "pending" },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [company, setCompany] = useState("wuilio-peru")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleToggleCollapse = () => {
    setIsTransitioning(true)
    setIsCollapsed(!isCollapsed)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }

  const handleRegisterCompany = () => {
    router.push("/registrar-empresa")
  }

  return (
    <>
      <aside
        className={cn("border-r border-border bg-card transition-all duration-300", isCollapsed ? "w-16" : "w-64")}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div
            className={cn(
              "flex h-16 items-center border-b border-none border-foreground",
              isCollapsed ? "justify-center" : "justify-between px-6",
            )}
          >
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Image
                  src="/wuilio-logo.svg"
                  alt="Wuilio Logo"
                  width={100}
                  height={40}
                  className="w-auto object-contain h-16 mx-[-8px]"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleCollapse}
              className={cn("shrink-0 h-10 w-10 mx-[-15px]", isCollapsed && "mx-0")}
            >
              {isCollapsed ? (
                <Image src="/wuilio-icon.png" alt="Expand" width={20} height={20} className="object-contain size-12" />
              ) : (
                <PanelLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="border-b border-border p-4 border-none">
              <Select
                value={company}
                onValueChange={(value) => {
                  if (value === "register-new") {
                    handleRegisterCompany()
                  } else {
                    setCompany(value)
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((comp) => (
                    <SelectItem
                      key={comp.id}
                      value={comp.id}
                      disabled={comp.status === "pending"}
                      className={cn(comp.status === "pending" && "text-muted-foreground opacity-60")}
                    >
                      <div className="flex items-center">
                        {comp.status === "pending" && <Clock className="mr-2 h-4 w-4" />}
                        {comp.name}
                      </div>
                    </SelectItem>
                  ))}
                  <SelectSeparator />
                  <SelectItem value="register-new" className="text-blue-600 font-medium">
                    <div className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      Registrar Empresa
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Navigation */}
          <TooltipProvider delayDuration={300}>
            <nav className="flex-1 space-y-6 overflow-y-auto p-4 border-none my-1">
              {navigation.map((section) => (
                <div key={section.title}>
                  {!isCollapsed && (
                    <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.title}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname.startsWith(item.href)

                      return (
                        <li key={item.name}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                  isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                                  isCollapsed && "justify-center px-2",
                                )}
                              >
                                <Icon className="shrink-0 size-5" />
                                {!isCollapsed && item.name}
                              </Link>
                            </TooltipTrigger>
                            {isCollapsed && !isTransitioning && (
                              <TooltipContent
                                side="right"
                                className="px-3 py-2 bg-slate-900 text-white border-slate-800 rounded-lg shadow-lg [&>svg]:hidden"
                                sideOffset={12}
                              >
                                {item.name}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </TooltipProvider>

          {/* User Section */}
          <div className="border-t border-border p-4">
            <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent",
                    isCollapsed && "justify-center",
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shrink-0">
                    JM
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 text-left text-sm">
                      <p className="font-medium text-foreground">Juan Maldonado</p>
                      <p className="text-xs text-muted-foreground">Wuilio Workspace</p>
                    </div>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-64 p-0 bg-[#1f1f1f] border-[#2a2a2a] rounded-xl shadow-xl"
              >
                <div className="p-4">
                  <p className="text-sm text-gray-300">juan.maldonado@wuilio.com</p>
                </div>
                <Separator className="bg-[#2a2a2a]" />
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      setIsSettingsOpen(true)
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-200 transition-colors hover:bg-[#2a2a2a]"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configuraciones</span>
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-200 transition-colors hover:bg-[#2a2a2a]">
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      <ConfiguracionesModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  )
}
