"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, ContainerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { type Container, incotermMilestoneRanges, type Incoterm } from "@/types/container"
import TrackingTimeline from "./tracking-timeline"

interface ContainerTrackingItemProps {
  container: Container
  incoterm: string
  onContainerClick?: (lng: number, lat: number) => void
}

export default function ContainerTrackingItem({ container, incoterm, onContainerClick }: ContainerTrackingItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter milestones based on incoterm
  const allowedMilestones = incotermMilestoneRanges[incoterm as Incoterm] || []
  const filteredMilestones = container.milestones.filter((milestone) => allowedMilestones.includes(milestone.type))

  const statusColors = {
    "En Tránsito": "bg-blue-100 text-blue-700 hover:bg-blue-100",
    "En Puerto": "bg-green-100 text-green-700 hover:bg-green-100",
    Entregado: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    Creado: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  }

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (onContainerClick && container.milestones.length > 0) {
      const location = container.milestones[0].coordenadas
      if (location && typeof location.lng === "number" && typeof location.lat === "number") {
        onContainerClick(location.lng, location.lat)
      }
    }
  }

  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={handleCardClick}>
      <CardContent className="p-0">
        <div className="space-y-2 px-4">
          {/* Container header */}
          <div className="flex items-start py-2.5 gap-3 flex-row pb-0">
            <ContainerIcon className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="font-semibold">{container.numero}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>ISO: {container.iso}</span>
                <span>Tara: {container.tara}</span>
              </div>
              <div className="truncate text-sm text-muted-foreground">Precintos: {container.precintos.join(" / ")}</div>
            </div>
            <Badge variant="secondary" className={statusColors[container.estadoActual as keyof typeof statusColors]}>
              {container.estadoActual}
            </Badge>
          </div>

          {/* Expand/Collapse button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="w-full justify-start gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isExpanded ? "Ocultar tracking" : "Ver tracking"}
          </Button>

          {/* Timeline */}
          {isExpanded && (
            <div className="border-l-2 border-border pl-6">
              <TrackingTimeline milestones={filteredMilestones} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
