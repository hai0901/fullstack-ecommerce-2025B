import { useMemo, useState, useEffect } from "react";
import { Link, Outlet, useSearchParams } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { columns, type Product } from "~/components/vendor/product-columns";
import { DataTable } from "~/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAppSelector } from "~/hooks/redux-hooks";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function VendorProducts() {
  const user = useAppSelector(state => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchProducts = async (page = 1, search = "", cat = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(cat && { category: cat })
      });

      const response = await axios.get(
        `http://localhost:5000/api/products/vendor/${user.username}?${params}`,
        { withCredentials: true }
      );

      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      fetchProducts(1, query, category);
    }
  }, [user.isAuthenticated, query, category]);

  // Handle refresh from add product
  useEffect(() => {
    if (searchParams.get('refresh') === 'true') {
      // Clear the refresh parameter
      setSearchParams({});
      // Reload products
      fetchProducts(1, query, category);
    }
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleCategoryFilter = (value: string) => {
    setCategory(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage, query, category);
  };

  if (loading) {
    return (
      <main>
        <div className="w-full border-b px-42 py-10">
          <h1 className="text-3xl font-medium tracking-tight w-200 mb-6">
            {"Welcome back, " + user.name + "!"}
          </h1>
          <p className="text-muted-foreground">Manage your Neomall products here.</p>
        </div>
        <div className="container mx-auto py-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="w-full border-b px-42 py-10">
          <h1 className="text-3xl font-medium tracking-tight w-200 mb-6">
            {"Welcome back, " + user.name + "!"}
          </h1>
          <p className="text-muted-foreground">Manage your Neomall products here.</p>
        </div>
        <div className="container mx-auto py-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => fetchProducts(1, query, category)}>
              Try Again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return <>
    <main className="min-h-screen flex flex-col">
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200 mb-6">
          {"Welcome back, " + user.name + "!"}
        </h1>
        <p className="text-muted-foreground">Manage your Neomall products here.</p>
      </div>
      <div className="container mx-auto py-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
            <DataTable
              columns={columns}
              data={products}
          renderToolbar={(table) => (
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
              <div className="max-w-sm w-full">
                <Input
                      placeholder="Search products..."
                  value={query}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                    disabled={loadingCategories}
                  >
                    <option value="">
                      {loadingCategories ? "Loading categories..." : "All Categories"}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
                <Link to="add-product">
                  <Button>Add Product</Button>  
                </Link>
              </div>
            </div>
          )}
        />
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalProducts)} of {pagination.totalProducts} products
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Outlet/>
    </main>
  </>
}