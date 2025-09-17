/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { Truck } from "lucide-react";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { Badge } from "~/components/ui/badge";
import { useAppSelector } from "~/hooks/redux-hooks";
import { useMemo, useState, useEffect, useCallback } from "react";
import { Link, Outlet } from "react-router";
import axios from "axios";
import { createColumns, type Order, type OrderViewActions } from "~/components/shipper/order-columns";
import OrderDetailModal from "~/components/shipper/order-detail-modal";
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
import { SlidersHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";

// Transform backend order data to frontend Order type
function transformOrder(backendOrder: any): Order {
  console.log('Transforming order:', {
    id: backendOrder._id,
    customerAddress: backendOrder.customerAddress,
    customerId: backendOrder.customerId,
    customerName: backendOrder.customerId?.name,
    customerUsername: backendOrder.customerId?.username
  });
  
  return {
    id: backendOrder._id,
    totalPrice: backendOrder.totalPrice,
    products: backendOrder.products.map((product: any) => ({
      id: product.productId._id,
      name: product.productId.name,
      category: "Category", // You might want to add category to the backend response
      description: product.productId.name, // Using name as description for now
      price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: product.productId.image
    })),
    description: `Order for ${backendOrder.customerId.name}`,
    customerName: backendOrder.customerId.name,
    address: backendOrder.customerAddress || "Address not provided",
    createdAt: new Date(backendOrder.createdAt),
    updatedAt: new Date(backendOrder.updatedAt || backendOrder.createdAt),
    status: backendOrder.status as 'active' | 'delivered' | 'cancelled',
    distributionHub: backendOrder.distributionHub,
  };
}

export default function DeliveryPage() {
  const user = useAppSelector(state => state.auth);
  const userDistributionHub = user.distributionHub || "danang"; // Default to danang if not set

  const getHubDisplayName = (hub: string) => {
    const hubMapping: { [key: string]: string } = {
      'danang': 'Da Nang',
      'hochiminh': 'Ho Chi Minh',
      'hanoi': 'Hanoi'
    };
    return hubMapping[hub] || hub;
  };
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders from backend
  const fetchOrders = useCallback(async (status?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Map distribution hub names to backend format (handle both old display names and new raw values)
      const hubMapping: { [key: string]: string } = {
        // New raw values (from updated registration)
        "danang": "danang",
        "hochiminh": "hochiminh", 
        "hanoi": "hanoi",
        // Old display names (from existing shippers)
        "Da Nang": "danang",
        "Ho Chi Minh": "hochiminh",
        "Hanoi": "hanoi"
      };
      
      const backendHub = hubMapping[userDistributionHub] || "danang";
      console.log('Fetching orders for hub:', backendHub, 'with status:', status);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (status) {
        params.append('status', status);
      }
      
      const url = `http://localhost:5000/api/orders/hub/${backendHub}${params.toString() ? '?' + params.toString() : ''}`;
      console.log('API URL:', url);
      
      const response = await axios.get(url);
      
      const transformedOrders = response.data.map(transformOrder);
      setOrders(transformedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [userDistributionHub]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Refetch when status filter changes
  useEffect(() => {
    fetchOrders(statusFilter);
  }, [statusFilter, fetchOrders]);

  // Handle status filter change
  const handleStatusFilter = useCallback((status: string | undefined) => {
    setStatusFilter(status);
  }, []);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (orderId: string, status: 'delivered' | 'cancelled') => {
    try {
      console.log(`Updating order ${orderId} to ${status}`);
      
      // Call the backend API to update order status
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status
      });
      
      // Update the local orders state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status, updatedAt: new Date() }
            : order
        )
      );
      
      // Close modal if it's open for this order
      if (selectedOrder?.id === orderId) {
        setIsModalOpen(false);
        setSelectedOrder(null);
      }
      
      console.log('Order status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Create columns with actions
  const columns = createColumns({
    onView: handleViewOrder,
    onUpdateStatus: handleUpdateStatus,
    onStatusFilter: handleStatusFilter,
  });

  return <>
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200 mb-3">
          {"Welcome back, " + user.name + "!"}
        </h1>
        <Badge className="mb-3"><Truck />{getHubDisplayName(user.distributionHub || "danang")}</Badge>
        <p className="text-muted-foreground">Manage your Neomall distribution hub's orders here.</p>
      </div>
      <div className="container mx-auto py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Loading orders...</h2>
              <p className="text-muted-foreground">Please wait while we fetch your orders.</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-red-500">Error loading orders</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
              <p className="text-muted-foreground">There are no active orders for your distribution hub.</p>
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={orders}
            renderToolbar={(table) => (
            <div className="flex items-center justify-end gap-3">
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
              </div>
            </div>
          )}
        />
        )}
      </div>
      <Outlet />
      
      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatus}
      />
    </main>
  </>
}