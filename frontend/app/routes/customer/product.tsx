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
import { Toaster, toast } from "sonner";

export default function Product({ params }: Route.ComponentProps) {
  const product = {
    id: "1",
    name: "Labubu",
    price: 1000,
    description: "This is a very fascinating Labubu",
    image: "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/08/moc-khoa-pop-mart-labubu-macaron-green-grape-mau-xanh-la-66b094ec488c7-05082024160132.jpg",
    vendor: "Alexander Wang"
  };
  console.log("params.productID: ", params.productID);
  let navigate = useNavigate();

  return (
    <Dialog 
      open={product.id === params.productID}
      onOpenChange={
        (open) => {
          if (!open) navigate("/shop");
        }
      }
    >
      <DialogContent className="flex gap-6 w-fit">
        <img src={product.image} className="w-60 h-60 rounded-md" />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-medium tracking-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{"by " + product.vendor}</p>
            <p className="text-sm text-muted-foreground my-3">{product.description}</p>
            <p><span className="font-semibold text-xl">{product.price}</span><span className="pl-1 text-xs text-muted-foreground">VND</span></p>
          </div>
          <div className="w-full flex justify-between gap-6">
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="rounded-full">
                <Minus />
              </Button>
              <Input type="number text-center" />
              <Button size="icon" variant="outline" className="rounded-full">
                <Plus />
              </Button>
            </div>
            <Button 
              onClick={() => toast.success("Item added to cart", {
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                }
              })}
            >
              <ShoppingCart />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}