"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Settings, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Order } from "@/types/order"

interface OrdersTableProps {
  orders: Order[]
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
}

const statusColors = {
  Programado: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Pendiente: "bg-red-100 text-red-700 hover:bg-red-100",
  Completado: "bg-green-100 text-green-700 hover:bg-green-100",
}

export function OrdersTable({
  orders,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
}: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const router = useRouter()

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4 font-light">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID, shipper, consignee o book"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Programado">Programado</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={onTypeFilterChange}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="Marítimo">Marítimo</SelectItem>
            <SelectItem value="Aéreo">Aéreo</SelectItem>
            <SelectItem value="Terrestre">Terrestre</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-8 bg-slate-50" variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>ETD</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Proforma</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Booking</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No se encontraron órdenes
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => router.push(`/ordenes/ver/${order.id}`)}
                >
                  <TableCell className="font-normal">{order.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(statusColors[order.estado as keyof typeof statusColors])}>
                      {order.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.etd}</TableCell>
                  <TableCell>{order.cliente}</TableCell>
                  <TableCell>{order.proforma}</TableCell>
                  <TableCell>{order.destino}</TableCell>
                  <TableCell>{order.booking}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/ordenes/ver/${order.id}`)
                          }}
                        >
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
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
              className={cn(currentPage === pageNum && "bg-blue-600 hover:bg-blue-700")}
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
