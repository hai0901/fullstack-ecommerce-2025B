import { Skeleton } from "~/components/ui/skeleton";

export default function ShopProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <Skeleton className="h-5 w-3/4 mb-2" />
        
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        
        {/* Price skeleton */}
        <Skeleton className="h-6 w-20 mb-3" />
        
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
