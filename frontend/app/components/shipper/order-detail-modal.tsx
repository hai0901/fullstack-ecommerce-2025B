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
import { CircleDashed, CircleCheck, X } from "lucide-react";
import { type Order } from "./order-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ScrollArea } from "~/components/ui/scroll-area";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: 'delivered' | 'cancelled') => void;
}

export default function OrderDetailModal({ 
  order, 
  isOpen, 
  onClose, 
  onUpdateStatus 
}: OrderDetailModalProps) {
  if (!order) return null;

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

  const getStatusBadge = (status: string) => {
    const bg = status === 'active' ? 'bg-blue-800 text-white' 
              : status === 'delivered' ? 'bg-green-800 text-white' 
              : 'bg-red-100 text-red-800';
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
    
    return (
      <Badge className={`rounded-full ${bg}`}>
        {status === "active" && <CircleDashed className="w-3 h-3 mr-1" />} 
        {status === "delivered" && <CircleCheck className="w-3 h-3 mr-1" />} 
        {statusLabel}
      </Badge>
    );
  };

  const getHubDisplayName = (hub: string) => {
    const hubMapping: { [key: string]: string } = {
      'danang': 'Da Nang',
      'hochiminh': 'Ho Chi Minh',
      'hanoi': 'Hanoi'
    };
    return hubMapping[hub] || hub;
  };

  const handleDeliver = () => {
    onUpdateStatus(order.id, 'delivered');
    onClose();
  };

  const handleCancel = () => {
    onUpdateStatus(order.id, 'cancelled');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
          <DialogDescription>
            Order ID: {order.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-2">Order Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className="ml-2">{getStatusBadge(order.status)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Total Price:</span>
                    <span className="ml-2 text-lg font-semibold">
                      {order.totalPrice.toLocaleString()} VND
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {formatDate(order.updatedAt)}
                    </span>
                  </div>
                  {order.distributionHub && (
                    <div>
                      <span className="font-medium">Distribution Hub:</span>
                      <span className="ml-2">{getHubDisplayName(order.distributionHub)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span>
                    <span className="ml-2">{order.customerName}</span>
                  </div>
                  <div>
                    <span className="font-medium">Address:</span>
                    <span className="ml-2 text-sm">{order.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Products in Order</h3>
            <ScrollArea className="h-48 w-full border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <div>
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {product.quantity || 1}
                      </TableCell>
                      <TableCell className="text-sm">{product.price.toLocaleString()} VND</TableCell>
                      <TableCell className="max-w-xs truncate text-sm">{product.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Actions */}
          {order.status === 'active' && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel Order
              </Button>
              <Button 
                onClick={handleDeliver}
                className="gap-2"
              >
                <CircleCheck className="h-4 w-4" />
                Mark as Delivered
              </Button>
            </div>
          )}

          {order.status !== 'active' && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
