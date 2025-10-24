import type React from "react"

export default function NuevaOrdenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-full bg-slate-50 p-6">{children}</div>
}
