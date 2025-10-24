export interface Producto {
  id: string
  codigo_producto: string
  descripcion_comercial: string
  formato_comercial: string
  unidades_comerciales_valor: number
  unidad: "m²" | "m³" | "kg" | "TM" | "unidad" | "caja" | "litro"
  pais_origen: string
  hs_code: string
  empaque_base: "Unidad" | "Caja" | "Pallet" | "Big bag" | "Saco" | "Tambor" | "Bin"
  peso_neto_kg: number
  peso_bruto_kg: number
  dimensiones_cm: string
  precio_fob_usd: number
  empaque_secundario: "Paleta" | "Big bag" | "Caja" | "Saco" | "TM" | "m²" | "m³" | "Unidad"
  cantidad_maxima_empaque_secundario: number
  estado: "Activo" | "Inactivo"
}
