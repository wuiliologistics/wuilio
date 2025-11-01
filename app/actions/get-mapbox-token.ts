"use server"

export async function getMapboxToken() {
  const token = process.env.MAPBOX_TOKEN

  if (!token || token.trim().length === 0) {
    return null
  }

  // Basic validation: Mapbox tokens start with "pk."
  if (!token.startsWith("pk.")) {
    console.error("[v0] Invalid Mapbox token format - must start with 'pk.'")
    return null
  }

  return token
}
