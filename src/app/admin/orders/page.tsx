"use client";

import { mockOrders } from "@/lib/data";
import { columns, Order } from "./columns";
import { DataTable } from "./data-table";
import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";

async function getOrders(): Promise<Order[]> {
  // In a real app, you would fetch data from a database
  return mockOrders;
}

export default function AdminOrdersPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setData);
  }, []);

  return (
    <div className="container mx-auto py-10">
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">{t('orderManagement')}</h1>
            <p className="text-muted-foreground">{t('orderManagementDescription')}</p>
        </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
