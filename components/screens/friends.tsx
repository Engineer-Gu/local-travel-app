const Friends = () => {
  return <div>Friends</div>
}

export default Friends

// import { userService } from "@/lib/services/user-service"

// Add these functions inside the Friends component (commented out)
/*
  // 获取好友请求列表
  const fetchFriendRequests = async () => {
    try {
      setIsLoading(true)
      const requests = await api.get('/social/friend-requests')
      setFriendRequests(requests)
      setIsLoading(false)
    } catch (error) {
      console.error('获取好友请求失败', error)
      setIsLoading(false)
    }
  }

  // 接受好友请求
  const handleAcceptFriendRequest = async (requestId: string) => {
    try {
      await api.post(`/social/friend-requests/${requestId}/accept`)
      toast({
        title: "已接受好友请求",
        description: "你们现在是好友了",
      })
      fetchFriendRequests() // 刷新请求列表
      fetchFriendsList() // 刷新好友列表
    } catch (error) {
      console.error('接受好友请求失败', error)
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    }
  }

  // 拒绝好友请求
  const handleRejectFriendRequest = async (requestId: string) => {
    try {
      await api.post(`/social/friend-requests/${requestId}/reject`)
      toast({
        title: "已拒绝好友请求",
      })
      fetchFriendRequests() // 刷新请求列表
    } catch (error) {
      console.error('拒绝好友请求失败', error)
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    }
  }

  // 获取好友列表
  const fetchFriendsList = async () => {
    try {
      setIsLoading(true)
      const friends = await api.get('/social/friends')
      setFriends(friends)
      setIsLoading(false)
    } catch (error) {
      console.error('获取好友列表失败', error)
      setIsLoading(false)
    }
  }

  // 删除好友
  const handleRemoveFriend = async (friendId: string) => {
    try {
      await api.delete(`/social/friends/${friendId}`)
      toast({
        title: "已删除好友",
      })
      fetchFriendsList() // 刷新好友列表
    } catch (error) {
      console.error('删除好友失败', error)
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    }
  }
*/
