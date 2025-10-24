"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Cliente, Notify } from "@/types/cliente"

interface NotifyManagementModalProps {
  open: boolean
  onClose: () => void
  cliente: Cliente | null
  onSave: (clienteId: string, notifies: Notify[]) => void
}

export function NotifyManagementModal({ open, onClose, cliente, onSave }: NotifyManagementModalProps) {
  const [notifies, setNotifies] = useState<Notify[]>(cliente?.notifies || [])
  const [editingNotify, setEditingNotify] = useState<Notify | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Notify>>({
    empresaNotify: "",
    pais: "",
    ruc: "",
    direccion: "",
    ciudad: "",
    zipCode: "",
    contacto: "",
    telefono: "",
    email: "",
  })

  const handleAddNotify = () => {
    setEditingNotify(null)
    setFormData({
      empresaNotify: "",
      pais: "",
      ruc: "",
      direccion: "",
      ciudad: "",
      zipCode: "",
      contacto: "",
      telefono: "",
      email: "",
    })
    setShowForm(true)
  }

  const handleEditNotify = (notify: Notify) => {
    setEditingNotify(notify)
    setFormData(notify)
    setShowForm(true)
  }

  const handleSaveNotify = () => {
    if (editingNotify) {
      setNotifies(
        notifies.map((n) => (n.id === editingNotify.id ? ({ ...formData, id: editingNotify.id } as Notify) : n)),
      )
    } else {
      const newNotify: Notify = {
        ...formData,
        id: `NOT-${Date.now()}`,
      } as Notify
      setNotifies([...notifies, newNotify])
    }
    setShowForm(false)
  }

  const handleDeleteNotify = (id: string) => {
    setNotifies(notifies.filter((n) => n.id !== id))
  }

  const handleSaveAll = () => {
    if (cliente) {
      onSave(cliente.id, notifies)
    }
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionar Notify - {cliente?.empresa}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!showForm ? (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Empresas notify configuradas: {notifies.length}</p>
                <Button onClick={handleAddNotify} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Agregar Notify
                </Button>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empresa</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>RUC</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[100px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No hay empresas notify configuradas
                        </TableCell>
                      </TableRow>
                    ) : (
                      notifies.map((notify) => (
                        <TableRow key={notify.id}>
                          <TableCell>{notify.empresaNotify}</TableCell>
                          <TableCell>{notify.pais}</TableCell>
                          <TableCell>{notify.ruc}</TableCell>
                          <TableCell>{notify.contacto}</TableCell>
                          <TableCell>{notify.email}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditNotify(notify)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteNotify(notify.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveAll} className="bg-blue-600 hover:bg-blue-700">
                  Guardar Cambios
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{editingNotify ? "Editar Notify" : "Nuevo Notify"}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresaNotify">Empresa Notify *</Label>
                  <Input
                    id="empresaNotify"
                    value={formData.empresaNotify}
                    onChange={(e) => setFormData({ ...formData, empresaNotify: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paisNotify">País *</Label>
                  <Input
                    id="paisNotify"
                    value={formData.pais}
                    onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rucNotify">RUC *</Label>
                  <Input
                    id="rucNotify"
                    value={formData.ruc}
                    onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccionNotify">Dirección *</Label>
                  <Input
                    id="direccionNotify"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ciudadNotify">Ciudad *</Label>
                  <Input
                    id="ciudadNotify"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCodeNotify">ZIP Code *</Label>
                  <Input
                    id="zipCodeNotify"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactoNotify">Contacto *</Label>
                  <Input
                    id="contactoNotify"
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefonoNotify">Teléfono *</Label>
                  <Input
                    id="telefonoNotify"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailNotify">Email *</Label>
                  <Input
                    id="emailNotify"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveNotify} className="bg-blue-600 hover:bg-blue-700">
                  {editingNotify ? "Guardar Cambios" : "Agregar Notify"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
