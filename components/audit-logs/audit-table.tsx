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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  LogIn,
  LogOut,
  Link2,
  RefreshCw,
  Settings,
  Key,
} from "lucide-react"

type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "MAPPING_CREATE"
  | "MAPPING_UPDATE"
  | "MINT_RETRY"
  | "SETTINGS_UPDATE"
  | "API_KEY_ROTATE"

type AuditLog = {
  id: string
  userId: string
  userName: string
  action: AuditAction
  details: string
  ipAddress: string
  createdAt: string
}

const actionConfig: Record<
  AuditAction,
  { label: string; icon: typeof LogIn; color: string }
> = {
  LOGIN: { label: "Login", icon: LogIn, color: "bg-success/10 text-success" },
  LOGOUT: { label: "Logout", icon: LogOut, color: "bg-muted text-muted-foreground" },
  MAPPING_CREATE: { label: "Mapping Created", icon: Link2, color: "bg-primary/10 text-primary" },
  MAPPING_UPDATE: { label: "Mapping Updated", icon: Link2, color: "bg-primary/10 text-primary" },
  MINT_RETRY: { label: "Mint Retry", icon: RefreshCw, color: "bg-warning/10 text-warning-foreground" },
  SETTINGS_UPDATE: { label: "Settings Updated", icon: Settings, color: "bg-muted text-muted-foreground" },
  API_KEY_ROTATE: { label: "API Key Rotated", icon: Key, color: "bg-destructive/10 text-destructive" },
}

const auditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "usr_001",
    userName: "admin@nomadresort.io",
    action: "MAPPING_UPDATE",
    details: "Updated mapping: Nomad Explorer Pass -> Explorer Pass Template",
    ipAddress: "192.168.1.100",
    createdAt: "2026-02-13 14:35",
  },
  {
    id: "2",
    userId: "usr_001",
    userName: "admin@nomadresort.io",
    action: "MINT_RETRY",
    details: "Retried mint for order ORD-7819 (Nomad Explorer Pass #141)",
    ipAddress: "192.168.1.100",
    createdAt: "2026-02-13 14:30",
  },
  {
    id: "3",
    userId: "usr_001",
    userName: "admin@nomadresort.io",
    action: "LOGIN",
    details: "Logged in via email/password",
    ipAddress: "192.168.1.100",
    createdAt: "2026-02-13 14:00",
  },
  {
    id: "4",
    userId: "usr_002",
    userName: "ops@nomadresort.io",
    action: "MAPPING_CREATE",
    details: "Created mapping: Island Hopper Bundle -> Bundle Pack Template",
    ipAddress: "10.0.0.55",
    createdAt: "2026-02-12 18:22",
  },
  {
    id: "5",
    userId: "usr_002",
    userName: "ops@nomadresort.io",
    action: "API_KEY_ROTATE",
    details: "Rotated Crossmint API key (production)",
    ipAddress: "10.0.0.55",
    createdAt: "2026-02-12 18:10",
  },
  {
    id: "6",
    userId: "usr_002",
    userName: "ops@nomadresort.io",
    action: "SETTINGS_UPDATE",
    details: "Updated notification email to ops-alerts@nomadresort.io",
    ipAddress: "10.0.0.55",
    createdAt: "2026-02-12 18:05",
  },
  {
    id: "7",
    userId: "usr_001",
    userName: "admin@nomadresort.io",
    action: "MINT_RETRY",
    details: "Retried mint for order ORD-7803 (Beach Villa Access NFT)",
    ipAddress: "192.168.1.100",
    createdAt: "2026-02-12 16:45",
  },
  {
    id: "8",
    userId: "usr_002",
    userName: "ops@nomadresort.io",
    action: "LOGIN",
    details: "Logged in via Google OAuth",
    ipAddress: "10.0.0.55",
    createdAt: "2026-02-12 16:00",
  },
  {
    id: "9",
    userId: "usr_001",
    userName: "admin@nomadresort.io",
    action: "LOGOUT",
    details: "Session ended",
    ipAddress: "192.168.1.100",
    createdAt: "2026-02-12 12:30",
  },
  {
    id: "10",
    userId: "usr_001",
    userName: "admin@nomadresort.io",
    action: "MAPPING_UPDATE",
    details: "Updated mapping: Sunset Lounge Membership -> Membership Token Template",
    ipAddress: "192.168.1.100",
    createdAt: "2026-02-12 10:15",
  },
]

export function AuditTable() {
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      search === "" ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase())

    const matchesAction =
      actionFilter === "all" || log.action === actionFilter

    return matchesSearch && matchesAction
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by user or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="LOGIN">Login</SelectItem>
            <SelectItem value="LOGOUT">Logout</SelectItem>
            <SelectItem value="MAPPING_CREATE">Mapping Created</SelectItem>
            <SelectItem value="MAPPING_UPDATE">Mapping Updated</SelectItem>
            <SelectItem value="MINT_RETRY">Mint Retry</SelectItem>
            <SelectItem value="SETTINGS_UPDATE">Settings Updated</SelectItem>
            <SelectItem value="API_KEY_ROTATE">API Key Rotated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-40">Timestamp</TableHead>
              <TableHead className="w-48">User</TableHead>
              <TableHead className="w-40">Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-32">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log) => {
              const config = actionConfig[log.action]
              const Icon = config.icon
              return (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {log.createdAt}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {log.userName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${config.color} border-0 gap-1.5`}
                    >
                      <Icon className="size-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                    {log.details}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No audit logs found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        {"Showing "}<span className="font-medium text-foreground">{filtered.length}</span>{" of "}<span className="font-medium text-foreground">{auditLogs.length}</span>{" log entries"}
      </p>
    </div>
  )
}
