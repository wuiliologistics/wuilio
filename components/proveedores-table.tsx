"use client"

import { useState } from "react"
import { Search, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Proveedor } from "@/types/proveedor"

interface ProveedoresTableProps {
  proveedores: Proveedor[]
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onEditProveedor: (proveedor: Proveedor) => void
  onDeleteProveedor: (id: string) => void
}

const statusColors = {
  Activo: "bg-green-100 text-green-700 hover:bg-green-100",
  Inactivo: "bg-gray-100 text-gray-700 hover:bg-gray-100",
}

const TIPO_ABREVIACIONES: Record<string, string> = {
  "Agencia de Carga": "AC",
  "Operador Logístico": "OL",
  "Agencia de Aduanas": "AD",
  Transporte: "TR",
  Almacén: "AL",
}

const TIPO_COLORS: Record<string, string> = {
  "Agencia de Carga": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "Operador Logístico": "bg-purple-100 text-purple-700 hover:bg-purple-100",
  "Agencia de Aduanas": "bg-green-100 text-green-700 hover:bg-green-100",
  Transporte: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  Almacén: "bg-cyan-100 text-cyan-700 hover:bg-cyan-100",
}

const TiposAbbreviated = ({ tipos }: { tipos: string[] }) => (
  <TooltipProvider>
    <div className="flex items-center gap-1">
      {tipos.map((tipo) => (
        <Tooltip key={tipo}>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className={cn("text-xs cursor-help", TIPO_COLORS[tipo])}>
              {TIPO_ABREVIACIONES[tipo] || tipo.substring(0, 2).toUpperCase()}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{tipo}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  </TooltipProvider>
)

export function ProveedoresTable({
  proveedores,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onEditProveedor,
  onDeleteProveedor,
}: ProveedoresTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(proveedores.length / itemsPerPage)

  const paginatedProveedores = proveedores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4 font-light">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por empresa, país o RUC"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Tipos de Proveedor</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px] sticky right-0 bg-card shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProveedores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  No se encontraron proveedores
                </TableCell>
              </TableRow>
            ) : (
              paginatedProveedores.map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell className="font-normal">{proveedor.id}</TableCell>
                  <TableCell>{proveedor.empresa}</TableCell>
                  <TableCell>{proveedor.pais}</TableCell>
                  <TableCell>
                    <TiposAbbreviated tipos={proveedor.tiposProveedor} />
                  </TableCell>
                  <TableCell>{proveedor.contacto}</TableCell>
                  <TableCell>{proveedor.telefono}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(statusColors[proveedor.estado])}>
                      {proveedor.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="sticky right-0 bg-card shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditProveedor(proveedor)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => onDeleteProveedor(proveedor.id)}>
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end flex-row mx-0 my-0 items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum
          if (totalPages <= 5) {
            pageNum = i + 1
          } else if (currentPage <= 3) {
            pageNum = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i
          } else {
            pageNum = currentPage - 2 + i
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "ghost"}
              size="icon"
              onClick={() => setCurrentPage(pageNum)}
              className={cn(currentPage === pageNum && "bg-black hover:bg-gray-800")}
            >
              {pageNum}
            </Button>
          )
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-2">...</span>
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
