"use client"

import { Search, Filter, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/components/mobile-app"
import { useState } from "react"
// import { ShopService, Product, ProductCategory } from "@/lib/services/shop-service"

interface ShopProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

// 商品数据
const products = [
  {
    id: "product1",
    name: "西湖龙井茶叶礼盒",
    image: "/placeholder.svg?height=200&width=200&text=西湖龙井茶叶礼盒",
    price: 128,
    originalPrice: 158,
    rating: 4.9,
    reviews: 256,
    sold: 1024,
    category: "特产",
    description: "正宗西湖龙井茶叶，明前采摘，色泽翠绿，香气高雅，口感鲜爽。精美礼盒包装，送礼自用两相宜。",
    specifications: [
      { name: "规格", value: "250g/盒" },
      { name: "产地", value: "杭州西湖区" },
      { name: "保质期", value: "18个月" },
      { name: "储存方法", value: "密封、避光、干燥处保存" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=西湖龙井茶叶礼盒-1",
      "/placeholder.svg?height=400&width=400&text=西湖龙井茶叶礼盒-2",
      "/placeholder.svg?height=400&width=400&text=西湖龙井茶叶礼盒-3",
    ],
  },
  {
    id: "product2",
    name: "手工丝绸扇子",
    image: "/placeholder.svg?height=200&width=200&text=手工丝绸扇子",
    price: 68,
    originalPrice: 88,
    rating: 4.8,
    reviews: 128,
    sold: 512,
    category: "工艺品",
    description: "传统手工艺制作，精选优质丝绸材料，扇面采用传统山水画工艺，每一把都是独特的艺术品。",
    specifications: [
      { name: "规格", value: "长23cm" },
      { name: "材质", value: "竹骨+丝绸" },
      { name: "产地", value: "苏州" },
      { name: "适用场景", value: "收藏、送礼、日常使用" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=手工丝绸扇子-1",
      "/placeholder.svg?height=400&width=400&text=手工丝绸扇子-2",
      "/placeholder.svg?height=400&width=400&text=手工丝绸扇子-3",
    ],
  },
  {
    id: "product3",
    name: "景区特色纪念T恤",
    image: "/placeholder.svg?height=200&width=200&text=景区特色纪念T恤",
    price: 99,
    originalPrice: 129,
    rating: 4.7,
    reviews: 86,
    sold: 320,
    category: "服饰",
    description: "采用优质全棉面料，舒适透气，正面印有景区特色图案，背面有景区名称，是旅行纪念的绝佳选择。",
    specifications: [
      { name: "规格", value: "S/M/L/XL/XXL" },
      { name: "材质", value: "100%纯棉" },
      { name: "产地", value: "杭州" },
      { name: "洗涤说明", value: "30℃以下水温手洗，不可漂白" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=景区特色纪念T恤-1",
      "/placeholder.svg?height=400&width=400&text=景区特色纪念T恤-2",
      "/placeholder.svg?height=400&width=400&text=景区特色纪念T恤-3",
    ],
  },
  {
    id: "product4",
    name: "传统手工糕点礼盒",
    image: "/placeholder.svg?height=200&width=200&text=传统手工糕点礼盒",
    price: 88,
    originalPrice: 108,
    rating: 4.9,
    reviews: 215,
    sold: 876,
    category: "美食",
    description: "采用传统工艺制作的特色糕点，精选优质原料，不添加防腐剂，口感香甜松软，是馈赠亲友的佳品。",
    specifications: [
      { name: "规格", value: "12枚/盒" },
      { name: "保质期", value: "7天" },
      { name: "产地", value: "杭州" },
      { name: "储存方法", value: "常温避光保存" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=传统手工糕点礼盒-1",
      "/placeholder.svg?height=400&width=400&text=传统手工糕点礼盒-2",
      "/placeholder.svg?height=400&width=400&text=传统手工糕点礼盒-3",
    ],
  },
  {
    id: "product5",
    name: "当地特色茶具套装",
    image: "/placeholder.svg?height=200&width=200&text=当地特色茶具套装",
    price: 198,
    originalPrice: 258,
    rating: 4.8,
    reviews: 156,
    sold: 432,
    category: "工艺品",
    description: "精选优质陶瓷材料，传统手工制作，包含茶壶、茶杯、茶盘等全套茶具，是品茗和送礼的绝佳选择。",
    specifications: [
      { name: "规格", value: "一壶四杯一盘" },
      { name: "材质", value: "陶瓷" },
      { name: "产地", value: "景德镇" },
      { name: "包装", value: "精美礼盒装" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=当地特色茶具套装-1",
      "/placeholder.svg?height=400&width=400&text=当地特色茶具套装-2",
      "/placeholder.svg?height=400&width=400&text=当地特色茶具套装-3",
    ],
  },
  {
    id: "product6",
    name: "手工编织草帽",
    image: "/placeholder.svg?height=200&width=200&text=手工编织草帽",
    price: 45,
    originalPrice: 65,
    rating: 4.6,
    reviews: 78,
    sold: 256,
    category: "服饰",
    description: "采用天然草料手工编织，透气舒适，防晒效果好，是夏季旅游的必备单品。",
    specifications: [
      { name: "规格", value: "可调节大小" },
      { name: "材质", value: "天然草料" },
      { name: "产地", value: "杭州" },
      { name: "适用场景", value: "户外旅游、沙滩度假" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=手工编织草帽-1",
      "/placeholder.svg?height=400&width=400&text=手工编织草帽-2",
      "/placeholder.svg?height=400&width=400&text=手工编织草帽-3",
    ],
  },
  {
    id: "product7",
    name: "景区特色香囊",
    image: "/placeholder.svg?height=200&width=200&text=景区特色香囊",
    price: 35,
    originalPrice: 48,
    rating: 4.7,
    reviews: 92,
    sold: 378,
    category: "工艺品",
    description: "传统手工制作，内含天然香料，图案精美，既可作为装饰品，又有驱蚊提神的功效。",
    specifications: [
      { name: "规格", value: "8cm×10cm" },
      { name: "材质", value: "绸缎+天然香料" },
      { name: "产地", value: "苏州" },
      { name: "保质期", value: "2年" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=景区特色香囊-1",
      "/placeholder.svg?height=400&width=400&text=景区特色香囊-2",
      "/placeholder.svg?height=400&width=400&text=景区特色香囊-3",
    ],
  },
  {
    id: "product8",
    name: "当地特色小吃礼盒",
    image: "/placeholder.svg?height=200&width=200&text=当地特色小吃礼盒",
    price: 78,
    originalPrice: 98,
    rating: 4.9,
    reviews: 215,
    sold: 876,
    category: "美食",
    description: "精选当地多种特色小吃，独立包装，保证新鲜美味，是馈赠亲友的佳品。",
    specifications: [
      { name: "规格", value: "10种小吃/盒" },
      { name: "保质期", value: "15天" },
      { name: "产地", value: "杭州" },
      { name: "储存方法", value: "常温避光保存" },
    ],
    images: [
      "/placeholder.svg?height=400&width=400&text=当地特色小吃礼盒-1",
      "/placeholder.svg?height=400&width=400&text=当地特色小吃礼盒-2",
      "/placeholder.svg?height=400&width=400&text=当地特色小吃礼盒-3",
    ],
  },
]

export function Shop({ navigate }: ShopProps) {
  const [searchQuery, setSearchQuery] = useState("")
  // const [products, setProducts] = useState<Product[]>([])
  // const [categories, setCategories] = useState<ProductCategory[]>([])
  // const [loading, setLoading] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(1)
  // const [selectedCategory, setSelectedCategory] = useState("all")
  // const [sortBy, setSortBy] = useState<string>("default")
  // const [showFilter, setShowFilter] = useState(false)
  // const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  // const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // 获取商品列表
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await ShopService.getProducts({
  //         page: currentPage,
  //         pageSize: 10,
  //         category: selectedCategory !== "all" ? selectedCategory : undefined,
  //         keyword: searchQuery || undefined,
  //         sort: sortBy !== "default" ? sortBy as any : undefined,
  //         minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
  //         maxPrice: priceRange[1] < 1000 ? priceRange[1] : undefined,
  //         brandIds: selectedBrands.length > 0 ? selectedBrands : undefined,
  //       })
  //       setProducts(response.data)
  //       setTotalPages(response.totalPages)
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchProducts()
  // }, [currentPage, selectedCategory, searchQuery, sortBy, priceRange, selectedBrands])

  // 获取商品分类
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await ShopService.getProductCategories()
  //       setCategories(response)
  //     } catch (error) {
  //       console.error("Failed to fetch categories:", error)
  //     }
  //   }
  //
  //   fetchCategories()
  // }, [])

  // 处理搜索
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setCurrentPage(1)
  // }

  // 处理分类切换
  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category)
  //   setCurrentPage(1)
  // }

  // 处理排序方式切换
  // const handleSortChange = (sort: string) => {
  //   setSortBy(sort)
  //   setCurrentPage(1)
  // }

  // 处理价格范围变化
  // const handlePriceRangeChange = (range: [number, number]) => {
  //   setPriceRange(range)
  //   setCurrentPage(1)
  // }

  // 处理品牌选择
  // const handleBrandSelection = (brandId: string, selected: boolean) => {
  //   if (selected) {
  //     setSelectedBrands([...selectedBrands, brandId])
  //   } else {
  //     setSelectedBrands(selectedBrands.filter(id => id !== brandId))
  //   }
  //   setCurrentPage(1)
  // }

  // 重置筛选条件
  // const resetFilters = () => {
  //   setSelectedCategory("all")
  //   setSortBy("default")
  //   setPriceRange([0, 1000])
  //   setSelectedBrands([])
  //   setCurrentPage(1)
  // }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">景区商城</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigate("shopping-cart")}>
            <ShoppingBag size={18} />
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索商品"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="specialty">特产</TabsTrigger>
          <TabsTrigger value="crafts">工艺品</TabsTrigger>
          <TabsTrigger value="food">美食</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate("product-detail", { product })}
              >
                <div className="relative h-36">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.originalPrice > product.price && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {Math.round((product.price / product.originalPrice) * 10)}折
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-red-500 font-bold">¥{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-400 line-through text-xs ml-2">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <div className="flex items-center">
                      <Star size={12} className="text-yellow-500 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                    <span>已售{product.sold}件</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specialty" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts
              .filter((product) => product.category === "特产")
              .map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate("product-detail", { product })}
                >
                  <div className="relative h-36">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        {Math.round((product.price / product.originalPrice) * 10)}折
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-red-500 font-bold">¥{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-gray-400 line-through text-xs ml-2">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Star size={12} className="text-yellow-500 fill-current mr-1" />
                        <span>{product.rating}</span>
                      </div>
                      <span>已售{product.sold}件</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="crafts" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts
              .filter((product) => product.category === "工艺品")
              .map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate("product-detail", { product })}
                >
                  <div className="relative h-36">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        {Math.round((product.price / product.originalPrice) * 10)}折
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-red-500 font-bold">¥{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-gray-400 line-through text-xs ml-2">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Star size={12} className="text-yellow-500 fill-current mr-1" />
                        <span>{product.rating}</span>
                      </div>
                      <span>已售{product.sold}件</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="food" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts
              .filter((product) => product.category === "美食")
              .map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate("product-detail", { product })}
                >
                  <div className="relative h-36">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        {Math.round((product.price / product.originalPrice) * 10)}折
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-red-500 font-bold">¥{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-gray-400 line-through text-xs ml-2">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Star size={12} className="text-yellow-500 fill-current mr-1" />
                        <span>{product.rating}</span>
                      </div>
                      <span>已售{product.sold}件</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
