import { CircleCheck, Minus, Plus, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ScrollArea } from "~/components/ui/scroll-area";
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
import { useAppSelector, useAppDispatch } from "~/hooks/redux-hooks";
import { updateQuantity, removeFromCart, clearCart } from "~/features/cart/cartSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const mockImg = "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/08/moc-khoa-pop-mart-labubu-macaron-green-grape-mau-xanh-la-66b094ec488c7-05082024160132.jpg";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
    quantity: number;
  };
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.success("Item removed from cart");
  };

  return (
    <div className="flex p-6 text-sm text-muted-foreground h-40 gap-6 items-center justify-between">
      <img className="w-20 h-20 rounded-md" src={item.image} alt="Product Image" />
      <div className="min-w-60">
        <h3 className="text-sm text-muted-foreground">{item.name}</h3>
        <p className="text-lg text-white">{item.price.toLocaleString()} VND</p>
        <p>{item.vendor}</p>
      </div>
      <div className="flex gap-3">
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus />
        </Button>
        <Input 
          type="number" 
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-16 text-center"
          min="1"
        />
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Delete item"
        onClick={handleRemove}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.auth);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // Create order with random distribution hub
      const distributionHubs = ["Hub A", "Hub B", "Hub C", "Hub D"];
      const randomHub = distributionHubs[Math.floor(Math.random() * distributionHubs.length)];

      const orderData = {
        customerId: user.username,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: total,
        distributionHub: randomHub,
        status: "active"
      };

      // TODO: Replace with actual API call
      console.log("Creating order:", orderData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear cart and show success
      dispatch(clearCart());
      toast.success(`Order created successfully! Assigned to ${randomHub}`);
      setIsCheckoutOpen(false);
      
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <main>
        <div className="w-full border-b px-42 py-10">
          <h1 className="text-3xl font-medium tracking-tight w-200">My Cart</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Button onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200">My Cart</h1>
      </div>
      <section className="flex gap-10 py-10 px-42">
        <div className="grid grid-cols-1 border divide-border divide-y-1 w-500">
          <div className="flex gap-6 items-center p-6 justify-between">
            <div className="flex gap-6 items-center">
              <p className="text-sm text-muted-foreground">{items.length} item(s)</p>
            </div>
            <div className="flex gap-6 items-center">
              <p className="text-sm text-muted-foreground">Clear all</p>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                aria-label="Clear cart"
                onClick={handleClearCart}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <aside className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-medium tracking-tight">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">Subtotal ({items.length} items)</p>
                  <p>{total.toLocaleString()} VND</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>Free</p>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Total</p>
                    <p>{total.toLocaleString()} VND</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <AlertDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <AlertDialogTrigger asChild>
                  <Button type="submit" className="w-full cursor-pointer">
                    Order
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-4xl w-[800px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center tracking-tight">Let's review your order</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <Table>
                        <TableBody>
                          <ScrollArea className="h-100">
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <img className="w-16 h-16 rounded-md" src={mockImg} alt="Product Image" />
                                Product Name
                              </TableCell>
                              <TableCell>
                                Vendor Name
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                              <TableCell>
                                1
                              </TableCell>
                              <TableCell>
                                10000
                              </TableCell>
                            </TableRow> 
                          </ScrollArea>                                                   
                        </TableBody>
                      </Table>
                      <div className="flex justify-between py-6 px-4">
                        <p>Total</p>
                        <p>100000</p>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-between">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCheckout}>Place Order</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </aside>
      </section>
    </main>
  );
}