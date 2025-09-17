/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import type { Route } from "./+types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useNavigate } from "react-router";
import { Minus, Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "~/hooks/redux-hooks";
import { addToCart } from "~/features/cart/cartSlice";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  vendorId: {
    username: string;
  };
  categoryId: {
    name: string;
  };
}

export default function Product({ params }: Route.ComponentProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  console.log("params.productID: ", params.productID);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${params.productID}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (params.productID) {
      fetchProduct();
    }
  }, [params.productID]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add the product to cart with the specified quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendor: product.vendorId.username
      }));
    }
    
    toast.success(`${quantity} item(s) added to cart`, {
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      }
    });
  };

  if (loading) {
    return (
      <Dialog open={true} onOpenChange={(open) => { if (!open) navigate("/shop"); }}>
        <DialogContent className="flex gap-6 w-fit">
          <div className="w-60 h-60 bg-border animate-pulse" />
          <div className="flex flex-col justify-between">
            <div>
              <div className="h-6 bg-border animate-pulse mb-2" />
              <div className="h-4 bg-border animate-pulse mb-2" />
              <div className="h-4 bg-border animate-pulse mb-3" />
              <div className="h-6 bg-border animate-pulse" />
            </div>
            <div className="w-full flex justify-between gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-border animate-pulse" />
                <div className="w-16 h-10 bg-border animate-pulse" />
                <div className="w-10 h-10 bg-border animate-pulse" />
              </div>
              <div className="w-32 h-10 bg-border animate-pulse" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !product) {
    return (
      <Dialog open={true} onOpenChange={(open) => { if (!open) navigate("/shop"); }}>
        <DialogContent className="flex gap-6 w-fit">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
            <Button onClick={() => navigate("/shop")}>
              Back to Shop
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog 
      open={product._id === params.productID}
      onOpenChange={
        (open) => {
          if (!open) navigate("/shop");
        }
      }
    >
      <DialogContent className="flex gap-6 w-fit">
        <img src={product.image} className="w-60 h-60 rounded-md object-cover" />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-medium tracking-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{"by " + product.vendorId.username}</p>
            <p className="text-sm text-muted-foreground my-3">{product.description}</p>
            <p><span className="font-semibold text-xl">{product.price.toLocaleString()}</span><span className="pl-1 text-xs text-muted-foreground">VND</span></p>
          </div>
          <div className="w-full flex justify-between gap-6">
            <div className="flex gap-3">
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus />
              </Button>
              <Input 
                type="number" 
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center"
                min="1"
              />
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus />
              </Button>
            </div>
            <Button onClick={handleAddToCart}>
              <ShoppingCart />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}