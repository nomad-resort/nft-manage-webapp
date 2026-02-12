"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RefreshCw,
  Search,
  Mail,
  Wallet,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type MintStatus = "success" | "error" | "pending"

type Order = {
  id: string
  shopifyOrderId: string
  productName: string
  recipientType: "email" | "wallet"
  recipient: string
  status: MintStatus
  errorMessage?: string
  crossmintActionId?: string
  createdAt: string
}

const orders: Order[] = [
  {
    id: "1",
    shopifyOrderId: "ORD-7821",
    productName: "Nomad Explorer Pass #142",
    recipientType: "email",
    recipient: "alex@example.com",
    status: "success",
    crossmintActionId: "act_abc123",
    createdAt: "2026-02-13 14:32",
  },
  {
    id: "2",
    shopifyOrderId: "ORD-7820",
    productName: "Beach Villa Access NFT",
    recipientType: "wallet",
    recipient: "0x1a2b3c4d5e6f...9f3d",
    status: "success",
    crossmintActionId: "act_def456",
    createdAt: "2026-02-13 14:28",
  },
  {
    id: "3",
    shopifyOrderId: "ORD-7819",
    productName: "Nomad Explorer Pass #141",
    recipientType: "email",
    recipient: "sarah@example.com",
    status: "error",
    errorMessage: "Crossmint API timeout - template not found",
    createdAt: "2026-02-13 14:21",
  },
  {
    id: "4",
    shopifyOrderId: "ORD-7818",
    productName: "Sunset Lounge Membership",
    recipientType: "email",
    recipient: "mike@example.com",
    status: "success",
    crossmintActionId: "act_ghi789",
    createdAt: "2026-02-13 14:15",
  },
  {
    id: "5",
    shopifyOrderId: "ORD-7817",
    productName: "Beach Villa Access NFT",
    recipientType: "wallet",
    recipient: "0x8c4e7d2a1b...2a1b",
    status: "success",
    crossmintActionId: "act_jkl012",
    createdAt: "2026-02-13 14:08",
  },
  {
    id: "6",
    shopifyOrderId: "ORD-7816",
    productName: "Island Hopper Bundle",
    recipientType: "email",
    recipient: "emma@example.com",
    status: "pending",
    createdAt: "2026-02-13 14:02",
  },
  {
    id: "7",
    shopifyOrderId: "ORD-7815",
    productName: "Wellness Retreat Token",
    recipientType: "email",
    recipient: "james@example.com",
    status: "success",
    crossmintActionId: "act_mno345",
    createdAt: "2026-02-13 13:55",
  },
  {
    id: "8",
    shopifyOrderId: "ORD-7814",
    productName: "Nomad Explorer Pass #140",
    recipientType: "wallet",
    recipient: "0x3f5a8b9c1d...7e2f",
    status: "error",
    errorMessage: "Recipient wallet address invalid",
    createdAt: "2026-02-13 13:48",
  },
  {
    id: "9",
    shopifyOrderId: "ORD-7813",
    productName: "Sunset Lounge Membership",
    recipientType: "email",
    recipient: "olivia@example.com",
    status: "success",
    crossmintActionId: "act_pqr678",
    createdAt: "2026-02-13 13:40",
  },
  {
    id: "10",
    shopifyOrderId: "ORD-7812",
    productName: "Beach Villa Access NFT",
    recipientType: "email",
    recipient: "david@example.com",
    status: "success",
    crossmintActionId: "act_stu901",
    createdAt: "2026-02-13 13:33",
  },
]

function StatusBadge({ status }: { status: MintStatus }) {
  if (status === "success") {
    return (
      <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">
        Success
      </Badge>
    )
  }
  if (status === "error") {
    return <Badge variant="destructive">Failed</Badge>
  }
  return (
    <Badge className="bg-warning/10 text-warning-foreground hover:bg-warning/20 border-0">
      Pending
    </Badge>
  )
}

export function OrdersTable() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filtered = orders.filter((order) => {
    const matchesSearch =
      search === "" ||
      order.shopifyOrderId.toLowerCase().includes(search.toLowerCase()) ||
      order.productName.toLowerCase().includes(search.toLowerCase()) ||
      order.recipient.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders, products, recipients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-32">Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-40">Date</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {order.shopifyOrderId}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-foreground">
                    {order.productName}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.recipientType === "email" ? (
                      <Mail className="size-3.5 text-muted-foreground" />
                    ) : (
                      <Wallet className="size-3.5 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {order.recipient}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  {order.status === "error" && order.errorMessage ? (
                    <span className="text-xs text-destructive">
                      {order.errorMessage}
                    </span>
                  ) : order.crossmintActionId ? (
                    <span className="text-xs font-mono text-muted-foreground">
                      {order.crossmintActionId}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">--</span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {order.createdAt}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {order.status === "error" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        title="Retry mint"
                      >
                        <RefreshCw className="size-3.5" />
                        <span className="sr-only">Retry</span>
                      </Button>
                    )}
                    {order.crossmintActionId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        title="View on Crossmint"
                      >
                        <ExternalLink className="size-3.5" />
                        <span className="sr-only">View on Crossmint</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No orders found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {"Showing "}<span className="font-medium text-foreground">{filtered.length}</span>{" of "}<span className="font-medium text-foreground">{orders.length}</span>{" orders"}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8" disabled>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">
            3
          </Button>
          <Button variant="outline" size="icon" className="size-8">
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
