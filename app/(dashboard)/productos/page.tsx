"use client"

import { useState, useEffect } from "react"
import { ProductosTable } from "@/components/productos-table"
import { ProductoFormModal } from "@/components/producto-form-modal"
import { mockProductos } from "@/lib/mock-data-productos"
import type { Producto } from "@/types/producto"

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>(mockProductos)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showProductoModal, setShowProductoModal] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)

  useEffect(() => {
    const handleOpenModal = () => {
      setSelectedProducto(null)
      setShowProductoModal(true)
    }

    window.addEventListener("openProductoModal", handleOpenModal)
    return () => window.removeEventListener("openProductoModal", handleOpenModal)
  }, [])

  const filteredProductos = productos.filter((producto: Producto) => {
    const matchesSearch =
      producto.codigo_producto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.descripcion_comercial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.hs_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.pais_origen.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || producto.estado === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSaveProducto = (productoData: Partial<Producto>) => {
    if (selectedProducto) {
      // Edit existing
      setProductos(productos.map((p) => (p.id === selectedProducto.id ? { ...p, ...productoData } : p)))
    } else {
      // Create new
      const newProducto: Producto = {
        ...productoData,
        id: `PROD-${String(productos.length + 1).padStart(3, "0")}`,
        estado: "Activo",
      } as Producto
      setProductos([...productos, newProducto])
    }
    setSelectedProducto(null)
  }

  const handleEditProducto = (producto: Producto) => {
    setSelectedProducto(producto)
    setShowProductoModal(true)
  }

  const handleDeleteProducto = (id: string) => {
    if (confirm("¿Está seguro de eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <ProductosTable
        productos={filteredProductos}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onEditProducto={handleEditProducto}
        onDeleteProducto={handleDeleteProducto}
      />

      <ProductoFormModal
        open={showProductoModal}
        onClose={() => {
          setShowProductoModal(false)
          setSelectedProducto(null)
        }}
        onSave={handleSaveProducto}
        producto={selectedProducto}
      />
    </div>
  )
}
