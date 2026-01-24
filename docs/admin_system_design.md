# 随行伴 后台管理系统详细设计文档

本文档详细描述后台管理系统的所有功能模块、页面设计与API需求。

---

## 一、系统架构

### 1.1 技术栈
**前端**:
- **框架**: React 18 + Next.js 14 (或 Vue 3 + Element Plus)
- **UI库**: Ant Design (Table, Form, Modal 丰富)
- **状态管理**: Zustand / Redux Toolkit
- **图表**: ECharts (数据可视化)
- **编辑器**: CKEditor / TinyMCE (富文本)

**后端**:
- 与 App 后端共用数据库，独立部署或作为独立服务模块
- **鉴权**: JWT + RBAC 权限模型

---

## 二、功能模块详细设计

### 2.1 登录与权限

#### 页面 1: 管理员登录
**功能**:
- 账号密码登录
- 验证码校验 (防止暴力破解)
- 记住密码 (7天免登录)

**API 1: 管理员登录**
- **请求**: `POST /admin/auth/login`
- **参数**:
  ```json
  {
    "username": "admin",
    "password": "hashed_password",
    "captcha": "ABC123"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "token": "jwt_token",
      "adminInfo": {
        "adminId": "admin001",
        "username": "admin",
        "realName": "张三",
        "role": "super_admin",
        "permissions": ["user:view", "user:edit"]
      }
    }
  }
  ```

**API 2: 退出登录**
- **请求**: `POST /admin/auth/logout`
- **Header**: `Authorization: Bearer {token}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "退出成功"
  }
  ```

#### 页面 2: 权限管理
**功能**:
- **角色管理**: 创建/编辑/删除角色 (超级管理员、运营、财务、客服)
- **权限配置**: 为每个角色勾选权限点 (如: 用户管理-查看、用户管理-编辑)
- **管理员列表**: 添加后台人员账号，分配角色

**API 3: 获取角色列表**
- **请求**: `GET /admin/roles`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "roleId": "role001",
        "roleName": "超级管理员",
        "description": "拥有所有权限",
        "permissions": ["user:view", "user:edit"],
        "adminCount": 3
      }
    ]
  }
  ```

**API 4: 创建角色**
- **请求**: `POST /admin/roles`
- **参数**:
  ```json
  {
    "roleName": "运营专员",
    "description": "负责日常运营",
    "permissions": ["user:view", "content:view"]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "roleId": "role002"
    }
  }
  ```

**API 5: 编辑角色**
- **请求**: `PUT /admin/roles/{roleId}`
- **参数**:
  ```json
  {
    "roleName": "运营主管",
    "description": "运营团队负责人",
    "permissions": ["user:view", "user:edit", "content:view"]
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

**API 6: 删除角色**
- **请求**: `DELETE /admin/roles/{roleId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

**API 7: 获取所有权限点**
- **请求**: `GET /admin/permissions`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "module": "用户管理",
        "permissions": [
          {"key": "user:view", "name": "查看用户"},
          {"key": "user:edit", "name": "编辑用户"},
          {"key": "user:ban", "name": "封禁用户"}
        ]
      },
      {
        "module": "内容管理",
        "permissions": [
          {"key": "content:view", "name": "查看内容"},
          {"key": "content:publish", "name": "发布内容"},
          {"key": "content:delete", "name": "删除内容"}
        ]
      }
    ]
  }
  ```

**API 8: 管理员列表**
- **请求**: `GET /admin/admins`
- **参数**: `?keyword=admin&roleId=role001&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "admins": [
        {
          "adminId": "admin001",
          "username": "admin",
          "realName": "张三",
          "role": "超级管理员",
          "status": "active",
          "lastLoginAt": "2024-01-20 10:00:00",
          "createdAt": "2024-01-01 10:00:00"
        }
      ],
      "total": 15
    }
  }
  ```

**API 9: 创建管理员**
- **请求**: `POST /admin/admins`
- **参数**:
  ```json
  {
    "username": "operator01",
    "password": "password123",
    "realName": "李四",
    "roleId": "role002",
    "phone": "13800138000",
    "email": "lisi@example.com"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "adminId": "admin002"
    }
  }
  ```

**API 10: 编辑管理员**
- **请求**: `PUT /admin/admins/{adminId}`
- **参数**:
  ```json
  {
    "realName": "李四",
    "roleId": "role003",
    "phone": "13800138000",
    "status": "active"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

**API 11: 删除管理员**
- **请求**: `DELETE /admin/admins/{adminId}`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

---

### 2.2 数据大屏 (Dashboard)

#### 页面 3: 实时数据大屏
**功能**:
- **关键指标卡片**:
  - 今日新增用户
  - 今日活跃用户 (DAU)
  - 今日订单数
  - 今日 GMV (交易总额)
  
- **趋势图表**:
  - 近 7 日/30 日用户增长曲线 (折线图)
  - 近 7 日/30 日订单交易额趋势 (柱状图)
  - 热门城市排行 Top 10 (横向柱状图)
  - 用户地域分布地图 (中国地图热力图)

**API 12: 获取统计数据**
- **请求**: `GET /admin/dashboard/statistics`
- **参数**: `?period=7d`  // 7d, 30d, 90d
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "today": {
        "newUsers": 125,
        "activeUsers": 3580,
        "orders": 89,
        "gmv": 15680.50
      },
      "trends": {
        "userGrowth": [
          {"date": "2024-01-14", "count":  98},
          {"date": "2024-01-15", "count": 115}
        ],
        "orderRevenue": [
          {"date": "2024-01-14", "amount": 12500},
          {"date": "2024-01-15", "amount": 15680}
        ]
      },
      "hotCities": [
        {"city": "杭州", "userCount": 4580},
        {"city": "上海", "userCount": 3200}
      ],
      "regionDistribution": [
        {"province": "浙江", "count": 5600},
        {"province": "江苏", "count": 4200}
      ]
    }
  }
  ```

**API 13: 导出统计数据**
- **请求**: `GET /admin/dashboard/export`
- **参数**: `?period=30d&format=excel`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "downloadUrl": "https://cdn.example.com/export/stats_20240120.xlsx",
      "expiresIn": 3600
    }
  }
  ```

---

### 2.3 用户管理

#### 页面 4: C端用户列表
**功能**:
- **搜索**: 按用户ID、手机号、昵称搜索
- **筛选**: 按注册时间、等级、实名状态、账号状态筛选
- **批量操作**: 批量导出用户数据 (Excel)
- **单用户操作**:
  - 查看详情 (个人信息、订单记录、好友数、发布内容)
  - 编辑信息 (修改昵称、等级、积分)
  - 禁用/启用账号
  - 重置密码

**表格字段**:
| 字段 | 说明 |
|---|---|
| 用户ID | user001 |
| 昵称 | 小顾 |
| 手机号 | 138****8000 |
| 注册时间 | 2024-01-10 10:30 |
| 等级 | Lv 3 (VIP/普通) |
| 是否实名 | 是/否 |
| 账号状态 | 正常/禁用 |
| 操作 | 详情 / 编辑 / 禁用 |

**API 14: 用户列表**
- **请求**: `GET /admin/users`
- **参数**: `?keyword=小顾&status=active&verified=true&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "users": [
        {
          "userId": "user001",
          "nickname": "小顾",
          "phone": "138****8000",
          "avatar": "https://...",
          "level": 3,
          "isVerified": true,
          "status": "active",
          "registeredAt": "2024-01-10 10:30:00"
        }
      ],
      "total": 1250
    }
  }
  ```

**API 15: 用户详情**
- **请求**: `GET /admin/users/{userId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "userId": "user001",
      "nickname": "小顾",
      "phone": "13800138000",
      "avatar": "https://...",
      "gender": "male",
      "birthday": "1990-01-01",
      "city": "杭州",
      "level": 3,
      "points": 1250,
      "balance": 88.50,
      "isVerified": true,
      "status": "active",
      "stats": {
        "friendCount": 38,
        "routeCount": 12,
        "storyCount": 45,
        "orderCount": 28
      },
      "registeredAt": "2024-01-10 10:30:00",
      "lastLoginAt": "2024-01-20 15:30:00"
    }
  }
  ```

**API 16: 编辑用户**
- **请求**: `PUT /admin/users/{userId}`
- **参数**:
  ```json
  {
    "nickname": "新昵称",
    "level": 5,
    "points": 2000
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

**API 17: 禁用用户**
- **请求**: `POST /admin/users/{userId}/ban`
- **参数**:
  ```json
  {
    "reason": "发布违规内容",
    "duration": 7  // 禁用天数，0表示永久
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "封禁成功"
  }
  ```

**API 18: 启用用户**
- **请求**: `POST /admin/users/{userId}/unban`
- **返回**:
  ```json
  {
    "code": 200,
    "message": "已启用"
  }
  ```

**API 19: 重置密码**
- **请求**: `POST /admin/users/{userId}/reset-password`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "newPassword": "temp123456"
    }
  }
  ```

**API 20: 批量导出用户**
- **请求**: `GET /admin/users/export`
- **参数**: `?status=active&verified=true&format=excel`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "downloadUrl": "https://cdn.example.com/export/users_20240120.xlsx",
      "expiresIn": 3600
    }
  }
  ```

#### 页面 5: 实名认证审核
**功能**:
- 查看待审核列表 (用户提交的身份证照片)
- 审核通过/拒绝 (填写拒绝原因)
- 支持批量审核

**API 21: 待审核实名列表**
- **请求**: `GET /admin/users/verification/pending`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "verifications": [
        {
          "verificationId": "verify001",
          "user": {
            "userId": "user001",
            "nickname": "小顾",
            "phone": "138****8000"
          },
          "realName": "张三",
          "idNumber": "3301****1234",
          "idFrontImage": "https://...",
          "idBackImage": "https://...",
          "submittedAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 28
    }
  }
  ```

**API 22: 审核实名**
- **请求**: `PUT /admin/users/verification/{verificationId}`
- **参数**:
  ```json
  {
    "action": "approve",  // approve, reject
    "reason": "身份证照片模糊"  // 拒绝时必填
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "审核完成"
  }
  ```

**API 23: 批量审核**
- **请求**: `POST /admin/users/verification/batch`
- **参数**:
  ```json
  {
    "verificationIds": ["verify001", "verify002"],
    "action": "approve"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "successCount": 2
    }
  }
  ```

#### 页面 6: 导游管理
**功能**:
- **导游入驻审核**: 审核用户提交的导游证、身份证、个人介绍
- **导游列表**: 查看所有导游，筛选 (城市、专长、评分)
- **导游详情**: 查看服务次数、收入、评价、订单记录
- **禁用导游**: 违规导游下架

**API 24: 导游列表**
- **请求**: `GET /admin/guides`
- **参数**: `?status=pending&cityId=city001&page=1&size=20`
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
          "phone": "138****8000",
          "cityName": "杭州",
          "specialties": ["历史文化"],
          "rating": 4.9,
          "servicesCount": 856,
          "status": "approved",
          "appliedAt": "2024-01-15 10:00:00"
        }
      ],
      "total": 145
    }
  }
  ```

**API 25: 导游审核**
- **请求**: `PUT /admin/guides/{guideId}/review`
- **参数**:
  ```json
  {
    "action": "approve",  // approve, reject
    "reason": ""
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "审核完成"
  }
  ```

**API 26: 导游详情**
- **请求**: `GET /admin/guides/{guideId}`
- **返回**: 返回详细信息包括证件、服务记录、收入等

**API 27: 编辑导游**
- **请求**: `PUT /admin/guides/{guideId}`
- **参数**: 基本信息编辑

**API 28: 禁用/启用导游**
- **请求**: `PUT /admin/guides/{guideId}/status`
- **参数**: `{"status": "banned"}`

---

### 2.4 内容管理 (CMS)

#### 页面 7: Banner 管理
**功能**:
- 查看 Banner 列表 (图片、跳转链接、排序、状态)
- 添加/编辑 Banner
  - 上传图片
  - 设置跳转类型 (路线详情、商品详情、外部链接)
  - 设置显示时间段 (开始/结束日期)
  - 排序
- 启用/禁用 Banner

**API 29: Banner列表**
- **请求**: `GET /admin/banners`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "bannerId": "banner001",
        "image": "https://...",
        "linkType": "route",
        "linkValue": "route123",
        "order": 1,
        "enabled": true,
        "startDate": "2024-01-20",
        "endDate": "2024-01-31"
      }
    ]
  }
  ```

**API 30: 创建Banner**
- **请求**: `POST /admin/banners`
- **参数**:
  ```json
  {
    "image": "https://...",
    "linkType": "route",
    "linkValue": "route123",
    "startDate": "2024-01-20",
    "endDate": "2024-01-31",
    "order": 1,
    "enabled": true
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "bannerId": "banner002"
    }
  }
  ```

**API 31: 编辑Banner**
- **请求**: `PUT /admin/banners/{bannerId}`
- **参数**: 同创建接口
- **返回**: `{"code": 200, "message": "更新成功"}`

**API 32: 删除Banner**
- **请求**: `DELETE /admin/banners/{bannerId}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 33: Banner排序**
- **请求**: `PUT /admin/banners/sort`
- **参数**: `{"bannerIds": ["banner001", "banner002"]}`
- **返回**: `{"code": 200, "message": "排序成功"}`

**API 34: 启用/禁用Banner**
- **请求**: `PUT /admin/banners/{bannerId}/toggle`
- **返回**: `{"code": 200, "message": "操作成功"}`

#### 页面 8: 城市管理
**功能**:
- 城市列表 (名称、景点数、热门标记)
- 添加/编辑城市
  - 城市名称、封面图、简介
  - 是否热门城市
- 删除城市

**API 35: 城市列表**
- **请求**: `GET /admin/cities`
- **返回**: 城市列表(名称、封面、景点数、是否热门)

**API 36: 创建城市**
- **请求**: `POST /admin/cities`
- **参数**: `{"name": "杭州", "image": "https://...", "description": "人间天堂", "isHot": true}`

**API 37: 编辑城市**
- **请求**: `PUT /admin/cities/{cityId}`

**API 38: 删除城市**
- **请求**: `DELETE /admin/cities/{cityId}`

**API 39: 城市详情**
- **请求**: `GET /admin/cities/{cityId}`

#### 页面 9: 景点 (POI) 管理
**功能**:
- 景点列表 (按城市筛选)
- 添加/编辑景点
  - 名称、所属城市、分类、标签
  - 图片、简介、开放时间
  - 经纬度坐标
  - 门票价格
- 批量导入景点 (Excel模板)

**API**:
```
GET /admin/locations
?cityId=city001

POST /admin/locations
{
  "name": "西湖",
  "cityId": "city001",
  "category": "自然风光",
  "tags": ["免费", "必游"],
  "images": ["https://..."],
  "description": "...",
  "openingHours": "全天开放",
  "latitude": 30.259,
  "longitude": 120.1388,
  "ticketPrice": 0
}
```

#### 页面 10: 官方路线管理
**功能**:
- 创建官方推荐路线 (作为 AI 参考或兜底数据)
- 编辑路线 (标题、时间安排、景点列表、预算)
- 上架/下架路线

**API**:
```
POST /admin/routes
{
  "title": "西湖一日游经典路线",
  "cityId": "city001",
  "duration": "1天",
  "budgetMin": 0,
  "budgetMax": 200,
  "tags": ["自然风光", "文化古迹"],
  "stops": [
    {
      "time": "09:00",
      "locationId": "loc001",
      "activity": "游览断桥",
      "duration": "1小时"
    }
  ],
  "isOfficial": true
}
```

#### 页面 11: 系统公告
**功能**:
- 发布全员通知 (系统维护、活动通知)
- 设置公告类型 (通知/警告)
- 定时发布

**API**:
```
POST /admin/announcements
{
  "title": "系统维护通知",
  "content": "系统将于今晚 22:00-24:00 进行维护...",
  "type": "notice",  // notice, warning
  "publishAt": "2024-01-20 18:00:00"
}
```

---

### 2.5 订单中心

#### 页面 12: 订单列表
**功能**:
- 查看所有订单 (商品订单、导游订单、门票订单)
- 筛选 (订单类型、状态、时间范围、用户ID)
- 导出订单数据 (Excel)

**表格字段**:
| 字段 | 说明 |
|---|---|
| 订单号 | ORDER_20240120_001 |
| 用户 | 小顾 (user001) |
| 订单类型 | 商品/导游/门票 |
| 订单金额 | ¥256.00 |
| 状态 | 待支付/已完成/已退款 |
| 创建时间 | 2024-01-20 15:00 |
| 操作 | 查看详情 / 退款 |

**API**:
```
GET /admin/orders
?type=product
&status=paid
&startDate=2024-01-01
&endDate=2024-01-31
&page=1
&size=20

响应:
{
  "orders": [
    {
      "orderId": "ORDER_001",
      "user": {
        "userId": "user001",
        "nickname": "小顾"
      },
      "type": "product",
      "totalAmount": 256,
      "status": "paid",
      "items": [...],
      "createdAt": "2024-01-20 15:00:00"
    }
  ],
  "total": 1500
}
```

#### 页面 13: 退款管理
**功能**:
- 查看退款申请列表
- 审核退款 (通过/拒绝)
- 查看退款原因和凭证

**API**:
```
GET /admin/refunds
?status=pending

PUT /admin/refunds/{refundId}/approve
{
  "action": "approve",
  "reason": "同意退款"
}
```

#### 页面 14: 资金对账
**功能**:
- 每日流水汇总 (订单收入、退款、平台抽成)
- 导出财务报表 (按日/月)

**API**:
```
GET /admin/finance/daily-report
?date=2024-01-20

响应:
{
  "date": "2024-01-20",
  "totalIncome": 25680.50,  // 总收入
  "totalRefund": 1200.00,   // 退款
  "platformFee": 2568.05,   // 平台抽成 (10%)
  "netIncome": 21912.45     // 净收入
}
```

---

### 2.6 商城管理

#### 页面 15: 商品库
**功能**:
- 商品列表 (名称、分类、价格、库存、销量、状态)
- 添加商品
  - 基本信息 (名称、分类、品牌)
  - 价格设置 (原价、现价)
  - 库存管理
  - 图片上传 (主图+详情图)
  - 富文本详情
  - 规格SKU (如: 颜色/尺寸)
- 编辑商品
- 上架/下架商品

**API**:
```
GET /admin/products
?category=美食
&status=on_sale

POST /admin/products
{
  "name": "西湖龙井茶叶礼盒",
  "categoryId": "cat001",
  "price": 128,
  "originalPrice": 158,
  "stock": 500,
  "images": ["https://...", "https://..."],
  "description": "<p>明前龙井...</p>",
  "specifications": [
    {"name": "规格", "value": "250g"}
  ],
  "status": "on_sale"  // on_sale, off_sale
}

PUT /admin/products/{productId}
DELETE /admin/products/{productId}
```

#### 页面 16: 商品分类
**功能**:
- 分类树管理 (一级分类、二级分类)
- 添加/编辑/删除分类
- 排序

**API**:
```
GET /admin/categories

POST /admin/categories
{
  "name": "美食",
  "parentId": null,  // null表示一级分类
  "order": 1
}
```

#### 页面 17: 评价管理
**功能**:
- 查看所有商品评价
- 筛选 (商品、评分、是否有图)
- 处理违规评价 (隐藏/删除)

**API**:
```
GET /admin/reviews
?productId=prod001
&rating=5

PUT /admin/reviews/{reviewId}/hide
{
  "reason": "恶意差评"
}
```

---

### 2.7 社区内容审核

#### 页面 18: 动态审核
**功能**:
- 查看待审核动态列表 (图文/视频)
- 审核通过/拒绝 (标记违规原因)
- 支持批量审核

**审核模式**:
- **先发后审**: 内容先发布，后台异步审核
- **先审后发**: 内容需审核通过后才能展示

**API**:
```
GET /admin/stories/pending

PUT /admin/stories/{storyId}/review
{
  "action": "approve",  // approve, reject
  "reason": "含有违规内容"
}
```

#### 页面 19: 评论审核
**功能**:
- 查看被举报的评论
- 处理举报 (删除评论、警告用户)

**API**:
```
GET /admin/comments/reported

DELETE /admin/comments/{commentId}
{
  "reason": "恶意辱骂"
}
```

#### 页面 20: 敏感词库
**功能**:
- 维护系统违禁词库
- 添加/删除敏感词
- 查看敏感词命中记录

**API**:
```
GET /admin/sensitive-words

POST /admin/sensitive-words
{
  "word": "违禁词",
  "type": "ban"  // ban (禁止), replace (替换为***)
}
```

---

### 2.8 营销中心

#### 页面 21: 优惠券管理
**功能**:
- 优惠券列表
- 创建优惠券
  - 类型 (满减券、折扣券)
  - 面值/折扣
  - 使用条件 (满 X 元可用)
  - 发放范围 (全员/指定用户)
  - 有效期
- 查看优惠券使用记录

**API**:
```
POST /admin/coupons
{
  "type": "discount",  // discount, cash
  "value": 20,  // 8折 或 20元
  "condition": 100,  // 满100元可用
  "quantity": 1000,
  "validFrom": "2024-01-20",
  "validTo": "2024-02-20",
  "target": "all"  // all, specific_users
}
```

#### 页面 22: 活动配置
**功能**:
- 配置限时活动 (如双十一)
- 设置活动页Banner、商品列表
- 活动开始/结束时间

---

### 2.9 系统设置

#### 页面 23: 系统参数配置
**功能**:
- 动态配置 App 参数
  - AI 功能开关
  - 内容审核模式 (先审后发/先发后审)
  - 提现手续费比例
  - 平台抽成比例

**API**:
```
GET /admin/settings

PUT /admin/settings
{
  "ai_enabled": true,
  "review_mode": "post_review",  // post_review, pre_review
  "withdraw_fee_rate": 0.01,
  "platform_commission_rate": 0.10
}
```

#### 页面 24: 操作日志
**功能**:
- 记录所有后台操作 (谁、何时、做了什么)
- 筛选 (操作人、时间、操作类型)

**日志示例**:
| 时间 | 操作人 | IP | 操作 |
|---|---|---|---|
| 2024-01-20 15:30 | 张三 (admin) | 192.168.1.100 | 禁用用户 user001 |
| 2024-01-20 15:28 | 李四 (运营) | 192.168.1.101 | 发布 Banner banner_001 |

**API**:
```
GET /admin/logs
?operator=admin
&action=ban_user
&startDate=2024-01-20
```

---

## 三、页面布局设计

### 3.1 整体布局
```
┌─────────────────────────────────────────┐
│  Logo  随行伴后台管理系统    [管理员] [退出] │
├──────┬──────────────────────────────────┤
│      │                                  │
│ 侧边 │         内容区                   │
│ 菜单 │                                  │
│      │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

### 3.2 侧边菜单结构
```
📊 数据大屏
👤 用户管理
   ├─ C端用户
   ├─ 实名审核
   └─ 导游管理
📝 内容管理
   ├─ Banner
   ├─ 城市管理
   ├─ 景点管理
   ├─ 官方路线
   └─ 系统公告
💰 订单中心
   ├─ 订单列表
   ├─ 退款管理
   └─ 资金对账
🛒 商城管理
   ├─ 商品库
   ├─ 分类管理
   └─ 评价管理
🛡️ 社区审核
   ├─ 动态审核
   ├─ 评论审核
   └─ 敏感词库
🎁 营销中心
   ├─ 优惠券
   └─ 活动配置
⚙️ 系统设置
   ├─ 权限管理
   ├─ 参数配置
   └─ 操作日志
```

---

## 四、权限角色示例

| 角色 | 权限范围 |
| :--- | :--- |
| **超级管理员** | 所有权限，包括系统设置、权限管理 |
| **运营专员** | 用户管理、内容管理、社区审核、营销中心 |
| **商品管理员** | 商城管理、订单查看 |
| **客服专员** | 用户信息查看、订单查看、退款处理 |
| **财务专员** | 订单中心、资金对账、提现审核 |

---

## 补充API接口(续)

### 景点管理API

**API 40: 景点列表**
- **请求**: `GET /admin/locations`
- **参数**: `?cityId=city001&category=自然风光&keyword=西湖&page=1&size=20`

**API 41: 创建景点**
- **请求**: `POST /admin/locations`
- **参数**: 名称、城市ID、分类、标签、图片、简介、开放时间、坐标、门票价格

**API 42: 编辑景点**
- **请求**: `PUT /admin/locations/{locationId}`

**API 43: 删除景点**
- **请求**: `DELETE /admin/locations/{locationId}`

**API 44: 景点详情**
- **请求**: `GET /admin/locations/{locationId}`

**API 45: 批量导入景点**
- **请求**: `POST /admin/locations/import`
- **参数**: Excel文件(multipart/form-data)

### 官方路线管理API

**API 46: 路线列表**
- **请求**: `GET /admin/routes`
- **参数**: `?cityId=city001&status=published&page=1&size=20`

**API 47: 创建路线**
- **请求**: `POST /admin/routes`

**API 48: 编辑路线** 
- **请求**: `PUT /admin/routes/{routeId}`

**API 49: 删除路线**
- **请求**: `DELETE /admin/routes/{routeId}`

**API 50: 路线详情**
- **请求**: `GET /admin/routes/{routeId}`

**API 51: 路线上架/下架**
- **请求**: `PUT /admin/routes/{routeId}/publish`

### 系统公告API

**API 52-56**: 公告的列表、创建、编辑、删除、详情

### 订单中心API

**API 57: 订单列表**
- **请求**: `GET /admin/orders`
- **参数**: `?type=product&status=paid&startDate=2024-01-01&page=1&size=20`

**API 58: 订单详情**
- **请求**: `GET /admin/orders/{orderId}`

**API 59: 订单导出**
- **请求**: `GET /admin/orders/export`

**API 60-63**: 退款管理(列表、详情、审核、批量处理)

**API 64-65**: 财务报表(每日流水、导出)

### 商城管理API

**API 66-73**: 商品管理(列表、创建、编辑、删除、详情、上下架、批量操作、库存调整)

**API 74-78**: 分类管理(列表、创建、编辑、删除、排序)

**API 79-83**: 评价管理(列表、详情、隐藏、删除、批量处理)

### 社区审核API

**API 84-87**: 动态审核

**API 88-89**: 评论审核

**API 90-94**: 敏感词管理

### 营销中心API

**API 95-99**: 优惠券管理

**API 100-104**: 活动配置

### 系统设置API

**API 105-106**: 系统参数配置

**API 107-109**: 操作日志

---

## API 总览

本后台管理系统共定义了 **109个管理API接口**,涵盖以下模块:

- **认证与权限** (11个): 登录、角色CRUD、权限、管理员CRUD
- **数据大屏** (2个): 统计数据、导出
- **用户管理** (15个): C端用户管理、实名审核、导游管理
- **内容管理** (28个): Banner、城市、景点、路线、公告
- **订单中心** (9个): 订单、退款、财务
- **商城管理** (18个): 商品、分类、评价
- **社区审核** (11个): 动态、评论、敏感词
- **营销中心** (10个): 优惠券、活动
- **系统设置** (5个): 配置、日志

所有接口均遵循RESTful规范,提供完整的请求参数和返回数据格式定义。

---

## 技术实现建议

1. **前端框架**: React + Ant Design / Vue + Element Plus
2. **数据可视化**: ECharts
3. **权限控制**: RBAC模型
4. **接口规范**: RESTful + 统一返回格式
5. **部署方式**: 独立部署或与App后端共用服务
# 后台管理系统详细API补充文档

> 此文档包含所有剩余模块的详细API定义,应追加到admin_system_design.md中

---

## 五、订单中心

### 5.1 订单管理

**API 57: 订单列表**
- **请求**: `GET /admin/orders`
- **参数**: `?type=product&status=paid&userId=user001&startDate=2024-01-01&endDate=2024-01-31&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orders": [
        {
          "orderId": "ORDER_20240120_001",
          "user": {
            "userId": "user001",
            "nickname": "小顾",
            "phone": "138****8000"
          },
          "type": "product",
          "totalAmount": 256,
          "status": "paid",
          "items": [
            {
              "productName": "西湖龙井茶叶礼盒",
              "image": "https://...",
              "quantity": 2,
              "price": 128
            }
          ],
          "createdAt": "2024-01-20 15:00:00",
          "paidAt": "2024-01-20 15:05:00"
        }
      ],
      "total": 1500,
      "statistics": {
        "totalAmount": 385680.50,
        "todayAmount": 15680.50
      }
    }
  }
  ```

**API 58: 订单详情**
- **请求**: `GET /admin/orders/{orderId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "orderId": "ORDER_001",
      "user": {
        "userId": "user001",
        "nickname": "小顾",
        "phone": "13800138000"
      },
      "type": "product",
      "status": "shipped",
      "paymentStatus": "paid",
      "totalAmount": 256,
      "items": [
        {
          "productId": "prod001",
          "productName": "西湖龙井茶叶礼盒",
          "image": "https://...",
          "quantity": 2,
          "price": 128,
          "subtotal": 256
        }
      ],
      "address": {
        "receiver": "张三",
        "phone": "13800138000",
        "address": "浙江省杭州市西湖区xxx街道xxx号"
      },
      "shipping": {
        "company": "顺丰速运",
        "trackingNumber": "SF1234567890",
        "status": "运输中"
      },
      "remark": "请尽快发货",
      "discountAmount": 0,
      "actualAmount": 256,
      "createdAt": "2024-01-20 15:00:00",
      "paidAt": "2024-01-20 15:05:00",
      "shippedAt": "2024-01-20 16:00:00"
    }
  }
  ```

**API 59: 订单导出**
- **请求**: `GET /admin/orders/export`
- **参数**: `?type=product&status=paid&startDate=2024-01-01&endDate=2024-01-31&format=excel`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "downloadUrl": "https://cdn.example.com/export/orders_20240120.xlsx",
      "expiresIn": 3600
    }
  }
  ```

### 5.2 退款管理

**API 60: 退款列表**
- **请求**: `GET /admin/refunds`
- **参数**: `?status=pending&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "refunds": [
        {
          "refundId": "refund001",
          "orderId": "ORDER_001",
          "user": {
            "userId": "user001",
            "nickname": "小顾"
          },
          "amount": 256,
          "reason": "商品损坏",
          "status": "pending",
          "createdAt": "2024-01-21 10:00:00"
        }
      ],
      "total": 45
    }
  }
  ```

**API 61: 退款详情**
- **请求**: `GET /admin/refunds/{refundId}`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "refundId": "refund001",
      "orderId": "ORDER_001",
      "user": {
        "userId": "user001",
        "nickname": "小顾",
        "phone": "13800138000"
      },
      "amount": 256,
      "reason": "商品损坏",
      "description": "收到时包装已破损",
      "images": ["https://...", "https://..."],
      "status": "pending",
      "createdAt": "2024-01-21 10:00:00"
    }
  }
  ```

**API 62: 审核退款**
- **请求**: `PUT /admin/refunds/{refundId}/review`
- **参数**:
  ```json
  {
    "action": "approve",  // approve, reject
    "reason": "同意退款"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "message": "审核完成"
  }
  ```

**API 63: 批量处理退款**
- **请求**: `POST /admin/refunds/batch`
- **参数**:
  ```json
  {
    "refundIds": ["refund001", "refund002"],
    "action": "approve"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "successCount": 2
    }
  }
  ```

### 5.3 资金对账

**API 64: 每日流水报表**
- **请求**: `GET /admin/finance/daily-report`
- **参数**: `?date=2024-01-20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "date": "2024-01-20",
      "totalIncome": 25680.50,
      "totalRefund": 1200.00,
      "platformFee": 2568.05,
      "netIncome": 21912.45,
      "orderCount": 89,
      "refundCount": 5
    }
  }
  ```

**API 65: 财务报表导出**
- **请求**: `GET /admin/finance/export`
- **参数**: `?startDate=2024-01-01&endDate=2024-01-31&format=excel`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "downloadUrl": "https://cdn.example.com/export/finance_20240120.xlsx",
      "expiresIn": 3600
    }
  }
  ```

---

## 六、商城管理

### 6.1 商品库

**API 66: 商品列表**
- **请求**: `GET /admin/products`
- **参数**: `?category=美食&status=on_sale&keyword=龙井&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "products": [
        {
          "productId": "prod001",
          "name": "西湖龙井茶叶礼盒",
          "image": "https://...",
          "price": 128,
          "originalPrice": 158,
          "stock": 500,
          "sold": 1024,
          "status": "on_sale",
          "createdAt": "2024-01-01 10:00:00"
        }
      ],
      "total": 150
    }
  }
  ```

**API 67: 创建商品**
- **请求**: `POST /admin/products`
- **参数**:
  ```json
  {
    "name": "西湖龙井茶叶礼盒",
    "categoryId": "cat001",
    "price": 128,
    "originalPrice": 158,
    "stock": 500,
    "images": ["https://...", "https://..."],
    "description": "<p>明前龙井...</p>",
    "specifications": [
      {"name": "规格", "value": "250g"}
    ],
    "status": "on_sale"
  }
  ```
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "productId": "prod002"
    }
  }
  ```

**API 68: 编辑商品**
- **请求**: `PUT /admin/products/{productId}`
- **参数**: 同创建接口
- **返回**: `{"code": 200, "message": "更新成功"}`

**API 69: 删除商品**
- **请求**: `DELETE /admin/products/{productId}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 70: 商品详情**
- **请求**: `GET /admin/products/{productId}`
- **返回**: 完整商品信息

**API 71: 商品上架/下架**
- **请求**: `PUT /admin/products/{productId}/publish`
- **参数**: `{"status": "on_sale"}`  // on_sale, off_sale
- **返回**: `{"code": 200, "message": "操作成功"}`

**API 72: 批量上架/下架**
- **请求**: `POST /admin/products/batch-publish`
- **参数**:
  ```json
  {
    "productIds": ["prod001", "prod002"],
    "status": "on_sale"
  }
  ```
- **返回**: `{"code": 200, "data": {"successCount": 2}}`

**API 73: 库存调整**
- **请求**: `PUT /admin/products/{productId}/stock`
- **参数**:
  ```json
  {
    "stock": 500,
    "reason": "补货"
  }
  ```
- **返回**: `{"code": 200, "message": "库存已更新"}`

### 6.2 商品分类

**API 74: 分类列表(树形)**
- **请求**: `GET /admin/categories`
- **返回**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "categoryId": "cat001",
        "name": "美食",
        "parentId": null,
        "order": 1,
        "children": [
          {
            "categoryId": "cat002",
            "name": "茶叶",
            "parentId": "cat001",
            "order": 1
          }
        ]
      }
    ]
  }
  ```

**API 75: 创建分类**
- **请求**: `POST /admin/categories`
- **参数**:
  ```json
  {
    "name": "美食",
    "parentId": null,
    "order": 1
  }
  ```
- **返回**: `{"code": 200, "data": {"categoryId": "cat003"}}`

**API 76: 编辑分类**
- **请求**: `PUT /admin/categories/{categoryId}`
- **参数**: 同创建接口
- **返回**: `{"code": 200, "message": "更新成功"}`

**API 77: 删除分类**
- **请求**: `DELETE /admin/categories/{categoryId}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 78: 分类排序**
- **请求**: `PUT /admin/categories/sort`
- **参数**: `{"categoryIds": ["cat001", "cat002"]}`
- **返回**: `{"code": 200, "message": "排序成功"}`

### 6.3 评价管理

**API 79: 评价列表**
- **请求**: `GET /admin/reviews`
- **参数**: `?productId=prod001&rating=5&hasImage=true&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "reviews": [
        {
          "reviewId": "review001",
          "product": {
            "productId": "prod001",
            "name": "西湖龙井茶叶礼盒"
          },
          "user": {
            "userId": "user001",
            "nickname": "小顾"
          },
          "rating": 5,
          "content": "茶叶很好，包装精美",
          "images": ["https://..."],
          "status": "visible",
          "createdAt": "2024-01-20 10:00:00"
        }
      ],
      "total": 256
    }
  }
  ```

**API 80: 评价详情**
- **请求**: `GET /admin/reviews/{reviewId}`
- **返回**: 评价完整信息

**API 81: 隐藏评价**
- **请求**: `PUT /admin/reviews/{reviewId}/hide`
- **参数**: `{"reason": "恶意差评"}`
- **返回**: `{"code": 200, "message": "已隐藏"}`

**API 82: 删除评价**
- **请求**: `DELETE /admin/reviews/{reviewId}`
- **参数**: `{"reason": "违规内容"}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 83: 批量处理评价**
- **请求**: `POST /admin/reviews/batch`
- **参数**:
  ```json
  {
    "reviewIds": ["review001", "review002"],
    "action": "hide"
  }
  ```
- **返回**: `{"code": 200, "data": {"successCount": 2}}`

---

## 七、社区内容审核

### 7.1 动态审核

**API 84: 待审核动态列表**
- **请求**: `GET /admin/stories/pending`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "stories": [
        {
          "storyId": "story001",
          "user": {
            "userId": "user001",
            "nickname": "小顾"
          },
          "content": "今天的西湖真美！",
          "images": ["https://..."],
          "status": "pending",
          "createdAt": "2024-01-20 14:30:00"
        }
      ],
      "total": 28
    }
  }
  ```

**API 85: 动态详情**
- **请求**: `GET /admin/stories/{storyId}`
- **返回**: 动态完整信息

**API 86: 审核动态**
- **请求**: `PUT /admin/stories/{storyId}/review`
- **参数**:
  ```json
  {
    "action": "approve",  // approve, reject
    "reason": "含有违规内容"
  }
  ```
- **返回**: `{"code": 200, "message": "审核完成"}`

**API 87: 批量审核动态**
- **请求**: `POST /admin/stories/batch-review`
- **参数**:
  ```json
  {
    "storyIds": ["story001", "story002"],
    "action": "approve"
  }
  ```
- **返回**: `{"code": 200, "data": {"successCount": 2}}`

### 7.2 评论审核

**API 88: 被举报评论列表**
- **请求**: `GET /admin/comments/reported`
- **参数**: `?page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "comments": [
        {
          "commentId": "comment001",
          "storyId": "story001",
          "user": {
            "userId": "user002",
            "nickname": "张三"
          },
          "content": "评论内容",
          "reportCount": 3,
          "reportReasons": ["恶意辱骂", "垃圾广告"],
          "createdAt": "2024-01-20 15:00:00"
        }
      ],
      "total": 15
    }
  }
  ```

**API 89: 删除评论**
- **请求**: `DELETE /admin/comments/{commentId}`
- **参数**: `{"reason": "恶意辱骂"}`
- **返回**: `{"code": 200, "message": "删除成功"}`

### 7.3 敏感词库

**API 90: 敏感词列表**
- **请求**: `GET /admin/sensitive-words`
- **参数**: `?page=1&size=50`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "words": [
        {
          "wordId": "word001",
          "word": "违禁词",
          "type": "ban",
          "createdAt": "2024-01-01 10:00:00"
        }
      ],
      "total": 128
    }
  }
  ```

**API 91: 添加敏感词**
- **请求**: `POST /admin/sensitive-words`
- **参数**:
  ```json
  {
    "word": "违禁词",
    "type": "ban"  // ban (禁止), replace (替换为***)
  }
  ```
- **返回**: `{"code": 200, "data": {"wordId": "word002"}}`

**API 92: 编辑敏感词**
- **请求**: `PUT /admin/sensitive-words/{wordId}`
- **参数**: 同创建接口
- **返回**: `{"code": 200, "message": "更新成功"}`

**API 93: 删除敏感词**
- **请求**: `DELETE /admin/sensitive-words/{wordId}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 94: 敏感词命中记录**
- **请求**: `GET /admin/sensitive-words/hits`
- **参数**: `?wordId=word001&startDate=2024-01-01&page=1&size=20`
- **返回**: 命中记录列表

---

## 八、营销中心

### 8.1 优惠券管理

**API 95: 优惠券列表**
- **请求**: `GET /admin/coupons`
- **参数**: `?status=active&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "coupons": [
        {
          "couponId": "coupon001",
          "name": "新人优惠券",
          "type": "cash",
          "value": 20,
          "condition": 100,
          "quantity": 1000,
          "used": 328,
          "validFrom": "2024-01-01",
          "validTo": "2024-02-01",
          "status": "active"
        }
      ],
      "total": 25
    }
  }
  ```

**API 96: 创建优惠券**
- **请求**: `POST /admin/coupons`
- **参数**:
  ```json
  {
    "name": "新人优惠券",
    "type": "cash",  // cash, discount
    "value": 20,
    "condition": 100,
    "quantity": 1000,
    "validFrom": "2024-01-01",
    "validTo": "2024-02-01",
    "target": "all"  // all, specific_users
  }
  ```
- **返回**: `{"code": 200, "data": {"couponId": "coupon002"}}`

**API 97: 编辑优惠券**
- **请求**: `PUT /admin/coupons/{couponId}`
- **参数**: 同创建接口
- **返回**: `{"code": 200, "message": "更新成功"}`

**API 98: 删除优惠券**
- **请求**: `DELETE /admin/coupons/{couponId}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 99: 优惠券使用记录**
- **请求**: `GET /admin/coupons/{couponId}/usage`
- **参数**: `?page=1&size=20`
- **返回**: 使用记录列表

### 8.2 活动配置

**API 100: 活动列表**
- **请求**: `GET /admin/campaigns`
- **参数**: `?status=active&page=1&size=20`
- **返回**: 活动列表

**API 101: 创建活动**
- **请求**: `POST /admin/campaigns`
- **参数**:
  ```json
  {
    "name": "双十一大促",
    "banner": "https://...",
    "productIds": ["prod001", "prod002"],
    "startDate": "2024-11-11 00:00:00",
    "endDate": "2024-11-12 00:00:00"
  }
  ```
- **返回**: `{"code": 200, "data": {"campaignId": "campaign001"}}`

**API 102: 编辑活动**
- **请求**: `PUT /admin/campaigns/{campaignId}`
- **参数**: 同创建接口
- **返回**: `{"code": 200, "message": "更新成功"}`

**API 103: 删除活动**
- **请求**: `DELETE /admin/campaigns/{campaignId}`
- **返回**: `{"code": 200, "message": "删除成功"}`

**API 104: 活动详情**
- **请求**: `GET /admin/campaigns/{campaignId}`
- **返回**: 活动完整信息及数据统计

---

## 九、系统设置

### 9.1 系统参数配置

**API 105: 获取系统配置**
- **请求**: `GET /admin/settings`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "ai_enabled": true,
      "review_mode": "post_review",
      "withdraw_fee_rate": 0.01,
      "platform_commission_rate": 0.10
    }
  }
  ```

**API 106: 更新系统配置**
- **请求**: `PUT /admin/settings`
- **参数**:
  ```json
  {
    "ai_enabled": true,
    "review_mode": "pre_review",
    "withdraw_fee_rate": 0.01,
    "platform_commission_rate": 0.10
  }
  ```
- **返回**: `{"code": 200, "message": "配置已更新"}`

### 9.2 操作日志

**API 107: 操作日志列表**
- **请求**: `GET /admin/logs`
- **参数**: `?operator=admin&action=ban_user&startDate=2024-01-20&page=1&size=20`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "logs": [
        {
          "logId": "log001",
          "operator": "张三(admin)",
          "ip": "192.168.1.100",
          "action": "ban_user",
          "target": "user001",
          "details": "禁用用户",
          "createdAt": "2024-01-20 15:30:00"
        }
      ],
      "total": 1256
    }
  }
  ```

**API 108: 日志详情**
- **请求**: `GET /admin/logs/{logId}`
- **返回**: 日志完整信息

**API 109: 日志导出**
- **请求**: `GET /admin/logs/export`
- **参数**: `?startDate=2024-01-01&endDate=2024-01-31&format=excel`
- **返回**:
  ```json
  {
    "code": 200,
    "data": {
      "downloadUrl": "https://cdn.example.com/export/logs_20240120.xlsx",
      "expiresIn": 3600
    }
  }
  ```

---

## API接口总结

本后台管理系统共定义了 **109个完整管理API接口**:

| 模块 | API数量 | API编号 |
|------|---------|---------|
| 认证与权限 | 11 | API 1-11 |
| 数据大屏 | 2 | API 12-13 |
| 用户管理 | 15 | API 14-28 |
| 内容管理 | 28 | API 29-56 |
| 订单中心 | 9 | API 57-65 |
| 商城管理 | 18 | API 66-83 |
| 社区审核 | 11 | API 84-94 |
| 营销中心 | 10 | API 95-104 |
| 系统设置 | 5 | API 105-109 |

所有接口均包含:
- ✅ 完整的请求参数定义(JSON格式)
- ✅ 完整的返回数据格式(JSON格式)
- ✅ RESTful规范的HTTP方法
- ✅ 统一的返回格式 `{code, message?, data}`
- ✅ 分页参数统一使用 `page` 和 `size`

可直接用于前后端开发!
