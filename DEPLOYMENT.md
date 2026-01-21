# Cloudflare Pages 部署指南

## 部署步骤

### 1. 登录 Cloudflare 控制台
访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并使用您的账户登录。

### 2. 创建 Pages 项目
1. 登录后，点击左侧菜单中的 **Pages**
2. 点击 **Create a project** 按钮
3. 选择 **Connect to Git** 选项

### 3. 连接 GitHub 仓库
1. 选择 GitHub 作为代码源
2. 授权 Cloudflare 访问您的 GitHub 账户
3. 从仓库列表中选择 `-2626.online` 仓库
4. 点击 **Begin setup**

### 4. 配置构建设置
1. **Project name**: 可以使用默认名称或自定义
2. **Production branch**: `main`
3. **Build settings**:
   - **Framework preset**: 选择 `None`
   - **Build command**: 留空或输入 `echo 'Static site'`
   - **Build output directory**: 留空（默认为根目录）
4. 点击 **Save and Deploy**

### 5. 配置自定义域名
1. 部署完成后，点击左侧菜单中的 **Custom domains**
2. 点击 **Set up a custom domain** 按钮
3. 输入您的域名 `2626.online`
4. 点击 **Continue**
5. 根据提示更新您的 DNS 记录，将域名指向 Cloudflare Pages

### 6. 验证部署
部署完成后，您可以通过以下方式访问您的网站：
- Cloudflare Pages 提供的默认域名：`https://<project-name>.pages.dev`
- 您的自定义域名：`https://2626.online`

## 项目结构
```
-2626.online/
├── index.html          # 游戏主页面
├── cloudflare/pages.json  # Cloudflare Pages 配置文件
└── DEPLOYMENT.md       # 部署指南
```

## 技术说明
- 这是一个纯静态 HTML 项目，无需构建过程
- 使用 HTML5 Canvas 和 JavaScript 开发
- 响应式设计，支持桌面和移动设备
- 包含音效系统、本地存储和现代化 UI 设计

## 更新部署
当您对代码进行更改并推送到 GitHub 仓库的 `main` 分支时，Cloudflare Pages 会自动触发新的部署。

## 故障排除
- 如果遇到部署问题，请检查 Cloudflare Pages 控制台中的构建日志
- 确保域名的 DNS 记录已正确配置
- 对于自定义域名，请确保已在 Cloudflare 中添加并验证

## 联系信息
如果您需要进一步的帮助，请联系 Cloudflare 支持或查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)。