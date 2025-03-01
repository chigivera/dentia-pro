import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  reorderLevel: number
}

export function StockControlSystem() {
  const queryClient = useQueryClient()

  const {
    data: inventory,
    isLoading,
    error,
  } = useQuery<InventoryItem[]>({
    queryKey: ["inventory"],
    queryFn: () => api.get("/api/inventory"),
  })

  const reorderMutation = useMutation({
    mutationFn: (itemId: number) => api.post(`/api/inventory/${itemId}/reorder`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] })
    },
  })

  const handleReorder = (itemId: number) => {
    reorderMutation.mutate(itemId)
  }

  if (isLoading) return <p>Loading inventory...</p>
  if (error)
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Stock Control System</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Reorder Level</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.reorderLevel}</TableCell>
              <TableCell>
                {item.quantity <= item.reorderLevel && (
                  <Button onClick={() => handleReorder(item.id)} disabled={reorderMutation.isPending}>
                    {reorderMutation.isPending ? "Reordering..." : "Reorder"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

