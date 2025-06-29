# MeetHub - 多人在线会议平台

一个基于 Nuxt 3 和 reka-ui 构建的现代化多人在线会议平台，提供简洁大气的用户界面和丰富的会议功能。

## 🚀 特性

### 认证系统
- **GitHub 登录**: 支持通过 GitHub OAuth 进行身份验证
- **访客模式**: 允许用户以访客身份快速加入会议
- **简洁登录界面**: 现代化的登录页面设计

### 房间大厅
- **房间浏览**: 浏览所有可用的会议室
- **搜索功能**: 通过关键词搜索特定会议室
- **房间筛选**: 按公开/私密状态筛选房间
- **快速创建**: 一键创建新的会议室
- **房间信息**: 显示参与者数量、创建时间等详细信息

### 会议室功能
- **高清视频**: 支持多人视频通话
- **音频控制**: 麦克风开关和音频状态指示
- **屏幕共享**: 支持共享桌面或应用窗口
- **实时聊天**: 文字聊天功能，支持输入状态指示
- **参与者管理**: 查看和管理会议参与者
- **智能布局**: 自适应的视频布局，突出显示正在说话的人

## 🛠 技术栈

- **框架**: Nuxt 3
- **UI 库**: reka-ui
- **样式**: UnoCSS
- **图标**: Nuxt Icon (Lucide Icons)
- **类型检查**: TypeScript
- **代码规范**: ESLint
- **数据库**: Drizzle ORM + NuxtHub
- **认证**: nuxt-auth-utils

## 📁 项目结构

```
app/
├── components/          # Vue 组件
│   ├── AppHeader.vue   # 应用头部导航
│   ├── ChatPanel.vue   # 聊天面板组件
│   ├── ParticipantVideo.vue  # 参与者视频组件
│   ├── RoomCard.vue    # 房间卡片组件
│   └── NotificationToast.vue # 通知提示组件
├── pages/              # 页面路由
│   ├── auth.vue        # 登录页面
│   ├── index.vue       # 房间大厅
│   └── meeting/
│       └── [id].vue    # 会议室页面
├── types/              # TypeScript 类型定义
│   └── meeting.ts      # 会议相关类型
├── layouts/            # 布局组件
│   └── default.vue     # 默认布局
└── app.vue            # 根组件
```

## 🎨 页面设计

### 1. 登录页面 (`/auth`)
- 渐变背景设计
- GitHub OAuth 登录
- 访客模式选项
- 功能特性展示
- 响应式布局

### 2. 房间大厅 (`/`)
- Hero 区域，包含快速操作按钮
- 搜索和筛选功能
- 房间卡片网格布局
- 创建/加入房间弹窗
- 空状态处理

### 3. 会议室页面 (`/meeting/[id]`)
- 全屏会议界面
- 主视频区域 + 参与者缩略图
- 底部控制栏（音频、视频、屏幕共享、聊天）
- 可折叠的聊天面板
- 参与者列表弹窗
- 会议信息显示

## 🔧 开发说明

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

### 代码检查
```bash
pnpm lint
```

## 📝 组件说明

### AppHeader
- 全局导航头部
- 用户信息展示
- 登录/退出功能

### RoomCard
- 房间信息展示
- 参与者状态
- 加入/分享功能

### ParticipantVideo
- 视频流显示
- 音频状态指示
- 说话者高亮
- 参与者控制

### ChatPanel
- 实时消息显示
- 消息发送
- 输入状态指示
- 自动滚动

### NotificationToast
- 全局通知系统
- 多种通知类型
- 自动消失

## 🔮 未来计划

- [ ] WebRTC 实时音视频功能实现
- [ ] 录制和回放功能
- [ ] 会议日程管理
- [ ] 移动端适配优化
- [ ] 国际化支持
- [ ] 会议数据分析

## 📄 许可证

MIT License

---

**注意**: 当前版本主要实现了 UI 界面和静态交互，WebRTC 音视频功能需要进一步开发实现。

## Features

- Server-Side rendering on Cloudflare Workers
- ESLint setup
- Ready to add a database, blob and KV storage
- One click deploy on 275+ locations for free

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

You can update the main text displayed by creating a `.env`:

```bash
NUXT_PUBLIC_HELLO_TEXT="Hello my world!"
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy


Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server logs, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).
