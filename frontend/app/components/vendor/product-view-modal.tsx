/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { type Product } from "./product-columns";

interface ProductViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (productId: string) => void;
}

export default function ProductViewModal({ 
  product, 
  isOpen, 
  onClose, 
  onDelete 
}: ProductViewModalProps) {
  if (!product) return null;

  const handleDelete = () => {
    onDelete(product.id);
    onClose();
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription>
            Product ID: {product.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full h-64 bg-muted rounded-lg border flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Product Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Category:</span>
                  <Badge variant="secondary" className="ml-2">
                    {product.category}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <span className="ml-2 text-lg font-semibold">
                    {product.price.toLocaleString()} VND
                  </span>
                </div>
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
