"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Settings, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  onOrderUpdate: (order: Order) => void
}

const statusColors = {
  Borrador: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  Creado: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Programado: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "En progreso": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Completado: "bg-green-100 text-green-700 hover:bg-green-100",
  Cancelado: "bg-slate-100 text-slate-700 hover:bg-slate-100",
}

export function OrdersTable({
  orders,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onOrderUpdate,
}: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null)
  const [cancellationReason, setCancellationReason] = useState("")

  const itemsPerPage = 10
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const router = useRouter()

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleCancelClick = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation()
    setOrderToCancel(order)
    setCancelModalOpen(true)
  }

  const handleConfirmCancel = () => {
    if (orderToCancel && cancellationReason.trim()) {
      const updatedOrder: Order = {
        ...orderToCancel,
        estado: "Cancelado",
        motivoCancelacion: cancellationReason,
      }

      onOrderUpdate(updatedOrder)

      setCancelModalOpen(false)
      setOrderToCancel(null)
      setCancellationReason("")
    }
  }

  const handleCloseCancelModal = () => {
    setCancelModalOpen(false)
    setOrderToCancel(null)
    setCancellationReason("")
  }

  const handleDeleteDraft = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement delete draft functionality
    console.log("[v0] Delete draft:", order.id)
  }

  const handleEditDraft = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/ordenes/nueva?draft=${order.id}`)
  }

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
            <SelectItem value="Borrador">Borrador</SelectItem>
            <SelectItem value="Creado">Creado</SelectItem>
            <SelectItem value="Programado">Programado</SelectItem>
            <SelectItem value="En progreso">En progreso</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
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
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
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
              <TableHead className="w-[50px] sticky right-0 bg-background shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]"></TableHead>
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
                  <TableCell className="sticky right-0 bg-background shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {order.estado === "Borrador" ? (
                          <>
                            <DropdownMenuItem onClick={(e) => handleEditDraft(order, e)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={(e) => handleDeleteDraft(order, e)}>
                              Eliminar
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/ordenes/ver/${order.id}`)
                              }}
                            >
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Editar</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => handleCancelClick(order, e)}
                              disabled={order.estado === "Completado"}
                            >
                              Cancelar
                            </DropdownMenuItem>
                          </>
                        )}
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

      {/* Cancel Order Modal */}
      <Dialog open={cancelModalOpen} onOpenChange={handleCloseCancelModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cancelar Orden</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas cancelar la orden {orderToCancel?.id}? Por favor, proporciona un motivo para
              la cancelación.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancellation-reason">
                Motivo de cancelación <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="cancellation-reason"
                placeholder="Describe el motivo de la cancelación..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseCancelModal}>
              Volver
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel} disabled={!cancellationReason.trim()}>
              Confirmar cancelación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
