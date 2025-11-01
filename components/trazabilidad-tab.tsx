"use client"

import { useState, useCallback, useRef } from "react"
import type { Container } from "@/types/container"
import ContainerTrackingList from "./container-tracking-list"
import TrackingMap from "./tracking-map"

interface TrazabilidadTabProps {
  contenedores: Container[]
  incoterm: string
}

export default function TrazabilidadTab({ contenedores, incoterm }: TrazabilidadTabProps) {
  const [mapFlyTo, setMapFlyTo] = useState<((lng: number, lat: number) => void) | null>(null)
  const isFlyingRef = useRef(false)

  const handleMapReady = useCallback((flyTo: (lng: number, lat: number) => void) => {
    setMapFlyTo(() => flyTo)
  }, [])

  const handleContainerClick = useCallback(
    (lng: number, lat: number) => {
      if (mapFlyTo && !isFlyingRef.current) {
        isFlyingRef.current = true
        mapFlyTo(lng, lat)

        setTimeout(() => {
          isFlyingRef.current = false
        }, 2000)
      }
    },
    [mapFlyTo],
  )

  if (!contenedores || contenedores.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border bg-card">
        <p className="text-muted-foreground">No hay contenedores para mostrar</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <TrackingMap contenedores={contenedores} incoterm={incoterm} onMapReady={handleMapReady} />
      </div>

      <div className="w-full">
        <div className="max-h-[500px] overflow-y-auto">
          <ContainerTrackingList
            contenedores={contenedores}
            incoterm={incoterm}
            onContainerClick={handleContainerClick}
          />
        </div>
      </div>
    </div>
  )
}
