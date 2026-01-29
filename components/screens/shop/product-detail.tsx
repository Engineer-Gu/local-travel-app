"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, ShoppingCart, Minus, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Screen } from "@/lib/navigation-types"
// import { ShopService, Product, ProductReview } from "@/lib/services/shop-service"

import { ProductProps, ProductSpecification } from "@/lib/types"

export interface ProductDetailProps {
  product?: ProductProps
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
  addToCart?: (product: ProductProps, quantity: number) => void
}

export function ProductDetail({ product, goBack, navigate, addToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  // const [isFavorite, setIsFavorite] = useState(false)
  // const [productReviews, setProductReviews] = useState<ProductReview[]>([])
  // const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  // const [loading, setLoading] = useState(false)

  // 获取商品详情
  // useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     if (!product?.id) return
  //
  //     try {
  //       setLoading(true)
  //
  //       // 获取商品是否已收藏
  //       const favoriteResponse = await ShopService.checkProductFavorite(product.id)
  //       setIsFavorite(favoriteResponse.isFavorite)
  //
  //       // 获取商品评价
  //       const reviewsResponse = await ShopService.getProductReviews(product.id, {
  //         page: 1,
  //         pageSize: 10,
  //         sort: "time_desc"
  //       })
  //       setProductReviews(reviewsResponse.data)
  //
  //       // 获取相关商品
  //       const relatedResponse = await ShopService.getRelatedProducts(product.id, 6)
  //       setRelatedProducts(relatedResponse)
  //
  //     } catch (error) {
  //       console.error("Failed to fetch product details:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchProductDetails()
  // }, [product?.id])

  if (!product) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p>商品不存在</p>
        <Button onClick={goBack} className="mt-4">
          返回
        </Button>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // 收藏商品
  // const toggleFavorite = async () => {
  //   try {
  //     if (isFavorite) {
  //       await ShopService.unfavoriteProduct(product.id)
  //     } else {
  //       await ShopService.favoriteProduct(product.id)
  //     }
  //     setIsFavorite(!isFavorite)
  //   } catch (error) {
  //     console.error("Failed to toggle favorite:", error)
  //   }
  // }

  // 分享商品
  // const shareProduct = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: product.name,
  //       text: product.description,
  //       url: window.location.href,
  //     })
  //     .catch((error) => console.error("Error sharing:", error))
  //   } else {
  //     // 复制链接到剪贴板
  //     navigator.clipboard.writeText(window.location.href)
  //     .then(() => alert("链接已复制到剪贴板"))
  //     .catch((error) => console.error("Error copying link:", error))
  //   }
  // }

  // 修改handleAddToCart函数，确保购物车操作正确嵌入
  const handleAddToCart = () => {
    // 如果有传入的addToCart函数，则调用它
    if (addToCart) {
      addToCart(product, quantity)
    }

    // 调用API添加到购物车
    // try {
    //   await ShopService.addToCart({
    //     productId: product.id,
    //     quantity: quantity,
    //   })
    //   // 显示添加成功提示
    // } catch (error) {
    //   console.error("Failed to add to cart:", error)
    // }

    // 显示添加成功提示，使用内嵌提示而非alert
    navigate("shopping-cart")
  }

  // 修改handleBuyNow函数，确保支付页面正确嵌入
  const handleBuyNow = () => {
    // 创建订单并跳转到支付页面
    // try {
    //   const orderData = {
    //     products: [
    //       {
    //         productId: product.id,
    //         quantity: quantity,
    //       }
    //     ],
    //     addressId: "default", // 默认地址，实际应用中应该让用户选择
    //     paymentMethod: "wallet", // 默认支付方式，实际应用中应该让用户选择
    //   }
    //
    //   const orderResponse = await ShopService.createOrder(orderData)
    //
    //   navigate("payment", {
    //     orderId: orderResponse.orderId,
    //     items: [
    //       {
    //         id: product.id,
    //         name: product.name,
    //         price: product.price,
    //         quantity: quantity,
    //         image: product.image,
    //       },
    //     ],
    //     totalAmount: product.price * quantity,
    //     orderType: "product",
    //   })
    // } catch (error) {
    //   console.error("Failed to create order:", error)
    // }

    navigate("payment", {
      items: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image,
        },
      ],
      totalAmount: product.price * quantity,
      orderType: "product",
    })
  }

  return (
    <div className="pb-4">
      {/* 头部图片轮播 */}
      <div className="relative h-72">
        <img
          src={product.images[activeImageIndex] || product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/70 hover:bg-white/90 rounded-full"
          onClick={goBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button size="icon" variant="secondary" className="rounded-full bg-white/70 hover:bg-white/90">
            <Heart size={18} className="text-red-500" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white/70 hover:bg-white/90">
            <Share2 size={18} />
          </Button>
        </div>

        {/* 图片缩略图导航 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${activeImageIndex === index ? "bg-white" : "bg-white/50"
                } cursor-pointer`}
              onClick={() => setActiveImageIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* 商品信息 */}
      <div className="p-4 bg-white">
        <div className="flex items-center">
          <span className="text-red-500 text-xl font-bold">¥{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-sm ml-2">¥{product.originalPrice}</span>
          )}
          {product.originalPrice > product.price && (
            <Badge className="ml-2 bg-red-500">{Math.round((product.price / product.originalPrice) * 10)}折</Badge>
          )}
        </div>

        <h1 className="text-lg font-bold mt-2">{product.name}</h1>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-500 fill-current mr-1" />
            <span className="mr-2">{product.rating}</span>
            <span className="mr-2">{product.reviews}条评价</span>
          </div>
          <span>已售{product.sold}件</span>
        </div>
      </div>

      <div className="h-2 bg-gray-100"></div>

      {/* 商品详情选项卡 */}
      <Tabs defaultValue="detail" className="bg-white">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="detail">商品详情</TabsTrigger>
          <TabsTrigger value="specs">规格参数</TabsTrigger>
          <TabsTrigger value="reviews">用户评价</TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="p-4">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div className="mt-4 space-y-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${product.name}-${index + 1}`}
                className="w-full rounded-lg"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="p-4">
          <div className="space-y-3">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{spec.name}</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-xl font-bold mr-2">{product.rating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${star <= Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <span className="text-gray-500">{product.reviews}条评价</span>
          </div>

          <div className="space-y-4">
            {[
              {
                user: "用户1234",
                avatar: "/placeholder.svg?height=40&width=40&text=用户",
                rating: 5,
                date: "2023-11-15",
                content: "商品质量非常好，包装精美，送货速度快，非常满意的一次购物体验！",
                images: [
                  "/placeholder.svg?height=80&width=80&text=评价图1",
                  "/placeholder.svg?height=80&width=80&text=评价图2",
                ],
              },
              {
                user: "用户5678",
                avatar: "/placeholder.svg?height=40&width=40&text=用户",
                rating: 4,
                date: "2023-11-10",
                content: "商品不错，但是发货有点慢，希望下次能改进。",
                images: [],
              },
            ].map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                      <AvatarFallback>{review.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 font-medium">{review.user}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>

                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={`${star <= review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="mt-2 text-gray-700">{review.content}</p>

                {review.images.length > 0 && (
                  <div className="flex mt-2 space-x-2">
                    {review.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image || "/placeholder.svg"}
                        alt={`评价图片${imgIndex + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center mb-3">
          <Button variant="outline" size="icon" className="mr-3" onClick={() => navigate("shopping-cart")}>
            <ShoppingCart size={20} />
          </Button>

          <div className="flex items-center border rounded-md mr-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={decreaseQuantity}>
              <Minus size={16} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={increaseQuantity}>
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
            onClick={handleAddToCart}
          >
            加入购物车
          </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleBuyNow}>
            立即购买
          </Button>
        </div>
      </div>
    </div>
  )
}
