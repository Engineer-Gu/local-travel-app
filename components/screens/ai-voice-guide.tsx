"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Mic,
  MicOff,
  Languages,
  Map,
  Sparkles,
  Share2,
  Heart,
  BookmarkPlus,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"

interface AIVoiceGuideProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
  location?: {
    name: string
    description: string
    image: string
  }
  region?: {
    id: string
    name: string
    image: string
  }
  returnToPlanning?: boolean // 标记是否从规划页面跳转过来
  planningStep?: number // 规划页面的步骤
}

export function AIVoiceGuide({
  navigate,
  goBack,
  location,
  region,
  returnToPlanning,
  planningStep,
}: AIVoiceGuideProps) {
  const { toast } = useToast()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("中文")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isAnswering, setIsAnswering] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("intro")
  const [activeTab, setActiveTab] = useState("guide")
  const [selectedLocation, setSelectedLocation] = useState<any>(location)
  const [selectedRegion, setSelectedRegion] = useState<any>(region)
  const [searchQuery, setSearchQuery] = useState("")
  const [showLocationSelection, setShowLocationSelection] = useState(!location && selectedRegion)
  const [showRegionSelection, setShowRegionSelection] = useState(!region && !location)

  // 模拟音频播放的计时器
  const playTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 模拟地区数据列表
  const regions = [
    {
      id: "hangzhou",
      name: "杭州",
      description: "浙江省省会，有着'人间天堂'的美誉，西湖景区是世界文化遗产。",
      image: "/placeholder.svg?height=400&width=600&text=杭州风景",
      locationCount: 12,
    },
    {
      id: "suzhou",
      name: "苏州",
      description: "江苏省重要城市，以园林、丝绸、刺绣闻名，有'人间天堂'、'东方威尼斯'的美誉。",
      image: "/placeholder.svg?height=400&width=600&text=苏州风景",
      locationCount: 10,
    },
    {
      id: "beijing",
      name: "北京",
      description: "中国首都，拥有丰富的历史文化遗产，如故宫、长城等世界文化遗产。",
      image: "/placeholder.svg?height=400&width=600&text=北京风景",
      locationCount: 15,
    },
    {
      id: "shanghai",
      name: "上海",
      description: "中国最大的经济中心城市，国际化大都市，融合了东西方文化。",
      image: "/placeholder.svg?height=400&width=600&text=上海风景",
      locationCount: 14,
    },
    {
      id: "guangzhou",
      name: "广州",
      description: "广东省省会，中国南方重要的经济、文化中心，粤菜美食之都。",
      image: "/placeholder.svg?height=400&width=600&text=广州风景",
      locationCount: 9,
    },
    {
      id: "chengdu",
      name: "成都",
      description: "四川省省会，有着'天府之国'的美誉，是中国最佳旅游城市之一。",
      image: "/placeholder.svg?height=400&width=600&text=成都风景",
      locationCount: 11,
    },
  ]

  // 模拟景点数据列表 - 按地区组织
  const locationsByRegion = {
    hangzhou: [
      {
        id: "loc1",
        name: "西湖",
        description: "西湖，位于浙江省杭州市西湖区龙井路1号，是中国大陆首个世界遗产项目，也是中国十大风景名胜之一。",
        image: "/placeholder.svg?height=400&width=600&text=西湖风景",
        distance: "2.5公里",
        tags: ["5A景区", "世界遗产"],
        rating: 4.9,
      },
      {
        id: "loc2",
        name: "灵隐寺",
        description: "灵隐寺，又名云林寺，位于浙江省杭州市西湖区灵隐路法云弄1号，是中国佛教著名寺院。",
        image: "/placeholder.svg?height=400&width=600&text=灵隐寺风景",
        distance: "4.2公里",
        tags: ["5A景区", "寺庙"],
        rating: 4.7,
      },
      {
        id: "loc3",
        name: "千岛湖",
        description: "千岛湖，位于浙江省淳安县境内，是世界上岛屿最多的湖，也是中国最大的森林氧吧，国家5A级旅游景区。",
        image: "/placeholder.svg?height=400&width=600&text=千岛湖风景",
        distance: "150公里",
        tags: ["5A景区", "自然风光"],
        rating: 4.8,
      },
      {
        id: "loc4",
        name: "钱塘江",
        description: "钱塘江是浙江省最大的河流，世界闻名的钱塘江潮发生于此，是世界上最著名的涌潮之一。",
        image: "/placeholder.svg?height=400&width=600&text=钱塘江风景",
        distance: "6.8公里",
        tags: ["自然风光", "潮汐奇观"],
        rating: 4.6,
      },
      {
        id: "loc5",
        name: "宋城",
        description: "宋城位于杭州市西湖区之江路148号，是国家5A级旅游景区，中国首个大型历史文化主题公园。",
        image: "/placeholder.svg?height=400&width=600&text=宋城风景",
        distance: "8.5公里",
        tags: ["5A景区", "主题公园"],
        rating: 4.5,
      },
      {
        id: "loc6",
        name: "雷峰塔",
        description: "雷峰塔，位于西湖南岸夕照山上，始建于五代吴越国时期，是杭州西湖边的标志性建筑之一。",
        image: "/placeholder.svg?height=400&width=600&text=雷峰塔风景",
        distance: "3.1公里",
        tags: ["文化古迹", "塔"],
        rating: 4.6,
      },
    ],
    suzhou: [
      {
        id: "suz1",
        name: "拙政园",
        description: "拙政园是苏州最大的古典园林，也是中国四大名园之一，被誉为'园林之母'。",
        image: "/placeholder.svg?height=400&width=600&text=拙政园风景",
        distance: "1.5公里",
        tags: ["5A景区", "世界遗产"],
        rating: 4.8,
      },
      {
        id: "suz2",
        name: "狮子林",
        description: "狮子林是苏州四大名园之一，以假山著称，被誉为'假山王国'。",
        image: "/placeholder.svg?height=400&width=600&text=狮子林风景",
        distance: "2.2公里",
        tags: ["5A景区", "园林"],
        rating: 4.7,
      },
      {
        id: "suz3",
        name: "苏州博物馆",
        description: "苏州博物馆是由著名建筑大师贝聿铭设计的现代建筑，融合了传统与现代元素。",
        image: "/placeholder.svg?height=400&width=600&text=苏州博物馆风景",
        distance: "1.8公里",
        tags: ["博物馆", "现代建筑"],
        rating: 4.9,
      },
    ],
    beijing: [
      {
        id: "bj1",
        name: "故宫",
        description: "故宫是中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。",
        image: "/placeholder.svg?height=400&width=600&text=故宫风景",
        distance: "1.0公里",
        tags: ["5A景区", "世界遗产"],
        rating: 4.9,
      },
      {
        id: "bj2",
        name: "长城",
        description: "长城是中国古代的伟大防御工程，也是世界上最伟大的建筑之一。",
        image: "/placeholder.svg?height=400&width=600&text=长城风景",
        distance: "60公里",
        tags: ["5A景区", "世界遗产"],
        rating: 4.8,
      },
    ],
    // 其他地区的景点数据...
  }

  // 景点详细信息
  const spotDetails = {
    intro:
      "西湖三面环山，面积约6.39平方千米，南北长约3.2千米，东西宽约2.8千米。湖中被孤山、白堤、苏堤、杨公堤分隔，形成了外西湖、西里湖、北里湖、小南湖、岳湖等五片水面。",
    history:
      "西湖最早可追溯到秦朝，当时只是一个潟湖。南宋时期，杭州成为临时首都，西湖迎来了大规模的整治和建设。元朝时，西湖因淤塞几乎干涸。明朝时，杨孟瑛主持疏浚西湖，并建造了西湖现在的格局。",
    attractions:
      "西湖十景：苏堤春晓、曲院风荷、平湖秋月、断桥残雪、柳浪闻莺、花港观鱼、雷峰夕照、双峰插云、南屏晚钟、三潭印月。新西湖十景：云栖竹径、满陇桂雨、虎跑梦泉等。",
    tips: "最佳游览时间是春季(3-5月)和秋季(9-11月)。门票：西湖景区免费，但部分景点如雷峰塔、三潭印月等需单独购票。交通：可乘坐公交、地铁或步行前往。",
  }

  // 推荐问题及答案
  const recommendedQuestions = [
    {
      question: "西湖有什么特色美食？",
      answer:
        "西湖周边有许多特色美食，如西湖醋鱼、龙井虾仁、叫花鸡等。其中西湖醋鱼是杭州最著名的传统名菜，选用西湖特产的草鱼制作，口感鲜嫩，酸甜适中。此外，杭州还有东坡肉、宋嫂鱼羹、西湖藕粉等特色美食。",
    },
    {
      question: "最佳游览时间是什么时候？",
      answer:
        "西湖四季皆美，但最佳游览时间是春季(3-5月)和秋季(9-11月)。春季可以欣赏到桃花、梨花和杨柳；秋季则可以看到红枫和金黄的银杏。夏季荷花盛开，冬季则有雪景。不同季节有不同的美，建议根据个人喜好选择。",
    },
    {
      question: "有哪些著名景点？",
      answer:
        "西湖有十景和新十景。传统十景包括苏堤春晓、曲院风荷、平湖秋月、断桥残雪、柳浪闻莺、花港观鱼、雷峰夕照、双峰插云、南屏晚钟、三潭印月等；新十景包括云栖竹径、满陇桂雨、虎跑梦泉等。此外，雷峰塔、灵隐寺也是著名景点。",
    },
    {
      question: "西湖的历史背景是什么？",
      answer:
        "西湖历史悠久，早在秦朝就有记载。南宋时期，杭州成为临时首都，西湖文化达到鼎盛。历代文人墨客如苏轼、白居易等都曾在此留下诗词和治湖足迹。白居易任杭州刺史时疏浚西湖，修建白堤；苏轼任杭州知州时主持修建苏堤，并写下'欲把西湖比西子，淡妆浓抹总相宜'的名句。",
    },
    {
      question: "如何游览西湖最合理？",
      answer:
        "游览西湖可分为湖东、湖西、湖南、湖北和湖中五个区域。建议从湖东岸开始，沿着白堤、苏堤环湖一周，可以欣赏到西湖的主要景点。如果时间充裕，可以乘船游览，体验'舟行碧波上，人在画中游'的意境。也可以租自行车环湖骑行，既环保又能充分欣赏美景。",
    },
  ]

  // 模拟语音播放进度
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            toast({
              title: "播放完成",
              description: `${selectedLocation?.name || "景点"}的语音讲解已播放完毕`,
            })
            return 0
          }
          return prev + 0.5
        })
      }, 100)
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current)
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current)
      }
    }
  }, [isPlaying, selectedLocation?.name, toast])

  // 过滤搜索结果 - 地区
  const filteredRegions = regions.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 过滤搜索结果 - 景点
  const filteredLocations =
    selectedRegion && locationsByRegion[selectedRegion.id]
      ? locationsByRegion[selectedRegion.id].filter(
          (loc) =>
            loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loc.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : []

  // 选择地区
  const handleSelectRegion = (region: any) => {
    setSelectedRegion(region)
    setShowRegionSelection(false)
    setShowLocationSelection(true)
    setSearchQuery("")

    toast({
      title: "已选择地区",
      description: `正在加载${region.name}的景点列表`,
    })
  }

  // 选择景点
  const handleSelectLocation = (location: any) => {
    setSelectedLocation(location)
    setShowLocationSelection(false)

    toast({
      title: "已选择景点",
      description: `正在加载${location.name}的语音导览`,
    })
  }

  // 处理返回
  const handleBack = () => {
    // 如果是从规划页面跳转过来的，直接返回规划页面并传递步骤参数
    if (returnToPlanning) {
      // 直接使用goBack()返回上一页，而不是navigate
      goBack()
    } else {
      // 否则按照原来的逻辑处理
      if (showLocationSelection) {
        setShowRegionSelection(true)
        setShowLocationSelection(false)
        setSearchQuery("")
      } else if (!showRegionSelection && !showLocationSelection) {
        setShowLocationSelection(true)
        setIsPlaying(false)
        if (playTimerRef.current) {
          clearInterval(playTimerRef.current)
        }
      } else {
        goBack()
      }
    }
  }

  // 处理播放/暂停
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)

    toast({
      title: isPlaying ? "已暂停" : "正在播放",
      description: isPlaying ? "语音讲解已暂停" : `正在播放${selectedLocation?.name}景点讲解`,
    })
  }

  // 处理音量变化
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (isMuted && value[0] > 0) {
      setIsMuted(false)
    }
  }

  // 处理静音切换
  const handleToggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "已取消静音" : "已静音",
      description: isMuted ? "已恢复音量" : "已将音量设为0",
    })
  }

  // 处理语言切换
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
    setShowLanguageMenu(false)

    toast({
      title: "语言已切换",
      description: `已切换至${language}讲解`,
    })
  }

  // 处理查看地图
  const handleViewMap = () => {
    toast({
      title: "查看地图",
      description: `正在打开${selectedLocation?.name}的地图位置`,
    })
    navigate("ar-navigation", {
      destination: {
        name: selectedLocation?.name,
        distance: "500米",
        time: "10分钟",
      },
    })
  }

  // 处理语音提问
  const handleVoiceQuestion = () => {
    setIsListening(true)

    toast({
      title: "语音识别已开启",
      description: "请说出您想了解的问题",
    })

    // 模拟3秒后识别完成
    setTimeout(() => {
      setIsListening(false)
      setQuestion(`${selectedLocation?.name}有什么历史故事？`)

      toast({
        title: "语音识别完成",
        description: "已识别您的问题",
      })

      // 模拟AI回答
      setIsAnswering(true)
      setTimeout(() => {
        setAnswer(
          `${selectedLocation?.name}有许多著名的历史故事和传说。如果是西湖，最著名的包括'白蛇传'和'梁山伯与祝英台'。白蛇传讲述了白娘子与许仙在断桥相会的爱情故事；而'梁祝'则是中国四大民间传说之一，讲述了梁山伯与祝英台在西湖畔读书、相爱的凄美爱情故事。`,
        )
        setIsAnswering(false)

        toast({
          title: "AI回答完成",
          description: "您可以继续提问或收听景点讲解",
        })
      }, 2000)
    }, 3000)
  }

  // 处理推荐问题点击
  const handleRecommendedQuestion = (q: string, a: string) => {
    setQuestion(q)
    setIsAnswering(true)

    toast({
      title: "已选择问题",
      description: q,
    })

    setTimeout(() => {
      setAnswer(a)
      setIsAnswering(false)

      toast({
        title: "AI回答完成",
        description: "您可以继续提问或收听景点讲解",
      })
    }, 1500)
  }

  // 处理收藏/点赞
  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "已取消点赞" : "已点赞",
      description: isLiked ? `已取消对${selectedLocation?.name}的点赞` : `感谢您对${selectedLocation?.name}的喜爱`,
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "已取消收藏" : "已收藏",
      description: isBookmarked
        ? `已从收藏夹中移除${selectedLocation?.name}`
        : `已将${selectedLocation?.name}添加到收藏夹`,
    })
  }

  // 处理分享
  const handleShare = () => {
    toast({
      title: "分享功能",
      description: `正在分享${selectedLocation?.name}的语音导览`,
    })
  }

  // 处理展开/折叠内容区域
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // 处理标签切换
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // 模拟总时长(秒)
  const totalDuration = 180
  const currentTime = Math.floor((progress / 100) * totalDuration)

  // 渲染地区选择界面
  if (showRegionSelection) {
    return (
      <div className="pb-16">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold ml-2">选择地区</h1>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="搜索地区名称"
              className="w-full pl-10 pr-4 py-2 rounded-full border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 地区列表 */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mb-2">热门地区</h2>
            {filteredRegions.map((region) => (
              <Card
                key={region.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectRegion(region)}
              >
                <div className="flex">
                  <div className="w-1/3 h-24">
                    <img
                      src={region.image || "/placeholder.svg"}
                      alt={region.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="w-2/3 p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{region.name}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm">{region.locationCount}个景点</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{region.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 渲染景点选择界面
  if (showLocationSelection) {
    return (
      <div className="pb-16">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold ml-2">{selectedRegion?.name}景点</h1>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="搜索景点名称"
              className="w-full pl-10 pr-4 py-2 rounded-full border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 景点列表 */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mb-2">热门景点</h2>
            {filteredLocations.map((location) => (
              <Card
                key={location.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectLocation(location)}
              >
                <div className="flex">
                  <div className="w-1/3 h-24">
                    <img
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="w-2/3 p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{location.name}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm font-medium">{location.rating}</span>
                        <span className="text-yellow-500 ml-1">★</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{location.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-1">
                        {location.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{location.distance}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 渲染景点导览界面
  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold ml-2">AI语音导游</h1>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={isBookmarked ? "text-yellow-500" : ""}
          >
            <BookmarkPlus size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLike} className={isLiked ? "text-red-500" : ""}>
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      {/* 景点图片 */}
      <div className="relative">
        <img
          src={selectedLocation?.image || "/placeholder.svg"}
          alt={selectedLocation?.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-2xl font-bold">{selectedLocation?.name}</h2>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-4">
        <Tabs defaultValue="guide" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="guide">语音讲解</TabsTrigger>
            <TabsTrigger value="qa">智能问答</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {/* 播放控制 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={isPlaying ? "default" : "outline"}
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </Button>
                      <div>
                        <p className="text-sm font-medium">{selectedLocation?.name}景点讲解</p>
                        <p className="text-xs text-gray-500">
                          {formatTime(currentTime)} / {formatTime(totalDuration)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleViewMap}>
                      <Map size={16} className="mr-1" />
                      查看地图
                    </Button>
                  </div>

                  <Progress value={progress} className="h-1 mb-2" />

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleMute}>
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      className="flex-1"
                      onValueChange={handleVolumeChange}
                    />
                    <span className="text-xs text-gray-500 w-8">{isMuted ? 0 : volume}%</span>
                  </div>
                </div>

                {/* 语言选择 */}
                <div className="mb-6">
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full flex justify-between items-center"
                      onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    >
                      <div className="flex items-center">
                        <Languages size={16} className="mr-2" />
                        <span>当前语言: {currentLanguage}</span>
                      </div>
                      {showLanguageMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>

                    {showLanguageMenu && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10">
                        {["中文", "English", "日本語", "한국어", "Français"].map((lang) => (
                          <Button
                            key={lang}
                            variant="ghost"
                            className={`w-full justify-start rounded-none ${currentLanguage === lang ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                            onClick={() => handleLanguageChange(lang)}
                          >
                            {lang}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 景点详细信息 */}
                <div className="space-y-3">
                  {/* 景点介绍 */}
                  <Card className="overflow-hidden">
                    <div
                      className="p-3 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800"
                      onClick={() => toggleSection("intro")}
                    >
                      <h3 className="font-medium flex items-center">
                        <Info size={16} className="mr-2 text-blue-500" />
                        景点介绍
                      </h3>
                      {expandedSection === "intro" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {expandedSection === "intro" && (
                      <CardContent className="p-3 pt-0 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{spotDetails.intro}</p>
                      </CardContent>
                    )}
                  </Card>

                  {/* 历史背景 */}
                  <Card className="overflow-hidden">
                    <div
                      className="p-3 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800"
                      onClick={() => toggleSection("history")}
                    >
                      <h3 className="font-medium flex items-center">
                        <Info size={16} className="mr-2 text-amber-500" />
                        历史背景
                      </h3>
                      {expandedSection === "history" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {expandedSection === "history" && (
                      <CardContent className="p-3 pt-0 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{spotDetails.history}</p>
                      </CardContent>
                    )}
                  </Card>

                  {/* 著名景点 */}
                  <Card className="overflow-hidden">
                    <div
                      className="p-3 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800"
                      onClick={() => toggleSection("attractions")}
                    >
                      <h3 className="font-medium flex items-center">
                        <Info size={16} className="mr-2 text-green-500" />
                        著名景点
                      </h3>
                      {expandedSection === "attractions" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {expandedSection === "attractions" && (
                      <CardContent className="p-3 pt-0 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{spotDetails.attractions}</p>
                      </CardContent>
                    )}
                  </Card>

                  {/* 游览贴士 */}
                  <Card className="overflow-hidden">
                    <div
                      className="p-3 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800"
                      onClick={() => toggleSection("tips")}
                    >
                      <h3 className="font-medium flex items-center">
                        <Info size={16} className="mr-2 text-purple-500" />
                        游览贴士
                      </h3>
                      {expandedSection === "tips" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {expandedSection === "tips" && (
                      <CardContent className="p-3 pt-0 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{spotDetails.tips}</p>
                      </CardContent>
                    )}
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qa" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">智能问答</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    您可以通过语音或文字提问，AI导游将为您解答关于{selectedLocation?.name}的任何问题
                  </p>
                </div>

                {/* 问答区域 */}
                <div className="space-y-4">
                  {/* 语音提问按钮 */}
                  <Button
                    variant={isListening ? "default" : "outline"}
                    className="w-full flex items-center justify-center h-12"
                    onClick={handleVoiceQuestion}
                    disabled={isListening}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={18} className="mr-2 text-red-500 animate-pulse" />
                        正在聆听...点击停止
                      </>
                    ) : (
                      <>
                        <Mic size={18} className="mr-2" />
                        点击开始语音提问
                      </>
                    )}
                  </Button>

                  {/* 问题显示 */}
                  {question && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-medium">您的问题：</p>
                      <p className="text-sm">{question}</p>
                    </div>
                  )}

                  {/* 回答显示 */}
                  {(isAnswering || answer) && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Sparkles size={16} className="mr-1 text-green-500" />
                        <p className="text-sm font-medium">AI导游回答：</p>
                      </div>
                      {isAnswering ? (
                        <div className="flex space-x-1 mt-2">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      ) : (
                        <p className="text-sm">{answer}</p>
                      )}
                    </div>
                  )}

                  {/* 推荐问题 */}
                  <div>
                    <p className="text-sm font-medium mb-2">推荐问题：</p>
                    <div className="space-y-2">
                      {recommendedQuestions.map((item, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => handleRecommendedQuestion(item.question, item.answer)}
                        >
                          {item.question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
