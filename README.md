<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ucstu/meeting-room">
    <img src="public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">在线会议管理系统</h3>

  <p align="center">
    基于 Nuxt.js 3 构建的现代化在线会议协作平台
    <br />
    支持团队管理、视频会议调度和 GitHub OAuth 认证
    <br />
    <a href="https://github.com/ucstu/meeting-room"><strong>查看文档 »</strong></a>
    <br />
    <br />
    <a href="https://meeting-room.ucstu.com">在线演示</a>
    ·
    <a href="https://github.com/ucstu/meeting-room/issues/new?template=bug-report.yml">报告问题</a>
    ·
    <a href="https://github.com/ucstu/meeting-room/issues/new?template=feature-request.yml">功能请求</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>目录</summary>
  <ol>
    <li>
      <a href="#关于项目">关于项目</a>
      <ul>
        <li><a href="#技术栈">技术栈</a></li>
        <li><a href="#主要功能">主要功能</a></li>
      </ul>
    </li>
    <li>
      <a href="#快速开始">快速开始</a>
      <ul>
        <li><a href="#环境要求">环境要求</a></li>
        <li><a href="#安装步骤">安装步骤</a></li>
      </ul>
    </li>
    <li><a href="#使用说明">使用说明</a></li>
    <li><a href="#功能路线图">功能路线图</a></li>
    <li><a href="#参与贡献">参与贡献</a></li>
    <li><a href="#许可证">许可证</a></li>
    <li><a href="#联系方式">联系方式</a></li>
    <li><a href="#致谢">致谢</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## 关于项目

[![产品截图][product-screenshot]](https://meeting-room.ucstu.com)

在线会议管理系统是一个现代化的远程协作平台，专为团队在线会议需求而设计。系统提供会议调度、团队管理、参会链接分发等核心功能，让远程工作更加高效有序。

### 为什么选择这个系统？

- **简化会议调度** - 智能日历集成，一键创建在线会议
- **团队协作优化** - 团队管理、角色分配和权限控制
- **无缝集成体验** - 支持主流视频会议平台集成
- **现代化界面** - 响应式设计，完美适配各种设备
- **安全可靠** - GitHub OAuth 认证，企业级安全保障
- **部署简单** - 基于 Cloudflare 平台，零配置部署

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

### 技术栈

#### 前端技术

- [![Nuxt.js][Nuxt.js]][Nuxt-url] - 全栈 Vue.js 框架
- [![Vue.js][Vue.js]][Vue-url] - 渐进式 JavaScript 框架
- [![TypeScript][TypeScript]][TypeScript-url] - 类型安全的 JavaScript
- [![Tailwind CSS][TailwindCSS]][TailwindCSS-url] - 实用优先的 CSS 框架
- [![shadcn/ui][shadcn-ui]][shadcn-url] - 现代化 UI 组件库

#### 后端技术

- [![Drizzle ORM][Drizzle]][Drizzle-url] - 类型安全的 ORM
- [![SQLite][SQLite]][SQLite-url] - 轻量级数据库
- [![Cloudflare][Cloudflare]][Cloudflare-url] - 边缘计算平台

#### 开发工具

- [![ESLint][ESLint]][ESLint-url] - JS 代码质量检查
- [![Stylelint][Stylelint]][Stylelint-url] - CSS 代码质量检查
- [![CommitLint][CommitLint]][CommitLint-url] - 提交信息规范检查
- [![Prettier][Prettier]][Prettier-url] - 代码格式化
- [![Husky][Husky]][Husky-url] - Git hooks 管理

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

### 主要功能

#### 🔐 用户认证与授权

- **GitHub OAuth 登录** - 安全的单点登录体验
- **基础权限控制** - 认证用户访问控制
- **自动会话管理** - 通过 nuxt-auth-utils 自动处理会话

#### 📅 在线会议调度

- **智能日历界面** - 直观的会议安排体验
- **会议冲突检测** - 自动检测时间冲突，避免重复预订
- **重复会议支持** - 支持定期会议安排和系列会议
- **会议链接管理** - 自动生成和分发会议链接
- **参会者邀请** - 邮件邀请和通知系统

#### 👥 团队协作管理

- **团队创建与管理** - 创建团队工作空间
- **团队权限分级** - 所有者、管理员、成员三级权限
- **团队会议** - 团队统一会议安排和管理
- **成员邀请系统** - 邮箱邀请新成员加入团队
- **团队日历** - 团队共享会议日历

#### 🛠️ 会议管理功能

- **会议模板** - 预设会议类型和配置
- **会议记录** - 会议纪要和文档管理
- **参会统计** - 参会率和会议效果分析
- **会议提醒** - 多渠道会议提醒通知

#### 📱 用户体验

- **响应式设计** - 完美适配手机、平板、桌面
- **实时通知** - 会议状态即时反馈
- **个人仪表板** - 个人会议记录和统计
- **快速搜索** - 快速查找历史会议和联系人

#### 🔗 第三方集成

- **通知渠道** - 邮件、短信、企业微信等多渠道通知

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- GETTING STARTED -->

## 快速开始

### 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js** 18.0 或更高版本
  ```sh
  node --version
  ```
- **pnpm** 包管理器
  ```sh
  npm install -g pnpm
  ```
- **GitHub 应用** - 用于 OAuth 认证

### 安装步骤

1. **获取 GitHub OAuth 应用凭证**
   - 前往 [GitHub Developer Settings](https://github.com/settings/developers)
   - 创建新的 OAuth 应用
   - 设置回调 URL: `http://localhost:3000/auth/github`
   - 记录 Client ID 和 Client Secret

2. **克隆项目仓库**

   ```sh
   git clone https://github.com/ucstu/meeting-room.git
   cd meeting-room
   ```

3. **安装项目依赖**

   ```sh
   pnpm install
   ```

4. **配置环境变量**

   ```sh
   cp .env.example .env.local
   ```

   编辑 `.env.local` 文件，填入您的配置：

   ```env
   NUXT_OAUTH_GITHUB_CLIENT_ID=your_github_client_id
   NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
   NUXT_SESSION_PASSWORD=your_session_secret_key
   ```

5. **初始化数据库**

   ```sh
   pnpm db:migrate
   ```

6. **启动开发服务器**

   ```sh
   pnpm dev
   ```

7. **访问应用程序**

   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- USAGE EXAMPLES -->

## 使用说明

### 基本会议调度流程

1. **登录系统** - 使用 GitHub 账号登录
2. **创建会议** - 在日历中选择时间，创建新会议
3. **邀请参会者** - 添加参会者邮箱，发送邀请
4. **获取会议链接** - 系统自动生成会议链接
5. **会议管理** - 在个人面板查看和管理所有会议

### 团队协作功能

1. **创建团队** - 在团队页面创建工作团队
2. **邀请成员** - 通过邮箱邀请团队成员
3. **团队会议** - 创建团队会议，统一管理
4. **权限分配** - 设置不同的团队角色权限
5. **共享日历** - 查看团队共享会议日历

### 个人功能

普通用户可以：

- 创建和管理个人会议
- 加入团队和参与团队会议
- 查看个人会议历史和统计
- 设置会议提醒和通知偏好
- 集成第三方日历和视频会议平台

### 管理功能

团队管理者可以：

- 管理团队成员和权限
- 查看团队会议统计
- 设置团队会议模板
- 配置团队通知规则

_更多使用说明请参考 [项目文档](https://github.com/ucstu/meeting-room/wiki)_

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- ROADMAP -->

## 功能路线图

### 已完成功能

- [x] GitHub OAuth 认证
- [x] 基础会议调度系统
- [x] 团队管理功能
- [x] 个人会议面板
- [x] 响应式设计

### 开发中功能

- [ ] 邮件通知系统
- [ ] 会议模板管理
- [ ] 基础统计分析
- [ ] 会议冲突检测

### 计划功能

- [ ] **高级功能**
  - [ ] 会议录制管理
  - [ ] AI 会议纪要生成
  - [ ] 智能会议安排建议
  - [ ] 会议效果分析
- [ ] **移动端**
  - [ ] iOS 应用
  - [ ] Android 应用
  - [ ] 微信小程序
- [ ] **国际化**
  - [ ] 英文版本
  - [ ] 日文版本
  - [ ] 韩文版本

查看 [开放问题](https://github.com/ucstu/meeting-room/issues) 了解完整的功能提案和已知问题。

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- CONTRIBUTING -->

## 参与贡献

我们欢迎社区的贡献！正是有了大家的参与，开源社区才能成为学习、启发和创造的绝佳场所。您的任何贡献都将受到**极大的赞赏**。

如果您有改进建议，请先 fork 仓库并创建拉取请求。您也可以简单地创建一个带有 "enhancement" 标签的问题。
别忘了给项目点个星！再次感谢！

### 贡献步骤

1. **Fork 项目仓库**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m '✨ feat: 添加某个优秀功能'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建拉取请求**

### 提交规范

本项目使用 [约定式提交](https://www.conventionalcommits.org/) 规范：

```
✨ feat: 添加新功能
🐛 fix: 修复问题
📚 docs: 更新文档
💅 style: 代码样式修改
♻️ refactor: 代码重构
⚡ perf: 性能优化
✅ test: 添加测试
🔧 chore: 维护性工作
```

### 主要贡献者

<a href="https://github.com/ucstu/meeting-room/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ucstu/meeting-room" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- LICENSE -->

## 许可证

本项目基于 MIT 许可证发布。详细信息请查看 `LICENSE` 文件。

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- CONTACT -->

## 联系方式

项目维护者 - [@your_username](https://github.com/your_username) - your.email@example.com

项目链接: [https://github.com/ucstu/meeting-room](https://github.com/ucstu/meeting-room)

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## 致谢

感谢以下优秀的开源项目和资源，为本项目的开发提供了帮助：

- [Nuxt.js](https://nuxt.com/) - 直观的 Vue.js 框架
- [shadcn-vue](https://www.shadcn-vue.com/) - 精美的 Vue UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Drizzle ORM](https://orm.drizzle.team/) - 现代化的 TypeScript ORM
- [Lucide Icons](https://lucide.dev/) - 美观的 SVG 图标库
- [Cloudflare](https://www.cloudflare.com/) - 强大的边缘计算平台
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps) - 安全的认证服务
- [Zoom API](https://marketplace.zoom.us/docs/api-reference/introduction) - 视频会议集成
- [Best README Template](https://github.com/othneildrew/Best-README-Template) - 优秀的 README 模板

<p align="right">(<a href="#readme-top">返回顶部</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/ucstu/meeting-room.svg?style=for-the-badge
[contributors-url]: https://github.com/ucstu/meeting-room/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ucstu/meeting-room.svg?style=for-the-badge
[forks-url]: https://github.com/ucstu/meeting-room/network/members
[stars-shield]: https://img.shields.io/github/stars/ucstu/meeting-room.svg?style=for-the-badge
[stars-url]: https://github.com/ucstu/meeting-room/stargazers
[issues-shield]: https://img.shields.io/github/issues/ucstu/meeting-room.svg?style=for-the-badge
[issues-url]: https://github.com/ucstu/meeting-room/issues
[license-shield]: https://img.shields.io/github/license/ucstu/meeting-room.svg?style=for-the-badge
[license-url]: https://github.com/ucstu/meeting-room/blob/master/LICENSE
[product-screenshot]: public/images/screenshot.png
[Nuxt.js]: https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white
[Nuxt-url]: https://nuxt.com/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[shadcn-ui]: https://img.shields.io/badge/shadcn%2Fvue-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[shadcn-url]: https://www.shadcn-vue.com/
[Drizzle]: https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black
[Drizzle-url]: https://orm.drizzle.team/
[SQLite]: https://img.shields.io/badge/SQLite-07405e?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/
[Cloudflare]: https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white
[Cloudflare-url]: https://www.cloudflare.com/
[ESLint]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Stylelint]: https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white
[Stylelint-url]: https://stylelint.io/
[CommitLint]: https://img.shields.io/badge/CommitLint-000000?style=for-the-badge&logo=commitlint&logoColor=white
[CommitLint-url]: https://commitlint.js.org/
[Prettier]: https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black
[Prettier-url]: https://prettier.io/
[Husky]: https://img.shields.io/badge/Husky-42B883?style=for-the-badge&logo=git&logoColor=white
[Husky-url]: https://typicode.github.io/husky/
