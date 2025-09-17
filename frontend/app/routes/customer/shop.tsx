import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import ShopProductCard from "~/components/customer/shop-product-card";
import ShopProductSkeleton from "~/components/customer/shop-product-skeleton";
import FilterArea from "~/components/customer/shop/filter-area";
import { Outlet } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useAppSelector } from "~/hooks/redux-hooks";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false
  });
  const [error, setError] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  // Get filter state from Redux
  const filterItems = useAppSelector(state => state.filterItems);

  // Fetch products function
  const fetchProducts = useCallback(async (page: number = 1, reset: boolean = false, filters: any = appliedFilters) => {
    try {
      if (reset) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9'
      });

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      // Add filter parameters
      if (filters.category) {
        params.append('category', filters.category);
      }
      if (filters.minPrice) {
        params.append('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice) {
        params.append('maxPrice', filters.maxPrice.toString());
      }

      console.log('API request URL:', `http://localhost:5000/api/products/shop?${params}`);
      console.log('Request parameters:', Object.fromEntries(params.entries()));

      const response = await axios.get(`http://localhost:5000/api/products/shop?${params}`);
      const { products: newProducts, pagination: newPagination } = response.data;

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setPagination(newPagination);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchQuery, appliedFilters]);

  // Load more products
  const loadMore = useCallback(() => {
    if (!loadingMore && pagination.hasNext) {
      fetchProducts(pagination.currentPage + 1, false);
    }
  }, [loadingMore, pagination.hasNext, pagination.currentPage, fetchProducts]);

  // Intersection observer for infinite scrolling
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination.hasNext && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, pagination.hasNext, loadingMore]);

  // Initial load and search
  useEffect(() => {
    fetchProducts(1, true);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    // Search is handled by useEffect when searchQuery changes
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Apply filters function
  const handleApplyFilters = () => {
    const filters: any = {};
    
    // Process filter items from Redux state
    filterItems.forEach(item => {
      if (item.id === 'priceRange') {
        const priceRange = item.description as number[];
        if (priceRange && priceRange.length === 2) {
          // Only apply price filter if it's not the default range
          if (priceRange[0] > 0 || priceRange[1] < 1000000) {
            filters.minPrice = priceRange[0];
            filters.maxPrice = priceRange[1];
          }
        }
      } else {
        // All other items are categories (they use category._id as id)
        // For now, we'll take the first category if multiple are selected
        // TODO: Support multiple categories if needed
        if (!filters.category) {
          filters.category = item.description;
        }
      }
    });
    
    console.log('Applying filters:', filters);
    console.log('Filter items from Redux:', filterItems);
    
    setAppliedFilters(filters);
    fetchProducts(1, true, filters);
  };

  return (
    <div id="shop" className="w-full h-[fit] bg-black flex flex-col items-center">
      <div className="flex flex-row w-[1448px]"> 
        <FilterArea onApplyFilters={handleApplyFilters} />
        <section className="w-full h-auto border-t">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="flex gap-2 max-w-md items-center">
              <div className="relative flex-1">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button onClick={handleSearch} size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="w-full h-[900px]">
            {loading ? (
              <div className="grid grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <ShopProductSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button onClick={() => fetchProducts(1, true)}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3">
                  {products.map((product) => (
                    <ShopProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Loading more indicator */}
                {loadingMore && (
                  <div className="grid grid-cols-3 mt-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <ShopProductSkeleton key={`loading-${index}`} />
                    ))}
                  </div>
                )}
                
                {/* Intersection observer target */}
                {pagination.hasNext && !loadingMore && (
                  <div ref={loadMoreRef} className="h-4" />
                )}
              </>
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </section>  
        <Outlet/>      
      </div>
    </div>  
  )
}