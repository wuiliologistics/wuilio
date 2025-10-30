"use client"

import { useState, useEffect } from "react"
import { ProveedoresTable } from "@/components/proveedores-table"
import { ProveedorFormModal } from "@/components/proveedor-form-modal"
import { mockProveedores } from "@/lib/mock-data-proveedores"
import type { Proveedor } from "@/types/proveedor"

export default function LogisticaPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>(mockProveedores)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showProveedorModal, setShowProveedorModal] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null)

  useEffect(() => {
    const handleOpenModal = () => {
      setSelectedProveedor(null)
      setShowProveedorModal(true)
    }

    window.addEventListener("openProveedorModal", handleOpenModal)
    return () => window.removeEventListener("openProveedorModal", handleOpenModal)
  }, [])

  const filteredProveedores = proveedores.filter((proveedor: Proveedor) => {
    const matchesSearch =
      proveedor.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proveedor.pais.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proveedor.ruc.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || proveedor.estado === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSaveProveedor = (proveedorData: Partial<Proveedor>) => {
    if (selectedProveedor) {
      // Edit existing
      setProveedores(proveedores.map((p) => (p.id === selectedProveedor.id ? { ...p, ...proveedorData } : p)))
    } else {
      // Create new
      const newProveedor: Proveedor = {
        ...proveedorData,
        id: `PROV-${String(proveedores.length + 1).padStart(3, "0")}`,
        estado: "Activo",
      } as Proveedor
      setProveedores([...proveedores, newProveedor])
    }
    setSelectedProveedor(null)
  }

  const handleEditProveedor = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor)
    setShowProveedorModal(true)
  }

  const handleDeleteProveedor = (id: string) => {
    if (confirm("¿Está seguro de eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <ProveedoresTable
        proveedores={filteredProveedores}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onEditProveedor={handleEditProveedor}
        onDeleteProveedor={handleDeleteProveedor}
      />

      <ProveedorFormModal
        open={showProveedorModal}
        onClose={() => {
          setShowProveedorModal(false)
          setSelectedProveedor(null)
        }}
        onSave={handleSaveProveedor}
        proveedor={selectedProveedor}
      />
    </div>
  )
}
