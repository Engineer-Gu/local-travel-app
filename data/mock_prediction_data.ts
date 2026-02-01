
export interface NearbyPlace {
    id: string
    name: string
    type: "food" | "bar" | "tea" | "ktv" | "other"
    distance: string
    rating: number
    image: string
}

export interface CrowdStat {
    locationId: string
    locationName: string
    status: "smooth" | "moderate" | "congested"
    count: number
    trend: "up" | "down" | "stable"
}

export const MOCK_NEARBY_PLACES: NearbyPlace[] = [
    {
        id: "p1",
        name: "外婆家 (西湖店)",
        type: "food",
        distance: "500m",
        rating: 4.8,
        image: "/images/mock/food_1.png",
    },
    {
        id: "p2",
        name: "COMMUNE (嘉里中心店)",
        type: "bar",
        distance: "800m",
        rating: 4.6,
        image: "/images/mock/bar_1.png",
    },
    {
        id: "p3",
        name: "喜茶 (湖滨银泰店)",
        type: "tea",
        distance: "300m",
        rating: 4.9,
        image: "/images/mock/tea_1.png",
    },
    {
        id: "p4",
        name: "纯K (皇后公园店)",
        type: "ktv",
        distance: "1.2km",
        rating: 4.7,
        image: "/images/mock/ktv_1.png",
    },
]

export const MOCK_CROWD_STATS: CrowdStat = {
    locationId: "loc1",
    locationName: "西湖景区 (断桥残雪)",
    status: "moderate",
    count: 2450,
    trend: "up",
}
