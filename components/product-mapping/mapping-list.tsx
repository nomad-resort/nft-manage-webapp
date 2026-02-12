"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link2, Unlink, Save, ShoppingBag, Hexagon } from "lucide-react"

type ShopifyProduct = {
  id: string
  title: string
  sku: string
  price: string
  image: string
  status: "active" | "draft"
}

type CrossmintTemplate = {
  id: string
  name: string
  collectionName: string
}

type Mapping = {
  product: ShopifyProduct
  templateId: string | null
}

const shopifyProducts: ShopifyProduct[] = [
  {
    id: "prod_001",
    title: "Nomad Explorer Pass",
    sku: "NEP-2026",
    price: "$199.00",
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
  },
  {
    id: "prod_002",
    title: "Beach Villa Access NFT",
    sku: "BVA-2026",
    price: "$499.00",
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
  },
  {
    id: "prod_003",
    title: "Sunset Lounge Membership",
    sku: "SLM-2026",
    price: "$149.00",
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
  },
  {
    id: "prod_004",
    title: "Island Hopper Bundle",
    sku: "IHB-2026",
    price: "$699.00",
    image: "/placeholder.svg?height=80&width=80",
    status: "draft",
  },
  {
    id: "prod_005",
    title: "Wellness Retreat Token",
    sku: "WRT-2026",
    price: "$299.00",
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
  },
]

const crossmintTemplates: CrossmintTemplate[] = [
  {
    id: "tmpl_001",
    name: "Explorer Pass Template",
    collectionName: "Nomad Passes",
  },
  {
    id: "tmpl_002",
    name: "Villa Access Template",
    collectionName: "Property Access",
  },
  {
    id: "tmpl_003",
    name: "Membership Token Template",
    collectionName: "Memberships",
  },
  {
    id: "tmpl_004",
    name: "Bundle Pack Template",
    collectionName: "Bundles",
  },
  {
    id: "tmpl_005",
    name: "Wellness Token Template",
    collectionName: "Wellness",
  },
]

const initialMappings: Mapping[] = [
  { product: shopifyProducts[0], templateId: "tmpl_001" },
  { product: shopifyProducts[1], templateId: "tmpl_002" },
  { product: shopifyProducts[2], templateId: "tmpl_003" },
  { product: shopifyProducts[3], templateId: null },
  { product: shopifyProducts[4], templateId: null },
]

export function MappingList() {
  const [mappings, setMappings] = useState<Mapping[]>(initialMappings)
  const [hasChanges, setHasChanges] = useState(false)

  function handleTemplateChange(productId: string, templateId: string | null) {
    setMappings((prev) =>
      prev.map((m) =>
        m.product.id === productId ? { ...m, templateId } : m
      )
    )
    setHasChanges(true)
  }

  function handleSave() {
    setHasChanges(false)
  }

  const linkedCount = mappings.filter((m) => m.templateId).length
  const totalCount = mappings.length

  return (
    <div className="flex flex-col gap-6">
      {/* Summary bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link2 className="size-4" />
            <span>
              <span className="font-semibold text-foreground">{linkedCount}</span>
              {" / "}{totalCount}{" products linked"}
            </span>
          </div>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} className="gap-2">
            <Save className="size-4" />
            Save Changes
          </Button>
        )}
      </div>

      {/* Mapping cards */}
      <div className="flex flex-col gap-4">
        {mappings.map((mapping) => {
          const selectedTemplate = crossmintTemplates.find(
            (t) => t.id === mapping.templateId
          )
          const isLinked = !!mapping.templateId

          return (
            <Card
              key={mapping.product.id}
              className={
                isLinked
                  ? "border-primary/20 bg-primary/[0.02]"
                  : "border-border"
              }
            >
              <CardContent className="p-0">
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Shopify product */}
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <ShoppingBag className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {mapping.product.title}
                        </span>
                        <Badge
                          variant={
                            mapping.product.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            mapping.product.status === "active"
                              ? "bg-success/10 text-success hover:bg-success/20 border-0 text-xs"
                              : "text-xs"
                          }
                        >
                          {mapping.product.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-mono">{mapping.product.sku}</span>
                        <span>{mapping.product.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow / link indicator */}
                  <div className="hidden sm:flex items-center px-4">
                    {isLinked ? (
                      <div className="flex items-center gap-2 text-primary">
                        <div className="h-px w-8 bg-primary/40" />
                        <Link2 className="size-4" />
                        <div className="h-px w-8 bg-primary/40" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground/40">
                        <div className="h-px w-8 bg-border" />
                        <Unlink className="size-4" />
                        <div className="h-px w-8 bg-border" />
                      </div>
                    )}
                  </div>

                  {/* Crossmint template selector */}
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Hexagon className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Crossmint Template
                      </span>
                      <Select
                        value={mapping.templateId ?? "none"}
                        onValueChange={(value) =>
                          handleTemplateChange(
                            mapping.product.id,
                            value === "none" ? null : value
                          )
                        }
                      >
                        <SelectTrigger className="w-56">
                          <SelectValue placeholder="Select template..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            Not linked
                          </SelectItem>
                          {crossmintTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex flex-col">
                                <span>{template.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedTemplate && (
                        <span className="text-xs text-muted-foreground">
                          {"Collection: "}{selectedTemplate.collectionName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
