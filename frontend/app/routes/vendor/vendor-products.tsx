import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { columns, type Product } from "~/components/vendor/product-columns";
import { ProductTable } from "~/components/vendor/product-table";

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
  const products = getProducts();

  return <>
    <NavBar />
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200">
          My Products
        </h1>
      </div>
      <div className="container mx-auto py-10">
        <ProductTable columns={columns} data={products} />
      </div>
      <Outlet/>
    </main>
    <Footer />
  </>
}