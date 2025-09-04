import { Minus, Plus, Trash } from "lucide-react";
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

const mockImg = "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/08/moc-khoa-pop-mart-labubu-macaron-green-grape-mau-xanh-la-66b094ec488c7-05082024160132.jpg";

function CartItem() {
  return (
    <>
    <div className="flex p-6 text-sm text-muted-foreground h-40 gap-6 items-center justify-between ">
      <Checkbox className="w-4 h-4 cursor-pointer" />
      <img className="w-20 h-20 rounded-md" src={mockImg} alt="Product Image" />
      <div className="min-w-60">
        <h3 className="text-sm text-muted-foreground">Product Name</h3>
        <p className="text-lg text-white">Product Price</p>
        <p>Vendor</p>
      </div>
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
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Delete item"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
    </>
  );
}

export default function CartPage() {
  return (
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200">My Cart</h1>
      </div>
      <section className="flex gap-10 py-10 px-42">
        <div className="grid grid-cols-1 border divide-border divide-y-1 w-500">
          <div className="flex gap-6 items-center p-6 justify-between">
            <div className="flex gap-6 items-center">
              <Checkbox className="w-4 h-4 cursor-pointer" />
              <p className="text-sm text-muted-foreground">Select all</p>
            </div>
            <div className="flex gap-6 items-center">
              <p className="text-sm text-muted-foreground">Delete all</p>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                aria-label="Delete item"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CartItem />
        </div>
        <aside className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-medium tracking-tight">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Total</p>
                <p>1000000</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full cursor-pointer">
                {"Checkout"}
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </section>
    </main>
  );
}