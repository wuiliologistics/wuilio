"use client"

import { useState } from "react"
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Cliente } from "@/types/cliente"

interface ClientesTableProps {
  clientes: Cliente[]
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onEditCliente: (cliente: Cliente) => void
  onDeleteCliente: (id: string) => void
  onManageNotifies: (cliente: Cliente) => void
}

const statusColors = {
  Activo: "bg-green-100 text-green-700 hover:bg-green-100",
  Inactivo: "bg-gray-100 text-gray-700 hover:bg-gray-100",
}

export function ClientesTable({
  clientes,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onEditCliente,
  onDeleteCliente,
  onManageNotifies,
}: ClientesTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(clientes.length / itemsPerPage)

  const paginatedClientes = clientes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Notifies</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            ) : (
              paginatedClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-normal">{cliente.id}</TableCell>
                  <TableCell>{cliente.empresa}</TableCell>
                  <TableCell>{cliente.pais}</TableCell>
                  <TableCell>{cliente.contacto}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(statusColors[cliente.estado])}>
                      {cliente.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-2 h-8" onClick={() => onManageNotifies(cliente)}>
                      <Users className="h-4 w-4" />
                      {cliente.notifies.length}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditCliente(cliente)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onManageNotifies(cliente)}>Gestionar Notify</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => onDeleteCliente(cliente.id)}>
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
