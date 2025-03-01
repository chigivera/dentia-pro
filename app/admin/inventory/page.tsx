import dynamic from "next/dynamic"

const StockControlSystem = dynamic(() => import("@/components/inventory/StockControlSystem"), {
  loading: () => <p>Loading inventory management...</p>,
})

export default function InventoryPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
      <StockControlSystem />
    </div>
  )
}

