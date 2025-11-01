"use client"

import type React from "react"

import { ContainerIcon,Package, BoxesIcon,Warehouse, Ship, Anchor } from "lucide-react"
import type { TrackingMilestone, MilestoneType } from "@/types/container"
import { cn } from "@/lib/utils"

interface TrackingTimelineProps {
  milestones: TrackingMilestone[]
}

const milestoneIcons: Record<MilestoneType, React.ReactNode> = {
  deposito_vacios_origen: <ContainerIcon className="h-5 w-5" />,
  planta_origen: <BoxesIcon className="h-5 w-5" />,
  deposito_extraportuario_origen: <Warehouse className="h-5 w-5" />,
  puerto_origen: <Anchor className="h-5 w-5" />,
  nave_1: <Ship className="h-5 w-5" />,
  puerto_transbordo: <Anchor className="h-5 w-5" />,
  nave_2: <Ship className="h-5 w-5" />,
  puerto_destino: <Anchor className="h-5 w-5" />,
  deposito_extraportuario_destino: <Warehouse className="h-5 w-5" />,
  planta_destino: <Warehouse className="h-5 w-5" />,
  deposito_vacios_destino: <Package className="h-5 w-5" />,
}

const statusColors = {
  completado: "bg-green-100 text-green-700",
  en_progreso: "bg-blue-100 text-blue-700",
  estimado: "bg-gray-100 text-gray-500",
  pendiente: "bg-gray-50 text-gray-400",
}

export default function TrackingTimeline({ milestones }: TrackingTimelineProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Tracking</h4>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex gap-3">
            {/* Icon */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                statusColors[milestone.status],
              )}
            >
              {milestoneIcons[milestone.type]}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{milestone.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {milestone.ubicacion}
                    {milestone.codigoPuerto && ` (${milestone.codigoPuerto})`}
                  </p>
                  {milestone.detalles && <p className="text-sm text-muted-foreground">{milestone.detalles}</p>}
                </div>
                <p className="shrink-0 text-sm text-muted-foreground">
                  {milestone.esEstimado && "~"}
                  {milestone.fecha || "Pendiente"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
