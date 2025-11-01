"use client"

import type { Container } from "@/types/container"
import ContainerTrackingItem from "./container-tracking-item"

interface ContainerTrackingListProps {
  contenedores: Container[]
  incoterm: string
  onContainerClick?: (lng: number, lat: number) => void
}

export default function ContainerTrackingList({
  contenedores,
  incoterm,
  onContainerClick,
}: ContainerTrackingListProps) {
  return (
    <div className="space-y-3">
      {contenedores.map((container) => (
        <ContainerTrackingItem
          key={container.id}
          container={container}
          incoterm={incoterm}
          onContainerClick={onContainerClick}
        />
      ))}
    </div>
  )
}
