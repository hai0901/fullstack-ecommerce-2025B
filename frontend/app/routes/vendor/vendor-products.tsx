import { useMemo, useState, useEffect } from "react";
import { Link, Outlet, useSearchParams } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { createColumns, type Product, type ProductViewActions } from "~/components/vendor/product-columns";
import ProductViewModal from "~/components/vendor/product-view-modal";
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
import { SlidersHorizontal, ChevronLeft, ChevronRight, Check, ChevronDown } from "lucide-react";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async (page = 1, search = "", cat = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '1000', // Fetch all products for client-side filtering
        ...(search && { search }),
        ...(cat && { category: cat })
      });

      const response = await axios.get(
        `http://localhost:5000/api/products/vendor/${user.username}?${params}`,
        { withCredentials: true }
      );

      setAllProducts(response.data.products);
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
      fetchProducts(1, "", "");
    }
  }, [user.isAuthenticated]);

  // Handle refresh from add product
  useEffect(() => {
    if (searchParams.get('refresh') === 'true') {
      // Clear the refresh parameter
      setSearchParams({});
      // Reload products
      fetchProducts(1, "", "");
    }
  }, [searchParams]);

  // Client-side filtering
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search query
    if (query.trim()) {
      const searchTerm = query.trim().toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by categories (multiple selection)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    return filtered;
  }, [allProducts, query, selectedCategories]);

  // Paginate filtered results
  const paginatedProducts = useMemo(() => {
    const pageSize = 10;
    const startIndex = (pagination.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, pagination.currentPage]);

  // Update pagination info based on filtered results
  const updatedPagination = useMemo(() => {
    const pageSize = 10;
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    return {
      ...pagination,
      totalPages,
      totalProducts: filteredProducts.length,
      hasNext: pagination.currentPage < totalPages,
      hasPrev: pagination.currentPage > 1
    };
  }, [filteredProducts.length, pagination.currentPage]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        // Remove category if already selected
        return prev.filter(cat => cat !== categoryName);
      } else {
        // Add category if not selected
        return [...prev, categoryName];
      }
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      // If all categories are selected, clear selection (show all)
      setSelectedCategories([]);
    } else {
      // Select all categories
      setSelectedCategories(categories.map(cat => cat.name));
    }
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      // TODO: Implement delete API call
      console.log('Delete product:', productId);
      // After successful deletion, refresh the products
      fetchProducts(1, "", "");
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Create columns with actions
  const columns = createColumns({
    onView: handleViewProduct,
    onDelete: handleDeleteProduct
  });


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
            <Button onClick={() => fetchProducts(1, "", "")}>
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
              data={paginatedProducts}
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-[200px] justify-between"
                        disabled={loadingCategories}
                      >
                        {loadingCategories 
                          ? "Loading..." 
                          : selectedCategories.length === 0 
                            ? "All Categories" 
                            : selectedCategories.length === categories.length
                              ? "All Categories"
                              : `Selected Categories (${selectedCategories.length})`
                        }
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSelectAllCategories}>
                        <Check 
                          className={`mr-2 h-4 w-4 ${
                            selectedCategories.length === categories.length ? 'opacity-100' : 'opacity-0'
                          }`} 
                        />
                        All Categories
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {categories.map((cat) => (
                        <DropdownMenuCheckboxItem
                          key={cat._id}
                          checked={selectedCategories.includes(cat.name)}
                          onCheckedChange={() => handleCategoryToggle(cat.name)}
                        >
                          {cat.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                  <Button size="sm">Add Product</Button>  
                </Link>
              </div>
            </div>
          )}
        />
          
          {/* Pagination */}
          {updatedPagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((updatedPagination.currentPage - 1) * 10) + 1} to {Math.min(updatedPagination.currentPage * 10, updatedPagination.totalProducts)} of {updatedPagination.totalProducts} products
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                  disabled={!updatedPagination.hasPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {updatedPagination.currentPage} of {updatedPagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  disabled={!updatedPagination.hasNext}
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
      
      {/* Product View Modal */}
      <ProductViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteProduct}
      />
    </main>
  </>
}