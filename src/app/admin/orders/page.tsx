import { mockOrders } from "@/lib/data";
import { columns, Order } from "./columns";
import { DataTable } from "./data-table";

async function getOrders(): Promise<Order[]> {
  // In a real app, you would fetch data from a database
  return mockOrders;
}

export default async function AdminOrdersPage() {
  const data = await getOrders();

  return (
    <div className="container mx-auto py-10">
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Order Management</h1>
            <p className="text-muted-foreground">View and manage all customer orders.</p>
        </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
