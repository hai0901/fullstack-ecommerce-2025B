import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { Card, CardContent } from "~/components/ui/card"
import { Upload, X } from "lucide-react"
import { useLocation, useNavigate } from "react-router"

const categories = [
  "Accessories",
  "Apparel", 
  "Electronics",
  "Home",
  "Outdoors"
]

export default function AddProduct() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    availableStock: "",
    image: ""
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  let navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual product creation logic
    console.log("Creating product:", formData)
    // Reset form
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      availableStock: "",
      image: ""
    })
    setImagePreview(null)
  }

  const isFormValid = formData.name && formData.category && formData.description && formData.price && formData.availableStock

  return (
    <Sheet 
      open={location.pathname == "/my-products/add-product"} 
      onOpenChange={(open) => {
        if (!open) navigate("/my-products");
      }}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-10 z-[9999]">
        <SheetHeader className="p-0">
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>
            Create a new product for your store. Fill in all the required information below.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          {/* Product Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="w-full h-48 object-cover rounded-md border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground text-center">
                      <p>Click to upload an image</p>
                      <p className="text-xs">PNG, JPG up to 10MB</p>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (VND) *</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price in VND"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              min="0"
              step="1000"
              required
            />
          </div>

          {/* Available Stock */}
          <div className="space-y-2">
            <Label htmlFor="availableStock">Available Stock *</Label>
            <Input
              id="availableStock"
              type="number"
              placeholder="Enter available quantity"
              value={formData.availableStock}
              onChange={(e) => handleInputChange("availableStock", e.target.value)}
              min="0"
              required
            />
          </div>
        </form>

        <SheetFooter className="flex gap-2 p-0">
          <Button variant="outline" onClick={() => navigate("/my-products")}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Create Product
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
