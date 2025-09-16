import { Button } from "../ui/button";
import { Link } from "react-router";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vendor: string;
}

interface ShopProductCardProps {
  product: Product;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  return (
    <div className="border-r border-b w-full h-fit grayscale hover:grayscale-0 transition duration-300">
      <Link to={`/shop/${product.id}`}>
        <img 
          alt={product.name} 
          src={product.image}
          className="cursor-pointer w-full h-48 object-cover"
        />
      </Link>
      <div className="p-3">
        <p>
          <span className="font-semibold text-xl">{product.price.toLocaleString()}</span>
          <span className="pl-1 text-xs text-muted-foreground">VND</span>
        </p>
        <Link to={`/shop/${product.id}`}>
          <Button variant="link" className="p-0 text-sm text-muted-foreground hover:cursor-pointer h-fit">
            {product.name}
          </Button>
        </Link>
        <p className="text-muted-foreground text-xs">by {product.vendor}</p>
      </div>
    </div>
  );
}