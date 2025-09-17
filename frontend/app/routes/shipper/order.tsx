/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useLocation, useNavigate } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "~/components/ui/dialog";
import { redirect } from "react-router";
import { useEffect, useState } from "react";
import { Boxes, CircleCheck, CircleDashed, Loader, MapPinned, ScanText, Tags, User } from "lucide-react";
import type { Route } from "./+types/order";
import { Badge } from "~/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { toast } from "sonner"

export default function OrderModal({ params }: Route.ComponentProps) {
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState(/^\/delivery\/[^/]+$/.test(pathname));
  const navigate = useNavigate();
  const order = {
    id: params.orderID,
    customer: "Christopher",
    address: "123 Geunon Street, SF, California",
    status: "active",
    totalPrice: 1690000,
    products: [
      {
        id: "1",
        name: "Áo Thun Nam",
        imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        price: 150000, // VND
        vendor: "Shop Thời Trang",
        quantity: 2,
      },
      {
        id: "2",
        name: "Giày Sneaker",
        imageUrl: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
        price: 850000, // VND
        vendor: "Sneaker Store",
        quantity: 1,
      },
      {
        id: "3",
        name: "Balo Laptop",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        price: 320000, // VND
        vendor: "Balo Xinh",
        quantity: 1,
      },
      {
        id: "4",
        name: "Tai Nghe Bluetooth",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        price: 250000, // VND
        vendor: "Điện Tử Việt",
        quantity: 3,
      },
      {
        id: "5",
        name: "Bình Nước Thể Thao",
        imageUrl: "https://images.unsplash.com/photo-1526178613658-3f1622045557",
        price: 90000, // VND
        vendor: "Sport Shop",
        quantity: 2,
      },
    ]
  }
  const setOrderStatus = (type: string) => {
    switch (type) {
      case "cancel":
        toast("Cancelled order.");
      default:
        return;
    }
  }
  
  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(prev => !prev)
        navigate("/delivery")
      }}
      open={open}
      modal={open}
    >
      <DialogContent className="w-140">
        <DialogHeader>
          <DialogTitle>Order</DialogTitle>
        </DialogHeader>
        <DialogDescription className="grid grid-cols-[1fr_2fr] gap-y-3 font-light">
          <span className="flex items-center gap-2"><ScanText size={16} />Order ID</span>
          <span className="text-white">{order.id}</span>
          <span className="flex items-center gap-2"><User size={16} />Customer</span>
          <span className="text-white">{order.customer}</span>
          <span className="flex items-center gap-2"><MapPinned size={16} strokeWidth={1} />Address</span>
          <span className="text-white">{order.address}</span>
          <span className="flex items-center gap-2"><Loader size={16} />Status</span>
          {order.status === "active" ?
          <span>
            <Badge className="bg-blue-800 rounded-full text-white">
              <CircleDashed />
              Active
            </Badge>
          </span>
          :
          <span>
            <Badge className="bg-green-800 text-white">
              <CircleCheck className="size-4 mr-2" />
              Delivered
            </Badge>
          </span>
          }
          <span className="flex items-center gap-2"><Tags size={16} />Total</span>
          <span className="text-white">
            {order.totalPrice.toLocaleString("vi-VN")}
            <span className="ml-1 text-xs text-muted-foreground">
              VND
            </span>
          </span>
          <span className="flex items-center gap-2 col-span-full">
            <Boxes strokeWidth={1} size={16}/>
            {"Products" + ` (${order.products.length})`}
          </span>
          <ScrollArea className="col-span-full overflow-visible">
            <div className="flex gap-2 w-max pt-2 pl-2 overflow-visible">
            {order.products.map((product, _i) => (
              <Card key={product.id} className="py-2 overflow-visible">
                <CardContent className="w-fit py-0 pl-2 flex items-center gap-3 relative overflow-visible">
                  <Badge className="absolute rounded-full py-0 px-1 min-w-1 tabular-nums -top-4 -left-2 z-10 shadow">{product.quantity}</Badge>
                  <img
                    src={product.imageUrl}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <p>{product.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{product.vendor}</p>
                    <p>
                      {product.price.toLocaleString("vi-VN")}
                      <span className="text-xs text-muted-foreground">VND</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
           <Button 
              size="sm" 
              variant="ghost" 
              className="cursor-pointer"
              onClick={() => setOrderStatus("cancel")}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm" variant="outline" className="cursor-pointer">Deliver</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}