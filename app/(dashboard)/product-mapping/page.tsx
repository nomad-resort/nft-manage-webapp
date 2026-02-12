import { PageHeader } from "@/components/page-header"
import { MappingList } from "@/components/product-mapping/mapping-list"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ProductMappingPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Product Mapping"
        description="Link Shopify products to Crossmint NFT templates"
      >
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="size-3.5" />
          Sync Products
        </Button>
      </PageHeader>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <MappingList />
      </div>
    </div>
  )
}
