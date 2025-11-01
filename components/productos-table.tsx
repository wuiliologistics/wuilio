"use client"

import { useState } from "react"
import { Search, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Producto } from "@/types/producto"

interface ProductosTableProps {
  productos: Producto[]
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onEditProducto: (producto: Producto) => void
  onDeleteProducto: (id: string) => void
}

const statusColors = {
  Activo: "bg-green-100 text-green-700 hover:bg-green-100",
  Inactivo: "bg-gray-100 text-gray-700 hover:bg-gray-100",
}

export function ProductosTable({
  productos,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onEditProducto,
  onDeleteProducto,
}: ProductosTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(productos.length / itemsPerPage)

  const paginatedProductos = productos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4 font-light">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, descripción, HS Code o país"
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
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Precio FOB (USD)</TableHead>
              <TableHead>Peso Bruto (Kg)</TableHead>
              <TableHead>Empaque Base</TableHead>
              <TableHead>Empaque Sec.</TableHead>
              <TableHead>HS Code</TableHead>
              <TableHead>País Origen</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px] sticky right-0 bg-card shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProductos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            ) : (
              paginatedProductos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell className="font-normal">{producto.codigo_producto}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{producto.descripcion_comercial}</TableCell>
                  <TableCell>{producto.unidad}</TableCell>
                  <TableCell>${producto.precio_fob_usd.toFixed(2)}</TableCell>
                  <TableCell>{producto.peso_bruto_kg}</TableCell>
                  <TableCell>{producto.empaque_base}</TableCell>
                  <TableCell>{producto.empaque_secundario}</TableCell>
                  <TableCell>{producto.hs_code}</TableCell>
                  <TableCell>{producto.pais_origen}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(statusColors[producto.estado])}>
                      {producto.estado}
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
                        <DropdownMenuItem onClick={() => onEditProducto(producto)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => onDeleteProducto(producto.id)}>
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
