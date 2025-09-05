import { Button } from "../ui/button";
import { Link, redirect } from "react-router";

export default function ShopProductCard() {
  const mockImg = "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/08/moc-khoa-pop-mart-labubu-macaron-green-grape-mau-xanh-la-66b094ec488c7-05082024160132.jpg";
  const product = {
    id: "1"
  };
  
  return (
    <div className="border-r border-b w-full h-fit grayscale hover:grayscale-0 transition duration-300">
      <Link to={`/shop/${product.id}`}>
        <img 
          alt="product image" 
          src={mockImg}
          className="cursor-pointer"
        />
      </Link>
      <div className="p-3">
        <p><span className="font-semibold text-xl">200.000</span><span className="pl-1 text-xs text-muted-foreground">VND</span></p>
        <Link to={`/shop/${product.id}`}>
          <Button variant="link" className="p-0 text-sm text-muted-foreground hover:cursor-pointer h-fit">Labubu like no other</Button>
        </Link>
        <p className="text-muted-foreground text-xs">by Alexander Wang</p>
      </div>
    </div>
  );
}