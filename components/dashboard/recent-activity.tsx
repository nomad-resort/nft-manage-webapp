"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD-7821",
    product: "Nomad Explorer Pass #142",
    recipient: "alex@example.com",
    status: "success" as const,
    time: "2 min ago",
  },
  {
    id: "ORD-7820",
    product: "Beach Villa Access NFT",
    recipient: "0x1a2b...9f3d",
    status: "success" as const,
    time: "5 min ago",
  },
  {
    id: "ORD-7819",
    product: "Nomad Explorer Pass #141",
    recipient: "sarah@example.com",
    status: "error" as const,
    time: "12 min ago",
  },
  {
    id: "ORD-7818",
    product: "Sunset Lounge Membership",
    recipient: "mike@example.com",
    status: "success" as const,
    time: "18 min ago",
  },
  {
    id: "ORD-7817",
    product: "Beach Villa Access NFT",
    recipient: "0x8c4e...2a1b",
    status: "success" as const,
    time: "25 min ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Mint Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {order.product}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {order.id}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {"To: "}{order.recipient}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={order.status === "success" ? "default" : "destructive"}
                  className={
                    order.status === "success"
                      ? "bg-success/10 text-success hover:bg-success/20 border-0"
                      : ""
                  }
                >
                  {order.status === "success" ? "Success" : "Failed"}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {order.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
