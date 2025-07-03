"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, MapPin, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/components/mobile-app"
// import { userService } from "@/lib/services/user-service"

interface CompletedRoutesProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function CompletedRoutes({ goBack, navigate }: CompletedRoutesProps) {
  const [activeTab, setActiveTab] = useState("all")
  // const [routes, setRoutes] = useState<any[]>([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [searchText, setSearchText] = useState("")
  // const [stats, setStats] = useState<any>(null)

  // 从API获取路线数据
  /* useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true)
        const response = await userService.getCompletedRoutes({
          searchText: searchText || undefined,
          sortBy: activeTab === "recent" ? "date" : 
                 activeTab === "top" ? "rating" : 
                 activeTab === "social" ? "companions" : undefined
        })
        setRoutes(response)
        
        // 获取统计数据
        const statsResponse = await userService.getCompletedRouteStats()
        setStats(statsResponse)
        
        setError(null)
      } catch (err) {
        setError("获取路线数据失败")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchRoutes()
  }, [activeTab, searchText]) */

  // 模拟路线数据
  const routes = [
    {
      id: "route1",
      title: "西湖文化半日游",
      image: "/placeholder.svg?height=120&width=320&text=西湖文化半日游",
      completionDate: "2023-10-15",
      duration: "4小时",
      distance: "5.2公里",
      rating: 4.9,
      stops: ["西湖博物馆", "断桥", "平湖秋月", "楼外楼"],
      tags: ["文化", "自然", "美食"],
      companions: 2,
      photos: 15,
      notes: "西湖美景，令人流连忘返。",
    },
    {
      id: "route2",
      title: "城市中心一日游",
      image: "/placeholder.svg?height=120&width=320&text=城市中心一日游",
      completionDate: "2023-09-20",
      duration: "8小时",
      distance: "7.8公里",
      rating: 4.8,
      stops: ["人民广场", "历史博物馆", "老字号餐厅", "传统商业街", "城市公园", "特色小吃街"],
      tags: ["历史", "美食", "购物"],
      companions: 3,
      photos: 23,
      notes: "城市中心的历史与现代交融，体验丰富。",
    },
    {
      id: "route3",
      title: "古镇水乡一日游",
      image: "/placeholder.svg?height=120&width=320&text=古镇水乡一日游",
      completionDate: "2023-08-05",
      duration: "7小时",
      distance: "4.5公里",
      rating: 4.7,
      stops: ["古镇入口", "石桥", "水上集市", "传统民居", "手工艺坊", "水乡餐厅"],
      tags: ["古镇", "文化", "摄影"],
      companions: 4,
      photos: 32,
      notes: "江南水乡，小桥流水人家，古色古香。",
    },
    {
      id: "route4",
      title: "山林徒步探险",
      image: "/placeholder.svg?height=120&width=320&text=山林徒步探险",
      completionDate: "2023-07-10",
      duration: "5小时",
      distance: "8.3公里",
      rating: 4.6,
      stops: ["登山口", "观景台", "瀑布", "森林小径", "山顶"],
      tags: ["自然", "徒步", "探险"],
      companions: 5,
      photos: 28,
      notes: "山林徒步，呼吸新鲜空气，远离城市喧嚣。",
    },
    {
      id: "route5",
      title: "海滨度假休闲游",
      image: "/placeholder.svg?height=120&width=320&text=海滨度假休闲游",
      completionDate: "2023-06-18",
      duration: "6小时",
      distance: "3.2公里",
      rating: 4.9,
      stops: ["沙滩", "海鲜市场", "观景平台", "水上活动中心", "海滨餐厅"],
      tags: ["海滩", "美食", "休闲"],
      companions: 2,
      photos: 20,
      notes: "阳光沙滩，海鲜美食，完美的休闲时光。",
    },
    {
      id: "route6",
      title: "文艺小资半日游",
      image: "/placeholder.svg?height=120&width=320&text=文艺小资半日游",
      completionDate: "2023-05-22",
      duration: "4小时",
      distance: "3.5公里",
      rating: 4.7,
      stops: ["艺术区", "创意园区", "特色咖啡馆", "独立书店", "文创市集"],
      tags: ["文艺", "咖啡", "创意"],
      companions: 1,
      photos: 18,
      notes: "文艺小资的完美下午，咖啡与艺术的邂逅。",
    },
    {
      id: "route7",
      title: "乡村田园风光游",
      image: "/placeholder.svg?height=120&width=320&text=乡村田园风光游",
      completionDate: "2023-04-15",
      duration: "5小时",
      distance: "6.2公里",
      rating: 4.8,
      stops: ["农场", "果园", "乡村集市", "农家乐", "观景台"],
      tags: ["乡村", "自然", "美食"],
      companions: 3,
      photos: 25,
      notes: "回归自然，体验乡村生活的简单与美好。",
    },
    {
      id: "route8",
      title: "历史古迹探索之旅",
      image: "/placeholder.svg?height=120&width=320&text=历史古迹探索之旅",
      completionDate: "2023-03-10",
      duration: "6小时",
      distance: "5.8公里",
      rating: 4.8,
      stops: ["古城墙", "历史博物馆", "古代建筑群", "传统街区", "文物展览馆"],
      tags: ["历史", "文化", "建筑"],
      companions: 2,
      photos: 22,
      notes: "穿越历史长河，感受古代文明的魅力。",
    },
    {
      id: "route9",
      title: "现代都市夜景游",
      image: "/placeholder.svg?height=120&width=320&text=现代都市夜景游",
      completionDate: "2023-02-20",
      duration: "4小时",
      distance: "4.2公里",
      rating: 4.9,
      stops: ["城市广场", "滨江大道", "观景台", "特色餐厅", "酒吧街"],
      tags: ["夜景", "都市", "美食"],
      companions: 4,
      photos: 30,
      notes: "灯火璀璨的都市夜景，浪漫而迷人。",
    },
    {
      id: "route10",
      title: "温泉度假放松游",
      image: "/placeholder.svg?height=120&width=320&text=温泉度假放松游",
      completionDate: "2023-01-15",
      duration: "5小时",
      distance: "2.5公里",
      rating: 4.8,
      stops: ["温泉区", "休息区", "餐饮区", "按摩区", "娱乐区"],
      tags: ["温泉", "放松", "度假"],
      companions: 2,
      photos: 15,
      notes: "温泉度假，放松身心，享受惬意时光。",
    },
    {
      id: "route11",
      title: "主题公园欢乐游",
      image: "/placeholder.svg?height=120&width=320&text=主题公园欢乐游",
      completionDate: "2022-12-20",
      duration: "8小时",
      distance: "5.5公里",
      rating: 4.7,
      stops: ["入口广场", "冒险区", "幻想区", "科技区", "表演区", "美食区"],
      tags: ["娱乐", "刺激", "家庭"],
      companions: 5,
      photos: 35,
      notes: "欢乐刺激的主题公园之旅，充满欢笑。",
    },
    {
      id: "route12",
      title: "博物馆文化之旅",
      image: "/placeholder.svg?height=120&width=320&text=博物馆文化之旅",
      completionDate: "2022-11-15",
      duration: "6小时",
      distance: "3.8公里",
      rating: 4.6,
      stops: ["历史博物馆", "艺术博物馆", "科技博物馆", "文化展览中心", "特色餐厅"],
      tags: ["文化", "历史", "艺术"],
      companions: 1,
      photos: 20,
      notes: "沉浸在知识的海洋，感受文化的魅力。",
    },
  ]

  // 按评分排序的路线
  const topRatedRoutes = [...routes].sort((a, b) => b.rating - a.rating)

  // 最近完成的路线
  const recentRoutes = [...routes].sort(
    (a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime(),
  )

  // 按同伴数量排序的路线
  const mostCompanionsRoutes = [...routes].sort((a, b) => b.companions - a.companions)

  // 处理搜索输入
  /* const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  } */

  // 处理添加新路线
  /* const handleAddRoute = () => {
    navigate("add-completed-route")
  } */

  // 处理导出路线
  /* const handleExportRoute = async (routeId: string, format: 'gpx' | 'pdf', e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (format === 'gpx') {
        const data = await userService.exportRouteAsGPX(routeId)
        // 处理GPX数据下载
      } else {
        const data = await userService.exportRouteAsPDF(routeId)
        // 处理PDF数据下载
      }
    } catch (err) {
      console.error("导出失败", err)
    }
  } */

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">完成的路线</h1>
        {/* <Button variant="outline" size="sm" className="ml-auto" onClick={handleAddRoute}>
          添加路线
        </Button> */}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索路线"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          // onChange={handleSearchChange}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="recent">最近</TabsTrigger>
          <TabsTrigger value="top">高分</TabsTrigger>
          <TabsTrigger value="social">同伴</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} navigate={navigate} />
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentRoutes.map((route) => (
            <RouteCard key={route.id} route={route} navigate={navigate} />
          ))}
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          {topRatedRoutes.map((route) => (
            <RouteCard key={route.id} route={route} navigate={navigate} />
          ))}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          {mostCompanionsRoutes.map((route) => (
            <RouteCard key={route.id} route={route} navigate={navigate} />
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-700 mb-2">路线统计</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{routes.length}</div>
            <div className="text-xs text-gray-500">完成路线</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {routes.reduce((sum, route) => sum + Number.parseFloat(route.distance), 0).toFixed(1)}km
            </div>
            <div className="text-xs text-gray-500">总距离</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {routes.reduce((sum, route) => sum + route.photos, 0)}
            </div>
            <div className="text-xs text-gray-500">拍摄照片</div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RouteCardProps {
  route: {
    id: string
    title: string
    image: string
    completionDate: string
    duration: string
    distance: string
    rating: number
    stops: string[]
    tags: string[]
    companions: number
    photos: number
    notes: string
  }
  navigate: (screen: Screen, params?: Record<string, any>) => void
  // onExport?: (routeId: string, format: 'gpx' | 'pdf', e: React.MouseEvent) => void
}

function RouteCard({ route, navigate }: RouteCardProps) {
  const handleViewRoute = () => {
    // 构造路线详情对象
    const routeDetail = {
      id: route.id,
      title: route.title,
      image: route.image,
      duration: route.duration,
      budget: "¥300", // 假设的预算
      tags: route.tags,
      rating: route.rating,
      description: route.notes,
      stops: route.stops.map((stop, index) => ({
        time: `${9 + index}:00`,
        place: stop,
        activity: `游览${stop}`,
        duration: "1小时",
      })),
    }

    navigate("route-detail", { route: routeDetail })
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-32">
        <img src={route.image || "/placeholder.svg"} alt={route.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-blue-500">{route.rating}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{route.title}</h3>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            已完成
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Calendar size={14} className="mr-1" />
          <span className="mr-3">完成于: {route.completionDate}</span>
          <Clock size={14} className="mr-1" />
          <span>{route.duration}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="mr-3">{route.distance}</span>
          <Star size={14} className="mr-1" />
          <span>{route.photos}张照片</span>
        </div>

        <div className="mt-2">
          <div className="text-sm text-gray-600 flex items-start">
            <MapPin size={14} className="mr-1 mt-1 flex-shrink-0" />
            <span>{route.stops.join(" · ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {route.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="text-sm text-gray-500">
            <span>{route.companions}人同行</span>
          </div>
          <div className="flex">
            {/* <Button 
              size="sm" 
              variant="outline" 
              className="mr-2"
              onClick={(e) => onExport && onExport(route.id, 'gpx', e)}
            >
              导出GPX
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="mr-2"
              onClick={(e) => onExport && onExport(route.id, 'pdf', e)}
            >
              导出PDF
            </Button> */}
            <Button size="sm" variant="outline" onClick={handleViewRoute}>
              查看路线
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
