export interface RouteStop {
    time: string
    place: string
    activity: string
    duration: string
}

export interface RouteReview {
    id: string
    userName: string
    avatar: string
    rating: number
    date: string
    content: string
    images?: string[]
}

export interface RouteProps {
    id: string
    title: string
    image: string
    duration: string
    budget: string
    tags: string[]
    rating: number
    description: string
    stops: RouteStop[]
    location?: {
        address?: string
        latitude?: number
        longitude?: number
    }
}

export interface ProductSpecification {
    name: string
    value: string
}

export interface ProductProps {
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
