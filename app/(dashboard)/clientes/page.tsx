"use client"

import { useState, useEffect } from "react"
import { ClientesTable } from "@/components/clientes-table"
import { ClienteFormModal } from "@/components/cliente-form-modal"
import { NotifyManagementModal } from "@/components/notify-management-modal"
import { mockClientes } from "@/lib/mock-data"
import type { Cliente, Notify } from "@/types/cliente"

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showClienteModal, setShowClienteModal] = useState(false)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)

  useEffect(() => {
    const handleOpenModal = () => {
      setSelectedCliente(null)
      setShowClienteModal(true)
    }

    window.addEventListener("openClienteModal", handleOpenModal)
    return () => window.removeEventListener("openClienteModal", handleOpenModal)
  }, [])

  const filteredClientes = clientes.filter((cliente: Cliente) => {
    const matchesSearch =
      cliente.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.pais.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.ruc.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || cliente.estado === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSaveCliente = (clienteData: Partial<Cliente>) => {
    if (selectedCliente) {
      // Edit existing
      setClientes(clientes.map((c) => (c.id === selectedCliente.id ? { ...c, ...clienteData } : c)))
    } else {
      // Create new
      const newCliente: Cliente = {
        ...clienteData,
        id: `CLI-${String(clientes.length + 1).padStart(3, "0")}`,
        notifies: [],
      } as Cliente
      setClientes([...clientes, newCliente])
    }
    setSelectedCliente(null)
  }

  const handleEditCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setShowClienteModal(true)
  }

  const handleDeleteCliente = (id: string) => {
    if (confirm("¿Está seguro de eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id))
    }
  }

  const handleManageNotifies = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setShowNotifyModal(true)
  }

  const handleSaveNotifies = (clienteId: string, notifies: Notify[]) => {
    setClientes(clientes.map((c) => (c.id === clienteId ? { ...c, notifies } : c)))
  }

  return (
    <div className="space-y-4">
      <ClientesTable
        clientes={filteredClientes}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onEditCliente={handleEditCliente}
        onDeleteCliente={handleDeleteCliente}
        onManageNotifies={handleManageNotifies}
      />

      <ClienteFormModal
        open={showClienteModal}
        onClose={() => {
          setShowClienteModal(false)
          setSelectedCliente(null)
        }}
        onSave={handleSaveCliente}
        cliente={selectedCliente}
      />

      <NotifyManagementModal
        open={showNotifyModal}
        onClose={() => {
          setShowNotifyModal(false)
          setSelectedCliente(null)
        }}
        cliente={selectedCliente}
        onSave={handleSaveNotifies}
      />
    </div>
  )
}
