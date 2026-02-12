"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  ArrowDownRight,
  Package,
  CheckCircle2,
  XCircle,
  Link2,
} from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "1,284",
    change: "+12.5%",
    trend: "up" as const,
    description: "vs last month",
    icon: Package,
  },
  {
    title: "Mint Success Rate",
    value: "96.8%",
    change: "+2.1%",
    trend: "up" as const,
    description: "vs last month",
    icon: CheckCircle2,
  },
  {
    title: "Failed Mints",
    value: "41",
    change: "-8.3%",
    trend: "down" as const,
    description: "vs last month",
    icon: XCircle,
  },
  {
    title: "Active Mappings",
    value: "23",
    change: "+3",
    trend: "up" as const,
    description: "products linked",
    icon: Link2,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <ArrowUpRight className="size-3 text-success" />
              ) : (
                <ArrowDownRight className="size-3 text-success" />
              )}
              <span className="font-medium text-success">{stat.change}</span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
