"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, AlertTriangle } from "lucide-react"
import AppLayout from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"

// Mock inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Dental Floss",
    category: "Hygiene",
    quantity: 5,
    unit: "boxes",
    reorderLevel: 20,
    costPrice: 15.0,
    sellingPrice: 25.0,
    expiryDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Latex Gloves",
    category: "Safety",
    quantity: 10,
    unit: "boxes",
    reorderLevel: 50,
    costPrice: 8.5,
    sellingPrice: 12.0,
    expiryDate: "2024-06-30",
  },
  {
    id: 3,
    name: "Anesthetic",
    category: "Medicine",
    quantity: 3,
    unit: "vials",
    reorderLevel: 10,
    costPrice: 45.0,
    sellingPrice: 60.0,
    expiryDate: "2023-12-15",
  },
  {
    id: 4,
    name: "Dental Cement",
    category: "Materials",
    quantity: 25,
    unit: "tubes",
    reorderLevel: 15,
    costPrice: 12.0,
    sellingPrice: 18.0,
    expiryDate: "2024-08-20",
  },
  {
    id: 5,
    name: "Toothbrushes",
    category: "Hygiene",
    quantity: 120,
    unit: "pieces",
    reorderLevel: 50,
    costPrice: 1.5,
    sellingPrice: 3.0,
    expiryDate: "2025-01-15",
  },
]

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(inventoryItems.map((item) => item.category)))

  // Filter items based on search term and selected category
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-900">Inventory Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Stock Control</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      className="pl-8 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Cost Price</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.quantity} {item.unit}
                          {item.quantity <= item.reorderLevel && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Low
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.reorderLevel}</TableCell>
                      <TableCell>${item.costPrice.toFixed(2)}</TableCell>
                      <TableCell>${item.sellingPrice.toFixed(2)}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

