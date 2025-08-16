import { Button } from "../ui/button";

export default function ShopProductCard() {
  const mockImg = "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/08/moc-khoa-pop-mart-labubu-macaron-green-grape-mau-xanh-la-66b094ec488c7-05082024160132.jpg";
  
  return (
    <div className="border-r border-b w-full h-fit grayscale hover:grayscale-0 transition duration-300">
      <img alt="product image" src={mockImg}/>
      <div className="p-3">
        <p><span className="font-semibold text-xl">200.000</span><span className="pl-1 text-xs text-muted-foreground">VND</span></p>
        <p className="text-sm text-muted-foreground">Labubu like no other</p>
        <p className="text-muted-foreground text-xs">by Alexander Wang</p>
      </div>
    </div>
  );
}