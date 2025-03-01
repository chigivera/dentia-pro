import { render, screen, waitFor } from "@testing-library/react"
import { StockControlSystem } from "../StockControlSystem"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Mock the API
jest.mock("@/lib/api", () => ({
  api: {
    get: jest.fn(() =>
      Promise.resolve([{ id: 1, name: "Test Item", category: "Test", quantity: 10, unit: "pcs", reorderLevel: 5 }]),
    ),
  },
}))

describe("StockControlSystem", () => {
  it("renders the inventory items", async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <StockControlSystem />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Test Item")).toBeInTheDocument()
      expect(screen.getByText("10")).toBeInTheDocument()
      expect(screen.getByText("pcs")).toBeInTheDocument()
    })
  })
})

