import { notFound } from "next/navigation"
import OrderDetailClient from "@/components/order-detail-client"
import { getOrderDetail } from "@/lib/mock-order-detail"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrderDetail(id)

  if (!order) {
    notFound()
  }

  return <OrderDetailClient order={order} />
}
