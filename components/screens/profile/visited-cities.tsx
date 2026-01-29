"use client"

import { useState } from "react"
import { ArrowLeft, Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/lib/navigation-types"
// import { userService } from "@/lib/services/user-service"

interface VisitedCitiesProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function VisitedCities({ goBack, navigate }: VisitedCitiesProps) {
  const [activeTab, setActiveTab] = useState("all")
  // const [cities, setCities] = useState<any[]>([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [searchText, setSearchText] = useState("")
  // const [stats, setStats] = useState<any>(null)

  // 从API获取城市数据
  /* useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true)
        const response = await userService.getVisitedCities({
          searchText: searchText || undefined,
          sortBy: activeTab === "recent" ? "date" : 
                 activeTab === "frequent" ? "visitCount" : 
                 activeTab === "top" ? "rating" : undefined
        })
        setCities(response)
        
        // 获取统计数据
        const statsResponse = await userService.getVisitedCityStats()
        setStats(statsResponse)
        
        setError(null)
      } catch (err) {
        setError("获取城市数据失败")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCities()
  }, [activeTab, searchText]) */

  // 模拟城市数据
  const cities = [
    {
      id: "city1",
      name: "杭州",
      image: "/placeholder.svg?height=120&width=320&text=杭州",
      visitDate: "2023-10-15",
      visitCount: 5,
      rating: 4.8,
      attractions: ["西湖", "灵隐寺", "西溪湿地", "宋城"],
      tags: ["自然", "文化", "美食"],
      notes: "西湖美景，令人流连忘返。",
    },
    {
      id: "city2",
      name: "苏州",
      image: "/placeholder.svg?height=120&width=320&text=苏州",
      visitDate: "2023-09-20",
      visitCount: 2,
      rating: 4.7,
      attractions: ["拙政园", "虎丘", "平江路", "金鸡湖"],
      tags: ["园林", "古镇", "小吃"],
      notes: "江南水乡，园林之美。",
    },
    {
      id: "city3",
      name: "上海",
      image: "/placeholder.svg?height=120&width=320&text=上海",
      visitDate: "2023-08-05",
      visitCount: 8,
      rating: 4.9,
      attractions: ["外滩", "南京路", "豫园", "迪士尼"],
      tags: ["现代", "购物", "娱乐"],
      notes: "现代都市，繁华璀璨。",
    },
    {
      id: "city4",
      name: "北京",
      image: "/placeholder.svg?height=120&width=320&text=北京",
      visitDate: "2023-07-10",
      visitCount: 3,
      rating: 4.8,
      attractions: ["故宫", "长城", "颐和园", "天坛"],
      tags: ["历史", "文化", "古迹"],
      notes: "历史悠久，文化底蕴深厚。",
    },
    {
      id: "city5",
      name: "成都",
      image: "/placeholder.svg?height=120&width=320&text=成都",
      visitDate: "2023-06-18",
      visitCount: 2,
      rating: 4.9,
      attractions: ["宽窄巷子", "锦里", "熊猫基地", "都江堰"],
      tags: ["美食", "休闲", "自然"],
      notes: "休闲生活，美食天堂。",
    },
    {
      id: "city6",
      name: "厦门",
      image: "/placeholder.svg?height=120&width=320&text=厦门",
      visitDate: "2023-05-22",
      visitCount: 1,
      rating: 4.7,
      attractions: ["鼓浪屿", "环岛路", "南普陀寺", "厦大"],
      tags: ["海岛", "文艺", "浪漫"],
      notes: "海岛风情，文艺小城。",
    },
    {
      id: "city7",
      name: "西安",
      image: "/placeholder.svg?height=120&width=320&text=西安",
      visitDate: "2023-04-15",
      visitCount: 1,
      rating: 4.6,
      attractions: ["兵马俑", "城墙", "大雁塔", "回民街"],
      tags: ["历史", "文化", "美食"],
      notes: "古都风韵，历史厚重。",
    },
    {
      id: "city8",
      name: "丽江",
      image: "/placeholder.svg?height=120&width=320&text=丽江",
      visitDate: "2023-03-10",
      visitCount: 1,
      rating: 4.8,
      attractions: ["古城", "玉龙雪山", "束河古镇", "拉市海"],
      tags: ["古镇", "自然", "民族"],
      notes: "古镇风情，雪山如画。",
    },
  ]

  // 按访问次数排序的城市
  const frequentCities = [...cities].sort((a, b) => b.visitCount - a.visitCount)

  // 按评分排序的城市
  const topRatedCities = [...cities].sort((a, b) => b.rating - a.rating)

  // 最近访问的城市
  const recentCities = [...cities].sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())

  // 处理搜索输入
  /* const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  } */

  // 处理添加新城市
  /* const handleAddCity = () => {
    navigate("add-visited-city")
  } */

  // 处理查看城市详情
  /* const handleViewCity = (cityId: string) => {
    navigate("city-detail", { cityId })
  } */

  // 处理分享城市
  /* const handleShareCity = async (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await userService.shareVisitedCity(cityId, "wechat")
      // 显示分享成功提示
    } catch (err) {
      console.error("分享失败", err)
    }
  } */

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">去过的城市</h1>
        {/* <Button variant="outline" size="sm" className="ml-auto" onClick={handleAddCity}>
          添加城市
        </Button> */}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索城市"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        // onChange={handleSearchChange}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="recent">最近</TabsTrigger>
          <TabsTrigger value="frequent">常去</TabsTrigger>
          <TabsTrigger value="top">高分</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </TabsContent>

        <TabsContent value="frequent" className="space-y-4">
          {frequentCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          {topRatedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-700 mb-2">旅行统计</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{cities.length}</div>
            <div className="text-xs text-gray-500">去过的城市</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {cities.reduce((sum, city) => sum + city.visitCount, 0)}
            </div>
            <div className="text-xs text-gray-500">总访问次数</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {(cities.reduce((sum, city) => sum + city.rating, 0) / cities.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">平均评分</div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CityCardProps {
  city: {
    id: string
    name: string
    image: string
    visitDate: string
    visitCount: number
    rating: number
    attractions: string[]
    tags: string[]
    notes: string
  }
  // onView?: (cityId: string) => void
  // onShare?: (cityId: string, e: React.MouseEvent) => void
}

function CityCard({ city }: CityCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32">
        <img src={city.image || "/placeholder.svg"} alt={city.name} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-blue-500">{city.rating}</Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{city.name}</h3>
          <Badge variant="outline" className="bg-blue-50">
            去过 {city.visitCount} 次
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Calendar size={14} className="mr-1" />
          <span>最近访问: {city.visitDate}</span>
        </div>

        <div className="mt-2">
          <div className="text-sm text-gray-600 flex items-start">
            <MapPin size={14} className="mr-1 mt-1 flex-shrink-0" />
            <span>{city.attractions.join(" · ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {city.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {city.notes && <p className="text-sm text-gray-500 mt-2 italic">"{city.notes}"</p>}

        {/* <div className="flex justify-end mt-3">
          <Button 
            size="sm" 
            variant="outline" 
            className="mr-2"
            onClick={(e) => onShare && onShare(city.id, e)}
          >
            分享
          </Button>
          <Button 
            size="sm" 
            onClick={() => onView && onView(city.id)}
          >
            查看详情
          </Button>
        </div> */}
      </CardContent>
    </Card>
  )
}
