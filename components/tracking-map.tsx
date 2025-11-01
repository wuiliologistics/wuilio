"use client"

import { useEffect, useRef, useState } from "react"
import type { Container } from "@/types/container"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, MapPin } from "lucide-react"
import { getMapboxToken } from "@/app/actions/get-mapbox-token"

interface TrackingMapProps {
  contenedores: Container[]
  incoterm: string
  onMapReady?: (flyTo: (lng: number, lat: number) => void) => void
}

export default function TrackingMap({ contenedores, incoterm, onMapReady }: TrackingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mapboxToken, setMapboxToken] = useState<string | null>(null)
  const [isLoadingToken, setIsLoadingToken] = useState(true)

  useEffect(() => {
    const originalOnError = window.onerror

    window.onerror = (message, source, lineno, colno, error) => {
      const errorMessage = message?.toString() || ""

      if (
        errorMessage.includes("Failed to execute 'append' on 'Headers'") ||
        errorMessage.includes("Invalid name") ||
        (source && source.includes("mapbox-gl"))
      ) {
        return true
      }

      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error)
      }
      return false
    }

    return () => {
      window.onerror = originalOnError
    }
  }, [])

  useEffect(() => {
    getMapboxToken()
      .then((token) => {
        if (!token || token.trim().length === 0) {
          setError("Token de Mapbox no configurado")
          setIsLoadingToken(false)
          return
        }

        if (!token.startsWith("pk.")) {
          setError("Token de Mapbox inválido - debe comenzar con 'pk.'")
          setIsLoadingToken(false)
          return
        }

        setMapboxToken(token)
        setIsLoadingToken(false)
      })
      .catch((err) => {
        console.error("[v0] Error fetching Mapbox token:", err)
        setError("Error al obtener el token de Mapbox")
        setIsLoadingToken(false)
      })
  }, [])

  useEffect(() => {
    if (isLoadingToken || !mapboxToken) {
      return
    }

    if (typeof window === "undefined" || !mapContainer.current) return

    import("mapbox-gl")
      .then((mapboxgl) => {
        if (map.current) return

        mapboxgl.default.accessToken = mapboxToken

        const containerLocations = contenedores.map((container) => ({
          container,
          milestone: container.milestones[0],
        }))

        if (containerLocations.length === 0) {
          setError("No hay datos de tracking disponibles")
          return
        }

        const avgLat =
          containerLocations.reduce((sum, item) => sum + item.milestone.coordenadas.lat, 0) / containerLocations.length
        const avgLng =
          containerLocations.reduce((sum, item) => sum + item.milestone.coordenadas.lng, 0) / containerLocations.length

        try {
          map.current = new mapboxgl.default.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [avgLng, avgLat],
            zoom: 13,
            attributionControl: false,
          })

          map.current.on("load", () => {
            setMapLoaded(true)

            const geojsonData = {
              type: "FeatureCollection",
              features: containerLocations.map(({ container, milestone }) => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [milestone.coordenadas.lng, milestone.coordenadas.lat],
                },
                properties: {
                  numero: container.numero,
                  titulo: milestone.titulo,
                  ubicacion: milestone.ubicacion,
                },
              })),
            }

            map.current.addSource("containers", {
              type: "geojson",
              data: geojsonData,
            })

            map.current.addLayer({
              id: "container-markers",
              type: "circle",
              source: "containers",
              paint: {
                "circle-radius": 10,
                "circle-color": "#3B82F6",
                "circle-stroke-width": 3,
                "circle-stroke-color": "#FFFFFF",
              },
            })

            // Add popup on click
            map.current.on("click", "container-markers", (e: any) => {
              const coordinates = e.features[0].geometry.coordinates.slice()
              const { numero, titulo, ubicacion } = e.features[0].properties

              new mapboxgl.default.Popup()
                .setLngLat(coordinates)
                .setHTML(
                  `<div class="p-2">
                    <p class="font-semibold">${numero}</p>
                    <p class="text-sm">${titulo}</p>
                    <p class="text-xs text-gray-600">${ubicacion}</p>
                  </div>`,
                )
                .addTo(map.current)
            })

            // Change cursor on hover
            map.current.on("mouseenter", "container-markers", () => {
              map.current.getCanvas().style.cursor = "pointer"
            })

            map.current.on("mouseleave", "container-markers", () => {
              map.current.getCanvas().style.cursor = ""
            })

            if (onMapReady) {
              const flyToLocation = (lng: number, lat: number) => {
                if (map.current) {
                  map.current.flyTo({
                    center: [lng, lat],
                    zoom: 15,
                    duration: 1500,
                    essential: true,
                  })
                }
              }
              onMapReady(flyToLocation)
            }
          })

          map.current.on("error", (e: any) => {
            if (e.error?.message && !e.error.message.includes("Failed to execute 'append'")) {
              console.error("[v0] Mapbox error:", e)
              setError("Error al cargar el mapa. Verifica tu token de Mapbox.")
            }
          })

          map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right")
        } catch (err) {
          console.error("[v0] Error creating map:", err)
          setError("Error al inicializar el mapa")
        }
      })
      .catch((err) => {
        setError("Error al cargar el mapa. Por favor, verifica tu conexión.")
        console.error("[v0] Error loading mapbox:", err)
      })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [contenedores, incoterm, mapboxToken, isLoadingToken, onMapReady])

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[350px] items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
            <div className="space-y-2">
              <p className="font-semibold">Configuración requerida</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground">
                Agrega tu token de Mapbox como <strong>MAPBOX_TOKEN</strong> en la sección Vars del sidebar.
                <br />
                Obtén un token gratuito en{" "}
                <a
                  href="https://account.mapbox.com/access-tokens/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoadingToken || !mapboxToken) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[350px] items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <MapPin className="h-12 w-12 animate-pulse text-blue-500" />
            <p className="text-sm text-muted-foreground">Cargando mapa...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <CardContent className="p-0">
      <div ref={mapContainer} className="relative h-[350px] w-full overflow-hidden rounded-lg" />
    </CardContent>
  )
}
