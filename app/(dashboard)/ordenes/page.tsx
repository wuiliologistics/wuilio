"use client"

import { useState } from "react"
import { OrdersTable } from "@/components/orders-table"
import { mockOrders } from "@/lib/mock-data"
import type { Order } from "@/types/order"

export default function OrdenesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredOrders = mockOrders.filter((order: Order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.proforma.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.booking.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.estado === statusFilter
    const matchesType = typeFilter === "all" || order.tipo === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-4">
      <OrdersTable
        orders={filteredOrders}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />
    </div>
  )
}
