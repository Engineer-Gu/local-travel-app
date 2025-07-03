export interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  sold: number
  category: string
  description: string
  specifications: ProductSpecification[]
  images: string[]
}

interface ProductSpecification {
  name: string
  value: string
}
