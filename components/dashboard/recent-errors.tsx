"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertTriangle } from "lucide-react"

const errors = [
  {
    id: "ORD-7819",
    product: "Nomad Explorer Pass #141",
    error: "Crossmint API timeout - template not found",
    time: "12 min ago",
  },
  {
    id: "ORD-7803",
    product: "Beach Villa Access NFT",
    error: "Recipient wallet address invalid",
    time: "2 hours ago",
  },
  {
    id: "ORD-7798",
    product: "Sunset Lounge Membership",
    error: "Rate limit exceeded - retry after cooldown",
    time: "4 hours ago",
  },
]

export function RecentErrors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <AlertTriangle className="size-4 text-destructive" />
          Recent Errors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {errors.map((error) => (
            <div
              key={error.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {error.product}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {error.id}
                  </span>
                </div>
                <span className="text-xs text-destructive">
                  {error.error}
                </span>
                <span className="text-xs text-muted-foreground">
                  {error.time}
                </span>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <RefreshCw className="size-3" />
                <span>Retry</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
