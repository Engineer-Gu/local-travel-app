"use client"

import { useState } from "react"
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { Screen } from "@/components/mobile-app"
// import { ShopService, CartItem } from "@/lib/services/shop-service"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  quantity: number
  selected: boolean
}

interface ShoppingCartProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function ShoppingCart({ goBack, navigate }: ShoppingCartProps) {
  // 模拟购物车数据
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "product1",
      name: "西湖龙井茶叶礼盒",
      image: "/placeholder.svg?height=80&width=80&text=西湖龙井茶叶礼盒",
      price: 128,
      originalPrice: 158,
      quantity: 1,
      selected: true,
    },
    {
      id: "product2",
      name: "手工丝绸扇子",
      image: "/placeholder.svg?height=80&width=80&text=手工丝绸扇子",
      price: 68,
      originalPrice: 88,
      quantity: 2,
      selected: true,
    },
    {
      id: "product3",
      name: "景区特色纪念T恤",
      image: "/placeholder.svg?height=80&width=80&text=景区特色纪念T恤",
      price: 99,
      originalPrice: 129,
      quantity: 1,
      selected: false,
    },
  ])

  // 全选状态
  const [selectAll, setSelectAll] = useState(false)
  // const [loading, setLoading] = useState(false)

  // 获取购物车数据
  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await ShopService.getCartItems()
  //       setCartItems(response)
  //       updateSelectAll(response)
  //     } catch (error) {
  //       console.error("Failed to fetch cart items:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchCartItems()
  // }, [])

  // 更新全选状态
  const updateSelectAll = (items: CartItem[]) => {
    setSelectAll(items.length > 0 && items.every((item) => item.selected))
  }

  // 初始化时检查全选状态
  useState(() => {
    updateSelectAll(cartItems)
  })

  // 切换全选
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    const updatedItems = cartItems.map((item) => ({
      ...item,
      selected: newSelectAll,
    }))
    setCartItems(updatedItems)
    setSelectAll(newSelectAll)

    // 调用API更新所有商品的选中状态
    // try {
    //   await ShopService.selectAllCartItems(newSelectAll)
    // } catch (error) {
    //   console.error("Failed to update selection:", error)
    // }
  }

  // 切换单个商品选择状态
  const toggleItemSelection = (id: string) => {
    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    setCartItems(updatedItems)
    updateSelectAll(updatedItems)

    // 调用API更新商品选中状态
    // try {
    //   const item = cartItems.find(item => item.id === id)
    //   if (item) {
    //     await ShopService.updateCartItemSelection(id, !item.selected)
    //   }
    // } catch (error) {
    //   console.error("Failed to update item selection:", error)
    // }
  }

  // 增加商品数量
  const increaseQuantity = (id: string) => {
    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    setCartItems(updatedItems)

    // 调用API更新商品数量
    // try {
    //   const item = updatedItems.find(item => item.id === id)
    //   if (item) {
    //     await ShopService.updateCartItemQuantity(id, item.quantity)
    //   }
    // } catch (error) {
    //   console.error("Failed to update quantity:", error)
    // }
  }

  // 减少商品数量
  const decreaseQuantity = (id: string) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
    )
    setCartItems(updatedItems)

    // 调用API更新商品数量
    // try {
    //   const item = updatedItems.find(item => item.id === id)
    //   if (item && item.quantity > 0) {
    //     await ShopService.updateCartItemQuantity(id, item.quantity)
    //   }
    // } catch (error) {
    //   console.error("Failed to update quantity:", error)
    // }
  }

  // 删除商品
  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    updateSelectAll(updatedItems)

    // 调用API删除商品
    // try {
    //   await ShopService.removeCartItem(id)
    // } catch (error) {
    //   console.error("Failed to remove item:", error)
    // }
  }

  // 计算选中商品总价
  const calculateTotal = () => {
    return cartItems.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // 计算选中商品数量
  const selectedCount = cartItems.filter((item) => item.selected).length

  // 结算
  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.selected)
    if (selectedItems.length === 0) {
      alert("请选择要结算的商品")
      return
    }

    // 创建订单
    // try {
    //   const orderData = {
    //     cartItemIds: selectedItems.map(item => item.id),
    //     addressId: "default", // 默认地址，实际应用中应该让用户选择
    //     paymentMethod: "wallet", // 默认支付方式，实际应用中应该让用户选择
    //   }
    //
    //   const orderResponse = await ShopService.createOrder(orderData)
    //
    //   navigate("payment", {
    //     orderId: orderResponse.orderId,
    //     items: selectedItems.map(item => ({
    //       id: item.id,
    //       name: item.name,
    //       price: item.price,
    //       quantity: item.quantity,
    //       image: item.image,
    //     })),
    //     totalAmount: calculateTotal(),
    //     orderType: "product",
    //   })
    // } catch (error) {
    //   console.error("Failed to create order:", error)
    // }

    navigate("payment", {
      items: selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: calculateTotal(),
      orderType: "product",
    })
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">购物车</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <p className="text-gray-500 mb-6">购物车空空如也，快去选购商品吧</p>
          <Button onClick={() => navigate("shop")}>去购物</Button>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <Checkbox id="select-all" checked={selectAll} onCheckedChange={toggleSelectAll} />
            <label htmlFor="select-all" className="ml-2 text-sm cursor-pointer">
              全选
            </label>
          </div>

          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <Checkbox
                      checked={item.selected}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                      className="mr-3"
                    />
                    <div className="w-16 h-16 rounded overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-red-500 font-bold">¥{item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-gray-400 line-through text-xs ml-2">¥{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0 text-gray-400"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 嵌入式结算栏 */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-sm">合计：</span>
                  <span className="text-red-500 font-bold text-lg ml-1">¥{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500">已选 {selectedCount} 件商品</div>
              </div>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-6"
                disabled={selectedCount === 0}
                onClick={handleCheckout}
              >
                结算({selectedCount})
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
