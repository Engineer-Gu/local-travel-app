# 随行伴 App 后端 API 详细需求文档

本文档详细描述了支持 App 所有功能所需的后端接口，包括交互流程、请求参数、返回数据格式。

---

## 一、用户认证与账号模块

### 1.1 用户注册
**前端交互**: 用户在注册页输入手机号 → 点击"获取验证码" → 输入验证码和密码 → 提交注册。

#### API 1: 发送验证码
- **请求**: `POST /api/auth/send-code`
- **参数**:
  ```json
  {
    "phone": "13800138000",
    "type": "register"  // register, login, reset_password
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "验证码已发送",
    "data": {
      "expireIn": 300  // 有效期（秒）
    }
  }
  ```

#### API 2: 手机号注册
- **请求**: `POST /api/auth/register`
- **参数**:
  ```json
  {
    "phone": "13800138000",
    "code": "123456",
    "password": "password123",
    "inviteCode": "ABC123"  // 可选：邀请码
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "注册成功",
    "data": {
      "userId": "user001",
      "token": "eyJhbGc...",
      "refreshToken": "refresh..."
    }
  }
  ```

### 1.2 用户登录
**前端交互**: 用户输入手机号和密码（或验证码）→ 点击登录。

#### API 3: 账号登录
- **请求**: `POST /api/auth/login`
- **参数** (支持两种方式):
  ```json
  // 密码登录
  {
    "phone": "13800138000",
    "password": "password123"
  }
  // 或验证码登录
  {
    "phone": "13800138000",
    "code": "123456"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "userId": "user001",
      "token": "eyJhbGc...",
      "refreshToken": "refresh...",
      "profile": {
        "nickname": "小顾",
        "avatar": "https://...",
        "phone": "138****8000"
      }
    }
  }
  ```

### 1.3 个人信息管理
**前端交互**: 用户在"个人中心"查看和编辑信息。

#### API 4: 获取个人信息
- **请求**: `GET /api/user/profile`
- **Header**: `Authorization: Bearer {token}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "userId": "user001",
      "nickname": "小顾",
      "avatar": "https://...",
      "phone": "138****8000",
      "gender": "male",
      "birthday": "1990-01-01",
      "city": "杭州",
      "bio": "摄影爱好者",
      "isVerified": false,
      "level": 3,
      "points": 1250,
      "balance": 88.50
    }
  }
  ```

#### API 5: 更新个人信息
- **请求**: `PUT /api/user/profile`
- **参数**:
  ```json
  {
    "nickname": "新昵称",
    "avatar": "https://...",
    "gender": "female",
    "birthday": "1995-06-15",
    "city": "上海",
    "bio": "热爱旅行"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

### 1.4 头像管理
**前端交互**: 用户选择图片 → 上传到云端 → 更新个人信息。

#### API 6: 上传头像
- **请求**: `POST /api/user/avatar/upload`
- **Header**: `Authorization: Bearer {token}`
- **参数** (multipart/form-data):
  ```
  file: File  // 图片文件
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "avatarUrl": "https://cdn.example.com/avatars/user001.jpg"
    }
  }
  ```

### 1.5 实名认证
**前端交互**: 用户上传身份证正反面照片 → 提交审核 → 等待后台审核。

#### API 7: 提交实名认证
- **请求**: `POST /api/user/verification/submit`
- **Header**: `Authorization: Bearer {token}`
- **参数**:
  ```json
  {
    "realName": "张三",
    "idNumber": "330102199001011234",
    "idFrontImage": "https://...",  // 身份证正面
    "idBackImage": "https://..."    // 身份证反面
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "verificationId": "verify001",
      "status": "pending"  // pending, approved, rejected
    }
  }
  ```

#### API 8: 获取实名认证状态
- **请求**: `GET /api/user/verification/status`
- **Header**: `Authorization: Bearer {token}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "status": "approved",  // none, pending, approved, rejected
      "realName": "张三",
      "rejectedReason": "",  // 拒绝原因（如果被拒绝）
      "submittedAt": "2024-01-20 10:00:00",
      "reviewedAt": "2024-01-20 15:00:00"
    }
  }
  ```

### 1.6 兴趣标签管理
**前端交互**: 用户在个人设置中选择兴趣标签,用于AI推荐匹配。

#### API 9: 获取可选兴趣标签
- **请求**: `GET /api/user/interests/options`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "categories": [
        {
          "category": "旅行偏好",
          "tags": ["自然风光", "历史文化", "美食探店", "摄影打卡", "户外运动"]
        },
        {
          "category": "出行方式",
          "tags": ["自驾游", "公共交通", "骑行", "徒步"]
        },
        {
          "category": "预算范围",
          "tags": ["经济型", "舒适型", "豪华型"]
        }
      ]
    }
  }
  ```

#### API 10: 设置用户兴趣标签
- **请求**: `PUT /api/user/interests`
- **Header**: `Authorization: Bearer {token}`
- **参数**:
  ```json
  {
    "interests": ["自然风光", "美食探店", "摄影打卡", "公共交通", "经济型"]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "兴趣标签更新成功"
  }
  ```

#### API 11: 获取用户兴趣标签
- **请求**: `GET /api/user/interests`
- **Header**: `Authorization: Bearer {token}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "interests": ["自然风光", "美食探店", "摄影打卡"]
    }
  }
  ```

### 1.7 每日签到
**前端交互**: 用户在首页点击"签到"按钮。

#### API 12: 每日签到
- **请求**: `POST /api/user/checkin`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "points": 15,
      "continuousDays": 3,
      "totalDays": 28
    }
  }
  ```

#### API 7: 获取签到状态
- **请求**: `GET /api/user/checkin/status`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "hasCheckedToday": false,
      "continuousDays": 2,
      "calendarData": [
        {"date": "2024-01-01", "checked": true},
        {"date": "2024-01-02", "checked": true}
      ]
    }
  }
  ```

### 1.7 密码管理
**前端交互**: 用户在设置中修改密码或通过验证码找回密码。

#### API 8: 修改密码
- **请求**: `PUT /api/auth/password`
- **Header**: `Authorization: Bearer {token}`
- **参数**:
  ```json
  {
    "oldPassword": "oldpassword123",
    "newPassword": "newpassword123"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "密码修改成功，请重新登录"
  }
  ```

#### API 9: 找回密码
- **请求**: `POST /api/auth/reset-password`
- **参数**:
  ```json
  {
    "phone": "13800138000",
    "code": "123456",
    "newPassword": "newpassword123"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "密码重置成功"
  }
  ```

### 1.8 Token管理
**前端交互**: Token过期时自动刷新，用户退出时清除Token。

#### API 10: 刷新Token
- **请求**: `POST /api/auth/refresh`
- **参数**:
  ```json
  {
    "refreshToken": "refresh_token_xxx"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "token": "new_access_token_xxx",
      "refreshToken": "new_refresh_token_xxx"
    }
  }
  ```

#### API 11: 退出登录
- **请求**: `POST /api/auth/logout`
- **Header**: `Authorization: Bearer {token}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "退出登录成功"
  }
  ```

### 1.9 账号注销
**前端交互**: 用户在设置中申请注销账号，需要验证身份。

#### API 12: 注销账号
- **请求**: `DELETE /api/user/account`
- **Header**: `Authorization: Bearer {token}`
- **参数**:
  ```json
  {
    "password": "password123",
    "reason": "不再使用"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "账号注销成功"
  }
  ```

---

## 二、首页模块

### 2.1 首页内容加载
**前端交互**: 用户打开 App，首页自动加载热门路线、本地玩家等内容。

#### API 8: 首页数据聚合
- **请求**: `GET /api/home/data`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "banners": [
        {
          "id": "banner1",
          "image": "https://...",
          "link": "/route/detail?id=123",
          "type": "route"
        }
      ],
      "popularRoutes": [
        {
          "id": "route1",
          "title": "西湖一日游",
          "image": "https://...",
          "rating": 4.8,
          "reviews": 256,
          "duration": "约6小时",
          "budget": "¥0-200",
          "tags": ["自然风光", "文化古迹"]
        }
      ],
      "localPlayers": [
        {
          "userId": "user002",
          "nickname": "小顾",
          "avatar": "https://...",
          "bio": "摄影爱好者，西湖达人",
          "routeCount": 12
        }
      ]
    }
  }
  ```

---

## 三、智能规划模块（核心功能）

### 3.1 规划流程
**前端交互** (3步流程):
1. **Step 1**: 用户选择城市和景点
2. **Step 2**: 设置出行偏好（时间、预算、兴趣标签）
3. **Step 3**: AI 生成多个路线方案，用户选择并保存

#### API 9: 获取城市列表
- **请求**: `GET /api/cities`
- **参数**: `?hot=true` (可选，仅返回热门城市)
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "id": "city001",
        "name": "杭州",
        "image": "https://...",
        "description": "人间天堂",
        "locationCount": 128
      }
    ]
  }
  ```

#### API 10: 获取景点/位置列表
- **请求**: `GET /api/locations`
- **参数**: `?cityId=city001&keyword=西湖`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "id": "loc001",
        "name": "西湖",
        "cityId": "city001",
        "category": "自然风光",
        "rating": 4.9,
        "image": "https://...",
        "tags": ["免费", "必游"],
        "latitude": 30.259,
        "longitude": 120.1388
      }
    ]
  }
  ```

#### API 11: 提交规划需求（AI生成路线）
- **请求**: `POST /api/planning/generate`
- **参数**:
  ```json
  {
    "cityId": "city001",
    "locationIds": ["loc001", "loc002"],  // 可选：指定景点
    "duration": "1天",
    "budgetType": "经济",  // 经济/舒适/豪华
    "interests": ["自然风光", "美食"],
    "travelDate": "2024-03-15",
    "companions": "情侣"  // 独自/情侣/家庭/朋友
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "taskId": "task123",  // 异步任务ID
      "status": "processing"
    }
  }
  ```

#### API 12: 获取规划结果
- **请求**: `GET /api/planning/result/{taskId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "status": "completed",  // processing, completed, failed
      "routes": [
        {
          "id": "route_gen_001",
          "title": "西湖文化深度一日游",
          "duration": "约8小时",
          "budget": "¥150",
          "budgetType": "经济",
          "aiRecommendation": "这条路线结合了西湖的自然美景和深厚的文化底蕴...",
          "stops": [
            {
              "time": "09:00",
              "place": "断桥残雪",
              "activity": "欣赏西湖十景之一",
              "duration": "1小时",
              "day": 1
            },
            {
              "time": "10:30",
              "place": "白堤",
              "activity": "沿湖漫步",
              "duration": "1.5小时",
              "day": 1
            }
          ],
          "dateInfo": [
            {
              "date": "2024-03-15",
              "dayOfWeek": "星期五",
              "day": 1
            }
          ]
        }
      ]
    }
  }
  ```

#### API 13: 保存路线到我的行程
- **请求**: `POST /api/routes/save`
- **参数**:
  ```json
  {
    "routeId": "route_gen_001",  // 生成的路线ID
    "customName": "我的西湖之旅"  // 可选：自定义名称
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "savedRouteId": "saved_route_001"
    }
  }
  ```

#### API 14: 我的行程列表
- **请求**: `GET /api/user/routes`
- **参数**: `?status=upcoming&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "routes": [
        {
          "id": "saved_route_001",
          "title": "我的西湖之旅",
          "cityName": "杭州",
          "date": "2024-03-15",
          "status": "upcoming",  // upcoming, completed, cancelled
          "coverImage": "https://...",
          "duration": "1天",
          "stopCount": 5
        }
      ],
      "total": 12
    }
  }
  ```

#### API 15: 行程详情
- **请求**: `GET /api/routes/{routeId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "id": "saved_route_001",
      "title": "我的西湖之旅",
      "cityId": "city001",
      "cityName": "杭州",
      "duration": "1天",
      "budget": "¥150",
      "budgetType": "经济",
      "date": "2024-03-15",
      "status": "upcoming",
      "aiRecommendation": "这条路线结合了西湖的自然美景...",
      "stops": [
        {
          "stopId": "stop001",
          "time": "09:00",
          "place": "断桥残雪",
          "placeId": "loc001",
          "activity": "欣赏西湖十景之一",
          "duration": "1小时",
          "day": 1,
          "images": ["https://..."],
          "tips": "早上人少,适合拍照"
        }
      ],
      "dateInfo": [
        {
          "date": "2024-03-15",
          "dayOfWeek": "星期五",
          "day": 1,
          "weather": "晴,15-22℃"
        }
      ],
      "createdAt": "2024-01-20 10:00:00",
      "updatedAt": "2024-01-20 15:00:00"
    }
  }
  ```

#### API 16: 更新行程
- **请求**: `PUT /api/routes/{routeId}`
- **参数**:
  ```json
  {
    "title": "修改后的标题",
    "date": "2024-03-20",
    "remark": "备注信息",
    "stops": [
      {
        "stopId": "stop001",  // 保留原有站点
        "time": "10:00"      // 修改时间
      },
      {
        "time": "14:00",     // 新增站点
        "placeId": "loc005",
        "activity": "品茶",
        "duration": "1小时"
      }
    ]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "行程更新成功"
  }
  ```

#### API 17: 删除行程
- **请求**: `DELETE /api/routes/{routeId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

#### API 18: 复制行程
- **请求**: `POST /api/routes/{routeId}/copy`
- **参数**:
  ```json
  {
    "newTitle": "西湖二日游",
    "date": "2024-04-01"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "newRouteId": "saved_route_002"
    }
  }
  ```

#### API 19: 分享行程
- **请求**: `POST /api/routes/{routeId}/share`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "shareUrl": "https://app.example.com/share/route/xxx",
      "shareCode": "ABC123",
      "qrCode": "https://cdn.example.com/qr/xxx.png"
    }
  }
  ```

#### API 20: 通过分享码导入行程
- **请求**: `POST /api/routes/import`
- **参数**:
  ```json
  {
    "shareCode": "ABC123"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "routeId": "saved_route_003",
      "message": "行程导入成功"
    }
  }
  ```

#### API 21: 标记行程状态
- **请求**: `PUT /api/routes/{routeId}/status`
- **参数**:
  ```json
  {
    "status": "completed"  // upcoming, completed, cancelled
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "状态更新成功"
  }
  ```

---

## 四、社交模块

### 4.1 好友系统
**前端交互**: 用户搜索 → 发送好友请求 → 对方接受 → 成为好友。

#### API 15: 搜索用户
- **请求**: `GET /api/social/users/search`
- **参数**: `?keyword=小顾&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "users": [
        {
          "userId": "user002",
          "nickname": "小顾",
          "avatar": "https://...",
          "city": "杭州",
          "isFriend": false,
          "mutualFriends": 3
        }
      ],
      "total": 15
    }
  }
  ```

#### API 16: 发送好友请求
- **请求**: `POST /api/social/friend-request`
- **参数**:
  ```json
  {
    "targetUserId": "user002",
    "message": "你好，我也喜欢摄影"
  }
  ```

#### API 17: 好友请求列表
- **请求**: `GET /api/social/friend-requests`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "requestId": "req001",
        "fromUser": {
          "userId": "user003",
          "nickname": "赵明",
          "avatar": "https://..."
        },
        "message": "一起去旅行吧",
        "mutualFriends": 3,
        "createdAt": "2024-01-20 10:30:00"
      }
    ]
  }
  ```

#### API 18: 处理好友请求
- **请求**: `PUT /api/social/friend-request/{requestId}`
- **参数**:
  ```json
  {
    "action": "accept"  // accept, reject
  }
  ```

#### API 19: 好友列表
- **请求**: `GET /api/social/friends`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "friends": [
        {
          "userId": "user002",
          "nickname": "小顾",
          "avatar": "https://...",
          "status": "online",  // online, offline
          "lastActive": "刚刚",
          "interests": ["摄影", "美食"]
        }
      ],
      "total": 38
    }
  }
  ```

#### API 22: 好友详情
- **请求**: `GET /api/social/friends/{userId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "userId": "user002",
      "nickname": "小顾",
      "avatar": "https://...",
      "city": "杭州",
      "bio": "摄影爱好者",
      "interests": ["摄影", "美食"],
      "isFriend": true,
      "isBlocked": false,
      "mutualFriends": 5,
      "routeCount": 12,
      "storyCount": 45,
      "becameFriendsAt": "2024-01-15 10:00:00"
    }
  }
  ```

#### API 23: 删除好友
- **请求**: `DELETE /api/social/friends/{userId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已删除好友"
  }
  ```

#### API 24: 拉黑用户
- **请求**: `POST /api/social/block`
- **参数**:
  ```json
  {
    "userId": "user003",
    "reason": "骚扰"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已拉黑该用户"
  }
  ```

#### API 25: 取消拉黑
- **请求**: `DELETE /api/social/block/{userId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已取消拉黑"
  }
  ```

#### API 26: 黑名单列表
- **请求**: `GET /api/social/blocked`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "userId": "user003",
        "nickname": "某用户",
        "avatar": "https://...",
        "blockedAt": "2024-01-20 10:00:00"
      }
    ]
  }
  ```

### 4.2 聊天功能
**前端交互**: 用户点击好友头像 → 进入聊天页面 → 发送消息。

#### API 20: 获取会话列表
- **请求**: `GET /api/chat/conversations`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "conversationId": "conv001",
        "user": {
          "userId": "user002",
          "nickname": "小顾",
          "avatar": "https://..."
        },
        "lastMessage": {
          "content": "明天一起去西湖吧",
          "time": "10:30",
          "unreadCount": 2
        }
      }
    ]
  }
  ```

#### API 21: 获取聊天记录
- **请求**: `GET /api/chat/messages`
- **参数**: `?conversationId=conv001&page=1&size=30`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "messages": [
        {
          "messageId": "msg001",
          "fromUserId": "user001",
          "toUserId": "user002",
          "type": "text",  // text, image, voice
          "content": "你好",
          "timestamp": "2024-01-20 10:25:30",
          "status": "read"
        }
      ]
    }
  }
  ```

#### API 22: 发送消息
- **请求**: `POST /api/chat/send`
- **参数**:
  ```json
  {
    "toUserId": "user002",
    "type": "text",
    "content": "明天一起去西湖吗？"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "messageId": "msg002",
      "timestamp": "2024-01-20 10:30:00"
    }
  }
  ```

#### API 27: 上传聊天媒体文件
- **请求**: `POST /api/chat/upload`
- **Header**: `Authorization: Bearer {token}`
- **参数** (multipart/form-data):
  ```
  file: File
  type: "image" | "voice" | "video"
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "fileUrl": "https://cdn.example.com/chat/xxx.jpg",
      "duration": 15  // 音视频时长（秒），图片时为null
    }
  }
  ```

#### API 28: 撤回消息
- **请求**: `DELETE /api/chat/messages/{messageId}/recall`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "消息已撤回"
  }
  ```

#### API 29: 标记消息已读
- **请求**: `PUT /api/chat/messages/read`
- **参数**:
  ```json
  {
    "conversationId": "conv001",
    "lastReadMessageId": "msg050"  // 标记到此消息之前的所有消息已读
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已标记为已读"
  }
  ```

#### API 30: 删除会话
- **请求**: `DELETE /api/chat/conversations/{conversationId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "会话已删除"
  }
  ```

#### API 31: 清空聊天记录
- **请求**: `DELETE /api/chat/conversations/{conversationId}/messages`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "聊天记录已清空"
  }
  ```

### 4.3 旅行故事/动态
**前端交互**: 用户发布图文动态 → 好友看到 → 点赞/评论。

#### API 23: 发布故事
- **请求**: `POST /api/stories/publish`
- **参数**:
  ```json
  {
    "content": "今天的西湖真美！",
    "images": ["https://...", "https://..."],
    "location": {
      "name": "西湖",
      "latitude": 30.259,
      "longitude": 120.1388
    },
    "visibility": "public"  // public, friends, private
  }
  ```

#### API 24: 动态信息流
- **请求**: `GET /api/stories/feed`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "storyId": "story001",
        "user": {
          "userId": "user002",
          "nickname": "小顾",
          "avatar": "https://..."
        },
        "content": "今天的西湖真美！",
        "images": ["https://..."],
        "location": "西湖",
        "likes": 25,
        "comments": 8,
        "isLiked": false,
        "createdAt": "2024-01-20 14:30:00"
      }
    ]
  }
  ```

#### API 25: 点赞/取消点赞
- **请求**: `POST /api/stories/{storyId}/like`
- **参数**:
  ```json
  {
    "action": "like"  // like, unlike
  }
  ```

#### API 26: 评论
- **请求**: `POST /api/stories/{storyId}/comment`
- **参数**:
  ```json
  {
    "content": "拍得真好！",
    "replyToCommentId": "comment001"  // 可选：回复某条评论
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "commentId": "comment002"
    }
  }
  ```

#### API 32: 动态详情
- **请求**: `GET /api/stories/{storyId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "storyId": "story001",
      "user": {
        "userId": "user002",
        "nickname": "小顾",
        "avatar": "https://..."
      },
      "content": "今天的西湖真美！",
      "images": [
        {
          "url": "https://...",
          "width": 1920,
          "height": 1080
        }
      ],
      "location": {
        "name": "西湖",
        "latitude": 30.259,
        "longitude": 120.1388
      },
      "visibility": "public",
      "likes": 25,
      "comments": 8,
      "isLiked": false,
      "isFavorited": false,
      "createdAt": "2024-01-20 14:30:00"
    }
  }
  ```

#### API 33: 编辑动态
- **请求**: `PUT /api/stories/{storyId}`
- **参数**:
  ```json
  {
    "content": "修改后的内容",
    "visibility": "friends"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "动态更新成功"
  }
  ```

#### API 34: 删除动态
- **请求**: `DELETE /api/stories/{storyId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "动态已删除"
  }
  ```

#### API 35: 获取评论列表
- **请求**: `GET /api/stories/{storyId}/comments`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "comments": [
        {
          "commentId": "comment001",
          "user": {
            "userId": "user003",
            "nickname": "赵明",
            "avatar": "https://..."
          },
          "content": "拍得真好！",
          "likes": 5,
          "isLiked": false,
          "replyTo": null,  // 如果是回复则显示被回复的评论信息
          "createdAt": "2024-01-20 15:00:00"
        }
      ],
      "total": 8
    }
  }
  ```

#### API 36: 删除评论
- **请求**: `DELETE /api/stories/{storyId}/comments/{commentId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "评论已删除"
  }
  ```

#### API 37: 评论点赞
- **请求**: `POST /api/stories/comments/{commentId}/like`
- **参数**:
  ```json
  {
    "action": "like"  // like, unlike
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "操作成功"
  }
  ```

#### API 38: 举报动态
- **请求**: `POST /api/stories/{storyId}/report`
- **参数**:
  ```json
  {
    "reason": "spam",  // spam, offensive, illegal, other
    "description": "广告内容"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "举报已提交,我们会尽快处理"
  }
  ```

#### API 39: 举报评论
- **请求**: `POST /api/stories/comments/{commentId}/report`
- **参数**:
  ```json
  {
    "reason": "offensive",
    "description": "恶意辱骂"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "举报已提交"
  }
  ```

---

## 五、导游服务模块

### 5.1 导游列表与预约
**前端交互**: 用户浏览导游列表 → 查看详情 → 点击"预约" → 填写日期和需求 → 支付。

#### API 27: 导游列表
- **请求**: `GET /api/guides`
- **参数**:
  ```query
  ?cityId=city001
  &specialty=历史文化
  &minRating=4.5
  &maxPrice=500
  &available=today
  &page=1
  &size=20
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "guides": [
        {
          "id": "guide001",
          "name": "陈导游",
          "avatar": "https://...",
          "rating": 4.9,
          "reviews": 128,
          "specialties": ["历史文化", "古建筑"],
          "experience": "5年导游经验",
          "price": 300,
          "priceUnit": "小时",
          "available": "今日可约",
          "languages": ["中文", "英文"],
          "certified": true
        }
      ],
      "total": 45
    }
  }
  ```

#### API 28: 导游详情
- **请求**: `GET /api/guides/{id}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "id": "guide001",
      "name": "陈导游",
      "avatar": "https://...",
      "rating": 4.9,
      "reviews": 128,
      "specialties": ["历史文化", "古建筑"],
      "experience": "5年导游经验",
      "price": 300,
      "introduction": "我从事导游工作5年，对杭州的历史文化非常了解...",
      "certificates": ["导游证", "讲解员证"],
      "servicesCount": 856,
      "availableDates": ["2024-03-15", "2024-03-16"]
    }
  }
  ```

#### API 29: 创建导游预约
- **请求**: `POST /api/guides/booking`
- **参数**:
  ```json
  {
    "guideId": "guide001",
    "date": "2024-03-15",
    "startTime": "09:00",
    "duration": 4,  // 小时
    "peopleCount": 2,
    "requirements": "希望重点讲解历史故事",
    "contactPhone": "13800138000"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orderId": "order_guide_001",
      "totalAmount": 1200,
      "paymentUrl": "..."
    }
  }
  ```

#### API 30: 导游评价
- **请求**: `POST /api/guides/{id}/review`
- **参数**:
  ```json
  {
    "orderId": "order_guide_001",
    "rating": 5,
    "content": "导游非常专业，讲解很有深度",
    "tags": ["知识丰富", "讲解生动"],
    "images": ["https://..."]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "评价成功"
  }
  ```

#### API 40: 我的导游预约列表
- **请求**: `GET /api/guides/bookings`
- **参数**: `?status=upcoming&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "bookings": [
        {
          "orderId": "order_guide_001",
          "guide": {
            "id": "guide001",
            "name": "陈导游",
            "avatar": "https://...",
            "rating": 4.9
          },
          "date": "2024-03-15",
          "startTime": "09:00",
          "duration": 4,
          "peopleCount": 2,
          "totalAmount": 1200,
          "status": "upcoming",  // pending, confirmed, completed, cancelled
          "createdAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 5
    }
  }
  ```

#### API 41: 导游预约详情
- **请求**: `GET /api/guides/bookings/{orderId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orderId": "order_guide_001",
      "guide": {
        "id": "guide001",
        "name": "陈导游",
        "avatar": "https://...",
        "phone": "138****8000",
        "rating": 4.9
      },
      "date": "2024-03-15",
      "startTime": "09:00",
      "duration": 4,
      "peopleCount": 2,
      "requirements": "希望重点讲解历史故事",
      "contactPhone": "13800138000",
      "totalAmount": 1200,
      "status": "confirmed",
      "paymentStatus": "paid",
      "meetingPoint": "西湖断桥",
      "createdAt": "2024-01-20 10:00:00",
      "confirmedAt": "2024-01-20 11:00:00"
    }
  }
  ```

#### API 42: 取消导游预约
- **请求**: `PUT /api/guides/bookings/{orderId}/cancel`
- **参数**:
  ```json
  {
    "reason": "行程变更"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "refundAmount": 1200,
      "message": "预约已取消，退款将在3-5个工作日内到账"
    }
  }
  ```

#### API 43: 收藏导游
- **请求**: `POST /api/guides/{id}/favorite`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "收藏成功"
  }
  ```

#### API 44: 取消收藏导游
- **请求**: `DELETE /api/guides/{id}/favorite`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已取消收藏"
  }
  ```

#### API 45: 我收藏的导游
- **请求**: `GET /api/guides/favorites`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "guides": [
        {
          "id": "guide001",
          "name": "陈导游",
          "avatar": "https://...",
          "rating": 4.9,
          "specialties": ["历史文化"],
          "price": 300,
          "favoritedAt": "2024-01-15 10:00:00"
        }
      ],
      "total": 8
    }
  }
  ```

---

## 六、商城模块

### 6.1 商品浏览与购买
**前端交互**: 用户浏览商品 → 查看详情 → 加入购物车 → 结算 → 支付。

#### API 31: 商品列表
- **请求**: `GET /api/shop/products`
- **参数**:
  ```query
  ?category=美食
  &keyword=龙井
  &sort=sales  // sales, price_asc, price_desc
  &page=1
  &size=20
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "products": [
        {
          "id": "prod001",
          "name": "西湖龙井茶叶礼盒",
          "image": "https://...",
          "price": 128,
          "originalPrice": 158,
          "rating": 4.9,
          "reviews": 256,
          "sold": 1024,
          "tags": ["热销", "包邮"]
        }
      ],
      "total": 150
    }
  }
  ```

#### API 32: 商品详情
- **请求**: `GET /api/shop/products/{id}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "id": "prod001",
      "name": "西湖龙井茶叶礼盒",
      "images": ["https://...", "https://..."],
      "price": 128,
      "originalPrice": 158,
      "stock": 500,
      "description": "明前龙井，香气浓郁...",
      "specifications": [
        {"name": "规格", "value": "250g/盒"},
        {"name": "产地", "value": "杭州西湖"}
      ],
      "rating": 4.9,
      "reviews": 256
    }
  }
  ```

#### API 33: 加入购物车
- **请求**: `POST /api/shop/cart/add`
- **参数**:
  ```json
  {
    "productId": "prod001",
    "quantity": 2
  }
  ```

#### API 34: 购物车列表
- **请求**: `GET /api/shop/cart`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "items": [
        {
          "cartItemId": "cart001",
          "product": {
            "id": "prod001",
            "name": "西湖龙井茶叶礼盒",
            "image": "https://...",
            "price": 128,
            "stock": 500
          },
          "quantity": 2,
          "selected": true
        }
      ],
      "totalAmount": 256,
      "selectedCount": 1
    }
  }
  ```

#### API 46: 更新购物车商品数量
- **请求**: `PUT /api/shop/cart/{cartItemId}`
- **参数**:
  ```json
  {
    "quantity": 3
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

#### API 47: 删除购物车商品
- **请求**: `DELETE /api/shop/cart/{cartItemId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已移除"
  }
  ```

#### API 48: 清空购物车
- **请求**: `DELETE /api/shop/cart/clear`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "购物车已清空"
  }
  ```

#### API 49: 商品收藏
- **请求**: `POST /api/shop/products/{productId}/favorite`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "收藏成功"
  }
  ```

#### API 50: 取消商品收藏
- **请求**: `DELETE /api/shop/products/{productId}/favorite`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已取消收藏"
  }
  ```

#### API 51: 我的商品收藏列表
- **请求**: `GET /api/shop/favorites`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "products": [
        {
          "id": "prod001",
          "name": "西湖龙井茶叶礼盒",
          "image": "https://...",
          "price": 128,
          "originalPrice": 158,
          "sold": 1024,
          "favoritedAt": "2024-01-15 10:00:00"
        }
      ],
      "total": 15
    }
  }
  ```

#### API 35: 创建订单
- **请求**: `POST /api/orders/create`
- **参数**:
  ```json
  {
    "type": "product",  // product, guide, ticket
    "items": [
      {
        "productId": "prod001",
        "quantity": 2
      }
    ],
    "addressId": "addr001",
    "couponId": "coupon001",  // 可选
    "remark": "请尽快发货"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orderId": "order001",
      "totalAmount": 256,
      "paymentUrl": "..."
    }
  }
  ```

#### API 36: 订单列表
- **请求**: `GET /api/orders`
- **参数**: `?status=pending&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orders": [
        {
          "orderId": "order001",
          "type": "product",
          "status": "pending",  // pending, paid, shipped, completed, cancelled
          "totalAmount": 256,
          "items": [
            {
              "productName": "西湖龙井茶叶礼盒",
              "image": "https://...",
              "quantity": 2,
              "price": 128
            }
          ],
          "createdAt": "2024-01-20 15:00:00"
        }
      ],
      "total": 25
    }
  }
  ```

#### API 52: 订单详情
- **请求**: `GET /api/orders/{orderId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orderId": "order001",
      "type": "product",
      "status": "shipped",
      "totalAmount": 256,
      "items": [...],
      "address": {
        "receiver": "张三",
        "phone": "13800138000",
        "address": "浙江省杭州市..."
      },
      "shipping": {
        "company": "顺丰",
        "trackingNumber": "SF123"
      }
    }
  }
  ```

#### API 53: 取消订单
- **请求**: `PUT /api/orders/{orderId}/cancel`
- **参数**:
  ```json
  {
    "reason": "不想要了"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "订单已取消"
  }
  ```

#### API 54: 确认收货
- **请求**: `PUT /api/orders/{orderId}/confirm`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "确认收货成功"
  }
  ```

#### API 55: 申请退款
- **请求**: `POST /api/orders/{orderId}/refund`
- **参数**:
  ```json
  {
    "reason": "商品损坏",
    "description": "包装破损",
    "images": ["https://..."]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "refundId": "refund001"
    }
  }
  ```

#### API 56: 商品评价
- **请求**: `POST /api/orders/{orderId}/review`
- **参数**:
  ```json
  {
    "productId": "prod001",
    "rating": 5,
    "content": "茶叶很好",
    "images": ["https://..."]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "评价成功"
  }
  ```

---

## 七、支付与钱包模块

#### API 37: 获取支付参数
- **请求**: `POST /api/payment/sign`
- **参数**:
  ```json
  {
    "orderId": "order001",
    "paymentMethod": "wechat"  // wechat, alipay, balance
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "paymentData": {
        // 微信/支付宝 SDK 所需参数
        "appId": "wx123",
        "partnerId": "...",
        "prepayId": "...",
        "sign": "..."
      }
    }
  }
  ```

#### API 38: 支付回调
- **请求**: `POST /api/payment/callback`
- **说明**: 由支付平台回调，后端接收并更新订单状态。

#### API 39: 钱包余额
- **请求**: `GET /api/wallet/balance`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "balance": 88.50,
      "points": 1250,
      "frozenAmount": 0
    }
  }
  ```

#### API 40: 钱包充值
- **请求**: `POST /api/wallet/recharge`
- **参数**:
  ```json
  {
    "amount": 100,
    "paymentMethod": "wechat"
  }
  ```

#### API 41: 钱包提现
- **请求**: `POST /api/wallet/withdraw`
- **参数**:
  ```json
  {
    "amount": 50,
    "bankCard": "6222****1234"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "withdrawId": "withdraw001",
      "status": "pending"
    }
  }
  ```

#### API 42: 交易记录
- **请求**: `GET /api/wallet/transactions`
- **参数**: `?type=all&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "transactions": [
        {
          "id": "trans001",
          "type": "recharge",  // recharge, withdraw, payment, refund, transfer
          "amount": 100,
          "status": "completed",
          "description": "充值",
          "createdAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 128
    }
  }
  ```

#### API 57: 交易详情
- **请求**: `GET /api/wallet/transactions/{transactionId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "id": "trans001",
      "type": "payment",
      "amount": 256,
      "status": "completed",
      "description": "购买商品",
      "relatedOrderId": "order001",
      "balanceBefore": 500,
      "balanceAfter": 244,
      "createdAt": "2024-01-20 10:00:00",
      "completedAt": "2024-01-20 10:00:05"
    }
  }
  ```

#### API 58: 优惠券列表
- **请求**: `GET /api/wallet/coupons`
- **参数**: `?status=available&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "coupons": [
        {
          "couponId": "coupon001",
          "name": "新人优惠券",
          "type": "discount",  // discount, cash
          "value": 20,
          "condition": 100,
          "description": "满100减20",
          "validFrom": "2024-01-01",
          "validTo": "2024-02-01",
          "status": "available"  // available, used, expired
        }
      ],
      "total": 8
    }
  }
  ```

#### API 59: 优惠券详情
- **请求**: `GET /api/wallet/coupons/{couponId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "couponId": "coupon001",
      "name": "新人优惠券",
      "type": "cash",
      "value": 20,
      "condition": 100,
      "description": "满100减20",
      "validFrom": "2024-01-01",
      "validTo": "2024-02-01",
      "status": "available",
      "applicableProducts": []  // 空数组表示全场通用
    }
  }
  ```

#### API 60: 积分明细
- **请求**: `GET /api/wallet/points/history`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "records": [
        {
          "id": "point001",
          "type": "earn",  // earn, spend
          "points": 15,
          "description": "每日签到",
          "createdAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 256,
      "currentPoints": 1250
    }
  }
  ```

#### API 61: 积分兑换商品列表
- **请求**: `GET /api/wallet/points/products`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "products": [
        {
          "id": "point_prod001",
          "name": "10元优惠券",
          "pointsCost": 500,
          "image": "https://...",
          "stock": 1000,
          "description": "全场通用"
        }
      ],
      "total": 20
    }
  }
  ```

#### API 62: 积分兑换
- **请求**: `POST /api/wallet/points/exchange`
- **参数**:
  ```json
  {
    "productId": "point_prod001",
    "quantity": 1
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "exchangeId": "exchange001",
      "pointsSpent": 500,
      "remainingPoints": 750,
      "message": "兑换成功,优惠券已发放"
    }
  }
  ```

---

## 八、AI 特色功能

#### API 43: AI 语音讲解
- **请求**: `GET /api/ai/voice-guide`
- **参数**: `?locationId=loc001`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "audioUrl": "https://...",
      "text": "西湖，位于浙江省杭州市...",
      "duration": 180  // 秒
    }
  }
  ```

#### API 44: AI 照片日记
- **请求**: `POST /api/ai/photo-diary`
- **参数** (multipart/form-data):
  ```
  images: [File, File, File]
  location: "杭州西湖"
  date: "2024-01-20"
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "diaryId": "diary001",
      "title": "西湖之行",
      "content": "今天来到了美丽的西湖，阳光洒在湖面上...",
      "images": [
        {
          "url": "https://...",
          "caption": "断桥残雪"
        }
      ]
    }
  }
  ```

#### API 45: AR 导航
- **请求**: `GET /api/ar/navigation`
- **参数**: `?from=lat,lng&to=lat,lng`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "path": [
        {"lat": 30.259, "lng": 120.138},
        {"lat": 30.260, " lng": 120.139}
      ],
      "arMarkers": [
        {
          "lat": 30.259,
          "lng": 120.138,
          "type": "landmark",
          "name": "断桥"
        }
      ]
    }
  }
  ```

---

## 九、其他功能模块

### 9.1 门票预订

#### API 46: 门票列表
- **请求**: `GET /api/tickets`
- **参数**: `?cityId=city001&keyword=灵隐寺`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "id": "ticket001",
        "name": "灵隐寺门票",
        "location": "灵隐寺",
        "price": 45,
        "originalPrice": 75,
        "image": "https://...",
        "validDays": 1
      }
    ]
  }
  ```

### 9.2 旅行日记
**前端交互**: 用户创建日记 → 上传照片 →编辑内容 → 发布或保存草稿。

#### API 47: 创建日记
- **请求**: `POST /api/diary/create`
- **参数**:
  ```json
  {
    "title": "杭州三日游",
    "content": "第一天我们去了西湖...",
    "images": ["https://...", "https://..."],
    "routeId": "route001",  // 可选：关联路线
    "locationIds": ["loc001", "loc002"],  // 可选：关联景点
    "visibility": "public",  // public, friends, private
    "isDraft": false
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "diaryId": "diary001"
    }
  }
  ```

#### API 48: 日记列表
- **请求**: `GET /api/diary/list`
- **参数**: `?userId=user001&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "diaries": [
        {
          "diaryId": "diary001",
          "title": "杭州三日游",
          "coverImage": "https://...",
          "preview": "第一天我们去了西湖...",
          "visibility": "public",
          "likes": 25,
          "comments": 8,
          "createdAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 15
    }
  }
  ```

#### API 63: 日记详情
- **请求**: `GET /api/diary/{diaryId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "diaryId": "diary001",
      "user": {
        "userId": "user001",
        "nickname": "小顾",
        "avatar": "https://..."
      },
      "title": "杭州三日游",
      "content": "第一天我们去了西湖...",
      "images": [
        {
          "url": "https://...",
          "caption": "西湖美景"
        }
      ],
      "routeId": "route001",
      "locations": [
        {
          "id": "loc001",
          "name": "西湖"
        }
      ],
      "visibility": "public",
      "likes": 25,
      "comments": 8,
      "isLiked": false,
      "createdAt": "2024-01-20 10:00:00",
      "updatedAt": "2024-01-20 15:00:00"
    }
  }
  ```

#### API 64: 编辑日记
- **请求**: `PUT /api/diary/{diaryId}`
- **参数**:
  ```json
  {
    "title": "修改后的标题",
    "content": "修改后的内容",
    "images": ["https://..."],
    "visibility": "friends"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

#### API 65: 删除日记
- **请求**: `DELETE /api/diary/{diaryId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

### 9.3 消息通知
**前端交互**: 用户查看通知列表 → 点击查看详情 → 标记已读或删除。

#### API 66: 通知列表
- **请求**: `GET /api/notifications`
- **参数**: `?type=all&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "notifications": [
        {
          "id": "notif001",
          "type": "system",  // system, interaction, order
          "title": "系统通知",
          "content": "您的订单已发货",
          "isRead": false,
          "relatedId": "order001",  // 关联的ID(订单/动态等)
          "createdAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 45,
      "unreadCount": 12
    }
  }
  ```

#### API 67: 未读消息数
- **请求**: `GET /api/notifications/unread-count`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 12,
      "system": 2,
      "interaction": 8,
      "order": 2
    }
  }
  ```

#### API 68: 标记已读
- **请求**: `PUT /api/notifications/read`
- **参数**:
  ```json
  {
    "notificationIds": ["notif001", "notif002"]  // 空数组表示全部标记为已读
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已标记为已读"
  }
  ```

#### API 69: 删除通知
- **请求**: `DELETE /api/notifications/{notificationId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

### 9.4 收藏与足迹
**前端交互**: 用户查看收藏的路线、已游玩的城市、获得的徽章等。

#### API 70: 收藏路线列表
- **请求**: `GET /api/user/favorites/routes`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "routes": [
        {
          "id": "route001",
          "title": "西湖一日游",
          "cityName": "杭州",
          "rating": 4.8,
          "image": "https://...",
          "favoritedAt": "2024-01-15 10:00:00"
        }
      ],
      "total": 18
    }
  }
  ```

#### API 71: 取消收藏路线
- **请求**: `DELETE /api/user/favorites/routes/{routeId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已取消收藏"
  }
  ```

#### API 72: 已游玩城市列表
- **请求**: `GET /api/user/visited-cities`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "cities": [
        {
          "cityId": "city001",
          "cityName": "杭州",
          "image": "https://...",
          "visitCount": 3,
          "lastVisitAt": "2024-01-15"
        }
      ],
      "totalCities": 8
    }
  }
  ```

#### API 73: 已完成路线列表
- **请求**: `GET /api/user/completed-routes`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "routes": [
        {
          "id": "route001",
          "title": "西湖一日游",
          "cityName": "杭州",
          "completedAt": "2024-01-15",
          "image": "https://..."
        }
      ],
      "total": 25
    }
  }
  ```

#### API 74: 成就徽章列表
- **请求**: `GET /api/user/badges`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "badges": [
        {
          "badgeId": "badge001",
          "name": "旅行达人",
          "description": "完成10次旅行",
          "icon": "https://...",
          "isUnlocked": true,
          "unlockedAt": "2024-01-15",
          "progress": "10/10"
        }
      ],
      "totalBadges": 20,
      "unlockedCount": 8
    }
  }
  ```

### 9.5 紧急求助

#### API 49: 发起紧急求助
- **请求**: `POST /api/emergency/help`
- **参数**:
  ```json
  {
    "type": "lost",  // lost, medical, accident
    "location": {
      "latitude": 30.259,
      "longitude": 120.138,
      "address": "杭州市西湖区..."
    },
    "description": "钱包丢失",
    "contactPhone": "13800138000"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "helpId": "help001",
      "emergencyContacts": [
        {
          "type": "police",
          "phone": "110",
          "name": "报警电话"
        },
        {
          "type": "medical",
          "phone": "120",
          "name": "急救电话"
        }
      ],
      "nearbyHelpers": [
        {
          "userId": "user005",
          "nickname": "热心市民",
          "distance": "0.5km"
        }
      ]
    }
  }
  ```

---

## 技术实现建议

### 后端架构
1. **后端框架**: Spring Boot (Java) / NestJS (Node.js) / Django (Python) / Gin (Go)
2. **数据库**: 
   - MySQL/PostgreSQL (主数据库)
   - Redis (缓存、会话管理)
   - MongoDB (聊天记录、日志)
3. **API文档**: Swagger/OpenAPI 规范
4. **实时通信**: WebSocket (聊天消息、通知推送)

### 第三方服务集成
1. **AI服务**: ChatGPT / Claude API / 文心一言 / 通义千问
2. **地图服务**: 高德地图 API / 百度地图 API
3. **支付**: 微信支付SDK / 支付宝SDK
4. **文件存储**: 阿里云OSS / AWS S3 / 腾讯云COS
5. **短信验证码**: 阿里云短信 / 腾讯云短信

### API设计规范
1. **RESTful风格**: 使用标准HTTP方法 (GET/POST/PUT/DELETE)
2. **统一返回格式**: 所有接口返回格式保持一致 `{code, message?, data}`
3. **分页参数**: 统一使用 `page` 和 `size` 参数
4. **认证方式**: Bearer Token (JWT)
5. **错误码规范**:
   - `200`: 成功
   - `400`: 请求参数错误
   - `401`: 未认证
   - `403`: 权限不足
   - `404`: 资源不存在
   - `500`: 服务器错误

### 性能优化建议
1. **缓存策略**: 热点数据(城市、景点列表)使用Redis缓存
2. **图片处理**: CDN加速 + 图片压缩
3. **数据库优化**: 为高频查询字段添加索引
4. **异步处理**: AI路线生成使用消息队列异步处理

### 安全建议
1. **数据加密**: 敏感信息(密码、身份证号)加密存储
2. **接口限流**: 防止恶意刷接口
3. **SQL注入防护**: 使用ORM或参数化查询
4. **XSS防护**: 用户输入内容需要过滤
5. **HTTPS**: 生产环境强制使用HTTPS

---

## API 总览

本文档共定义了 **74个核心API接口**,涵盖以下模块:

- **用户认证与账号** (12个): 注册、登录、密码管理、Token管理、账号注销等
- **个人信息与签到** (8个): 资料管理、头像上传、实名认证、兴趣标签、签到等
- **智能规划** (8个): 路线生成、行程管理(增删改查)、分享、复制等
- **社交功能** (14个): 好友管理、拉黑、聊天、消息管理等
- **动态/故事** (8个): 发布、编辑、删除、评论、点赞、举报等
- **导游服务** (7个): 列表、详情、预约、取消、评价、收藏等
- **商城购物** (12个): 商品浏览、购物车管理、订单、退款、评价、收藏等
- **支付与钱包** (9个): 支付、充值、提现、交易记录、优惠券、积分等
- **旅行日记** (5个): 创建、列表、详情、编辑、删除
- **消息通知** (4个): 列表、未读数、标记已读、删除
- **收藏与足迹** (5个): 收藏路线、已游城市、完成路线、成就徽章  
- **AI特色功能** (3个): 语音讲解、照片日记、AR导航
- **其他** (2个): 门票预订、紧急求助

所有接口均遵循RESTful规范,提供完整的请求参数和返回数据格式定义,确保前后端开发的顺利对接。
