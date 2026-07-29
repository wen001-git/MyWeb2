> 目的：说明如何向 leewen.work 新增个人产品或银行专业作品，并安全完成三语内容、图片、验证与发布。　目标读者：lijiawen 及后续协助维护网站的 AI 或开发者。　如何阅读：优先使用“交给 AI 添加”流程；需要自行维护时，再按“手工添加”逐步操作。

# 个人网站新增产品操作指南

## 1. 推荐方式：把产品资料交给 AI

以后新增产品时，把下面模板复制给 Codex、Claude Code 或其他正在维护本仓库的 AI，并补充实际资料。

```text
请把以下产品加入 leewen.work 个人网站：

产品名称：
产品分类：个人产品 / 银行专业作品
产品网址：
本地项目目录：
README 路径：
产品截图路径：
目标用户：
希望解决的问题：
主要功能或亮点：
期望排序：
是否需要首页详细介绍：是 / 否
是否立即发布：是 / 否
其他说明：

请完成：
1. 阅读 README 和现有项目资料。
2. 拟写简体中文、繁体中文和英文产品文案。
3. 新建并校验产品 Markdown 档案。
4. 优化产品截图并放入网站公开图片目录。
5. 验证产品分类、排序、三语切换和响应式布局。
6. 运行检查与生产构建。
7. 更新 AGENTS.md 和必要的设计文档。
8. 只提交本次相关文件并推送到 main。
```

### 资料不完整时怎么办

- 有本地项目：优先提供项目目录和 README，让 AI 从真实功能中拟写介绍。
- 只有在线地址：提供产品网址，并补充一句产品用途和目标用户。
- 没有正式截图：可以先提供临时截图，之后再替换；不要使用与真实产品不符的概念图。
- 还不想发布：填写“是否立即发布：否”，产品档案使用 `published: false`。
- 不确定排序：说明希望“靠前、居中或末位”，由 AI 结合现有产品确定具体数字。

## 2. 当前首页分类与排序规则

首页产品分为两类：

| 分类 | `category` | 用途 | CTA 风格 |
|------|------------|------|----------|
| 个人产品 | `personal` | 面向直接体验和未来购买 | 立即体验、立即探索 |
| 银行专业作品 | `professional` | 面向专业能力评估、项目合作和职业机会 | 查看演示、查看详情、项目合作 |

同一分类中，`order` 数字越小越靠前。

当前银行专业作品的排序约定：

- ALM 经营分析报表：`order: 10`，保持第一位。
- 后续重要专业作品：建议使用 `20、30、40……`。
- 房贷止赎数据血缘：`order: 9999`，保持末位。

产品暂不公开时设置：

```yaml
published: false
```

准备上线时改为：

```yaml
published: true
```

## 3. 手工添加：准备产品截图

产品公开图片统一放在：

```text
public/images/products/
```

推荐命名：

```text
public/images/products/<product-id>-cover.jpg
```

例如：

```text
public/images/products/liquidity-dashboard-cover.jpg
```

图片要求：

- 使用真实产品界面，避免无法验证的概念图。
- 优先使用 JPG 或 WebP，控制文件体积。
- 不包含客户名称、账号、手机号、内部数据或其他保密信息。
- 截图中文字应清晰，不能裁掉关键界面。
- 首页最终会把图片内联到单个 `dist/index.html`，图片越大，单文件体积越大。

## 4. 手工添加：创建产品 Markdown 档案

产品档案目录：

```text
src/content/products/
```

文件名使用小写英文、数字和连字符，例如：

```text
src/content/products/liquidity-risk-dashboard.md
```

### 4.1 无首页详情的产品模板

以下模板适合只显示产品卡片的产品：

```yaml
---
productId: liquidity-risk-dashboard
category: professional
order: 20
published: true
href: https://example.com/
visual: image
coverImage: /images/products/liquidity-dashboard-cover.jpg
locales:
  zhCN:
    label: 银行风险管理专业作品
    title: 流动性风险驾驶舱
    summary: 用一句话说明产品解决的问题和核心价值。
    audience: 面向银行管理层、风险分析师与实施团队
    primaryCta: 查看演示
  zhHant:
    label: 銀行風險管理專業作品
    title: 流動性風險駕駛艙
    summary: 使用繁體中文說明產品解決的問題和核心價值。
    audience: 面向銀行管理層、風險分析師與實施團隊
    primaryCta: 查看演示
  en:
    label: Banking risk work
    title: Liquidity Risk Dashboard
    summary: Explain the problem and core product value in one sentence.
    audience: For bank executives, risk analysts, and implementation teams
    primaryCta: View demo
---
```

### 4.2 不提供图片时

没有封面图时，可以使用：

```yaml
visual: generic
```

此时删除 `coverImage`。网站会显示统一的默认视觉。

使用真实截图时必须同时填写：

```yaml
visual: image
coverImage: /images/products/example-cover.jpg
```

### 4.3 需要首页详细介绍时

需要首页详情的产品，应参考：

```text
src/content/products/alm-report.md
```

并在卡片字段中增加：

```yaml
detailAnchor: product-detail-id
```

同时增加 `detail`，为三种语言分别填写：

- 详情标题和价值说明。
- 事实指标。
- 主要用户角色。
- 核心能力。
- 完整模块范围。
- 演示限制或使用说明。
- 在线体验与合作按钮。
- 详情图片替代文本。

首页详情是可选功能，不要求每款产品都提供。产品增多时，优先让重要产品拥有详情，避免首页过长。

## 5. 三语内容要求

每款已发布产品都必须提供：

```yaml
locales:
  zhCN:
  zhHant:
  en:
```

三种语言都需要以下卡片字段：

- `label`：产品类别标签。
- `title`：产品名称。
- `summary`：一句话简介。
- `audience`：目标用户。
- `primaryCta`：主要按钮。
- `secondaryCta`：可选的次要按钮。

当前尚未接入自动翻译命令。缺少任一必需语言时，Astro Content Collection schema 会阻止构建，避免把空内容或混合语言发布到网站。

推荐的后续自动翻译流程是：

```text
填写简体中文
→ 本地脚本或 GitHub Actions 调用翻译服务
→ 生成繁体中文和英文
→ 人工检查并保存译文
→ Astro 静态构建
```

自动翻译发生在构建前，不影响线上网站保持纯静态 HTML。

## 6. 本地验证

在仓库根目录运行：

```bash
cd /Users/Zhuanz/CodeX/MyWebCodeX
npm run check
npm run build
```

构建成功后，`dist/` 中应只有：

```text
dist/index.html
```

本地预览：

```bash
open dist/index.html
```

检查以下项目：

- 产品是否进入正确分类。
- 排序是否符合预期。
- 产品名称、简介、受众和按钮是否正确。
- 图片是否清晰且没有敏感信息。
- 简体、繁体和英文是否都能正确切换。
- 桌面端和平板端卡片是否整齐。
- 手机端是否无横向滚动，按钮是否易于点击。
- 在线产品链接是否正确。
- 如果有首页详情，详情锚点、折叠内容和合作按钮是否有效。

## 7. 提交与发布

先检查实际改动：

```bash
git status
git diff
```

只暂存本次产品相关文件，不使用 `git add .`：

```bash
git add \
  src/content/products/<product-id>.md \
  public/images/products/<product-image>
```

如果同时更新了项目说明，再加入对应文档：

```bash
git add AGENTS.md docs/WEBSITE_DESIGN.md
```

提交并推送：

```bash
git commit -m "feat: add <product-name>"
git push origin main
```

推送到 `main` 后，已连接的部署平台开启自动部署时会重新构建并发布网站。若线上没有自动更新，应到当前部署平台检查是否已启用 GitHub `main` 分支自动部署。

## 8. 常见问题

### 产品为什么没有显示？

依次检查：

1. `published` 是否为 `true`。
2. `category` 是否为 `personal` 或 `professional`。
3. 三语字段是否齐全。
4. `href` 是否为完整的 `https://` 地址。
5. `npm run check` 是否通过。

### 为什么图片没有显示？

确认：

- 图片实际位于 `public/images/products/`。
- `coverImage` 以 `/images/products/` 开头。
- `visual` 设置为 `image`。
- 文件名大小写完全一致。

### 如何调整产品位置？

修改同一分类内的 `order`。数字越小越靠前。不要修改 ALM 的首位约定和房贷止赎的末位约定，除非产品展示策略再次调整。

### 网站还保持纯静态吗？

保持。Markdown、图片处理和未来的自动翻译都发生在构建前；发布结果仍然是一个不依赖自建后端或数据库的静态 `dist/index.html`。

## 变更记录

| 日期 | 变更内容 |
|------|----------|
| 2026-07-29 | 初始创建新增产品操作指南，记录资料模板、双分类排序、三语档案、截图、验证与发布流程；why：让后续新增产品可以按固定步骤完成并方便不同 AI 工具接手 |
