"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Order = {
  id: string
  customer: string
  date: string
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  total: number
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return <span>{date.toLocaleDateString()}</span>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
            <Badge variant="outline" className={cn({
                "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300": status === "Pending" || status === "Processing",
                "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300": status === "Shipped",
                "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300": status === "Delivered",
                "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300": status === "Cancelled",
            })}>
                {status}
            </Badge>
        )
    }
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
    }
  },
]
