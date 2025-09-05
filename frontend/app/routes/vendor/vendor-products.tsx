import { Outlet } from "react-router";
import { useMemo, useState } from "react";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { columns, type Product } from "~/components/vendor/product-columns";
import { ProductTable } from "~/components/vendor/product-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAppSelector } from "~/hooks/redux-hooks";

function getProducts(): Product[] {
  const now = new Date()
  return Array.from({ length: 30 }, (_, index) => {
    const idNum = (index + 1).toString().padStart(3, '0')
    const createdAt = new Date(now)
    createdAt.setDate(now.getDate() - (30 - index))
    const updatedAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24)

    return {
      id: `P-${idNum}`,
      name: `Product ${index + 1}`,
      category: ["Accessories", "Apparel", "Electronics", "Home", "Outdoors"][index % 5],
      description: `Mock description for product ${index + 1}`,
      // VND pricing: random between 50,000 and 5,000,000, rounded to nearest 1,000
      price: Math.round((Math.random() * (5000000 - 50000) + 50000) / 1000) * 1000,
      availableStock: Math.floor(Math.random() * 200),
      image: `https://picsum.photos/seed/product-${index + 1}/300/300`,
      createdAt,
      updatedAt,
      isDeleted: false,
    }
  })
}

export default function VendorProducts() {
  const user = useAppSelector(state => state.auth);
  const products = getProducts();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.id, p.name, p.category, p.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [products, query]);

  return <>
    <NavBar />
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200 mb-6">
          {"Welcome back, " + user.name + "!"}
        </h1>
        <p className="text-muted-foreground">Manage your Neomall products here.</p>
      </div>
      <div className="container mx-auto py-10">
        <ProductTable
          columns={columns}
          data={filtered}
          renderToolbar={(table) => (
            <div className="flex items-center justify-between gap-3">
              <div className="max-w-sm w-full">
                <Input
                  placeholder="Filter Products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal className="size-4" /> View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Toggle Column</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                      .getAllLeafColumns()
                      .filter((col) => col.id !== "actions")
                      .map((col) => (
                        <DropdownMenuCheckboxItem
                          key={col.id}
                          checked={col.getIsVisible()}
                          onCheckedChange={(value) => col.toggleVisibility(Boolean(value))}
                          disabled={!col.getCanHide?.()}
                        >
                          {typeof col.columnDef.header === "string"
                            ? col.columnDef.header
                            : (col.columnDef.meta as any)?.label ?? col.id.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (s) => s.toUpperCase())}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => console.log("add product")}>Add Product</Button>
              </div>
            </div>
          )}
        />
      </div>
      <Outlet/>
    </main>
    <Footer />
  </>
}