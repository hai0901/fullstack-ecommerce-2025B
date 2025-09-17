/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

export default function ShopProductSkeleton() {
  return (
    <div className="bg-black border-r border-b w-full h-fit">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-border animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-3">
        {/* Title skeleton */}
        <div className="h-5 w-3/4 mb-2 bg-border animate-pulse" />
        
        {/* Description skeleton */}
        <div className="h-4 w-full mb-1 bg-border animate-pulse" />
        <div className="h-4 w-2/3 mb-3 bg-border animate-pulse" />
        
        {/* Price skeleton */}
        <div className="h-6 w-20 mb-3 bg-border animate-pulse" />
        
        {/* Button skeleton */}
        <div className="h-10 w-full bg-border animate-pulse" />
      </div>
    </div>
  );
}
