/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { useAppSelector } from "~/hooks/redux-hooks"
import axios from "axios"
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

interface Category {
  _id: string;
  name: string;
}

export default function AddProduct() {
  const location = useLocation();
  const user = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: ""
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to some default categories if API fails
        setCategories([
          { _id: '1', name: 'Electronics' },
          { _id: '2', name: 'Clothing' },
          { _id: '3', name: 'Books' },
          { _id: '4', name: 'Home & Garden' },
          { _id: '5', name: 'Sports' }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Real-time validation
    validateField(field, value)
  }

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }
    
    switch (field) {
      case 'name':
        if (value.length > 0 && (value.length < 10 || value.length > 20)) {
          newErrors.name = 'Product name must be between 10 and 20 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'price':
        const priceNum = parseFloat(value)
        if (value.length > 0 && (isNaN(priceNum) || priceNum <= 0)) {
          newErrors.price = 'Price must be a positive number'
        } else {
          delete newErrors.price
        }
        break
      case 'description':
        if (value.length > 500) {
          newErrors.description = 'Description must be at most 500 characters'
        } else {
          delete newErrors.description
        }
        break
    }
    
    setErrors(newErrors)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        imageDataUrl: formData.image,
        username: user.username
      }, {
        withCredentials: true
      });

      console.log("Product created successfully:", response.data)
      
      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        image: ""
      })
      setImagePreview(null)
      
      // Navigate back to products page with refresh flag
      navigate("/my-products?refresh=true")
    } catch (error) {
      console.error("Error creating product:", error)
      // You could add a toast notification here
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && 
    formData.category && 
    formData.description && 
    formData.price && 
    formData.image &&
    Object.keys(errors).length === 0 &&
    formData.name.length >= 10 && 
    formData.name.length <= 20 &&
    parseFloat(formData.price) > 0 &&
    formData.description.length <= 500

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
              placeholder="Enter product name (10-20 characters)"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.name.length}/20 characters
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleInputChange("category", value)}
              disabled={loadingCategories}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select a category"} />
              </SelectTrigger>
              <SelectContent className="z-[9999] max-h-[200px] overflow-y-auto">
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loadingCategories && (
              <p className="text-xs text-muted-foreground">Loading categories...</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your product... (max 500 characters)"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (VND) *</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price in VND (positive number)"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              min="0"
              step="1000"
              required
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>

        </form>

        <SheetFooter className="flex gap-2 p-0">
          <Button variant="outline" onClick={() => navigate("/my-products")}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
