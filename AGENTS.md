> 目的：记录 leewen.work 个人网站的项目约束、当前状态与后续入口，供不同 AI 工具无缝接手。　目标读者：参与本项目的 AI 与开发协作者。　如何阅读：先看「当前状态」和「硬约束」，再按「下一步 TODO」继续工作。

# leewen.work 项目协作说明

## 项目定位

为 lijiawen 建设一个纯静态个人网站，用于展示和销售个人产品、承接商业与职业合作、发布观点文章。

## 运行与测试

- 当前已初始化 Astro + TypeScript 静态工程；运行 `npm install` 后用 `npm run dev` 本地开发，`npm run build` 生成 `dist/`。
- Render 部署使用构建命令 `npm install && npm run build`，发布目录为 `dist`。
- 按修改风险测试：文案和纯样式改动以目标 diff/静态检查为主；导航、文章生成、表单、购买入口等关键流程运行直接相关的最小测试。

### 本地预览 `dist/`

`npm run build` 产物 `dist/` 里 **只有一个** `dist/index.html`，CSS / JS / 图片全部内联为 `<style>` / `<script type="module">` / `data:image/...;base64,...`。直接双击（macOS `open dist/index.html`）或拖入浏览器即可在 `file://` 协议下打开页面，无任何外部资源依赖；加入 ALM 截图后当前约 2.1 MB。

- 本地预览：直接双击 `dist/index.html`。
- 单文件分发：发这一个 `dist/index.html` 即可（当前约 2.1 MB）。
- Render 部署：继续发布 `dist/`，里面只剩 `index.html`。
- 热重载开发：`npm run dev`（默认 http://localhost:4321/）。

> ⚠️ 当前方案假设 `dist/` 只含一个首页。当 `/zh-hant/`、`/en/` 等子路径页面落地时，
> `scripts/inline.mjs` 需要扩展为遍历所有 `dist/**/*.html` 分别内联；并且 Astro 多页 +
> `base: "./"` 在子路径下的兼容性也要重新评估。

## 硬约束

- 主域名：`leewen.work`。
- 站点构建结果必须是纯静态文件，不依赖自建后端、数据库或登录系统。
- 技术架构固定为 Astro + TypeScript + Markdown Content Collections + 原生 CSS，通过 GitHub Actions 构建并发布到 GitHub Pages。
- 网站必须支持简体中文、繁体中文、英文；核心页面三语齐全，根路径及其子路径提供简体中文，繁体与英文分别使用 `/zh-hant/`、`/en/`。
- 首页必须产品优先：白板录屏工具与诗词图谱同等级占据首屏或紧邻首屏，并可一次点击进入对应子域名；个人介绍只作为产品信任背书。
- 首页不使用宏大品牌口号或大幅介绍标题；导航下方直接展示产品卡片，由具体产品名称、用途和按钮承担说明。
- 产品子域名：`record.leewen.work`、`poem.leewen.work`；新增的 FCL Pipeline Explorer（房贷止赎数据血缘）目前部署在 GitHub Pages（`wen001-git.github.io/ForeclosureRule2/`），未来应映射到 `lineage.leewen.work` 或类似三级子域名，待 DNS 配置。
- 视觉方向、页面结构、内容与验收标准以 `docs/WEBSITE_DESIGN.md` 为准。
- 公开网站不展示简历中的手机号；`8639210@qq.com` 已获准作为公开工作邮箱。
- 保留 `MyResume` 中的原始简历和画像，不覆盖源文件；公开简历应另行生成脱敏版本。
- 所有设计、架构、计划和交接类 Markdown 文档必须包含开头的“目的 / 目标读者 / 如何阅读”和结尾的“变更记录”。

## 当前状态

- [x] 已读取中英文简历和彩铅肖像。
- [x] 已完成网站定位、信息架构、视觉系统、转化设计及静态技术要求。
- [x] 微信二维码已提供：`MyResume/leewen2017微信二维码.jpg`。
- [x] 已确认整站支持简体中文、繁体中文、英文。
- [x] 已确定 Astro 静态架构、三语内容模型和 GitHub Pages 发布流程。
- [x] “关于我”简体、繁体、英文文案已定稿。
- [x] 已确认首页采用双产品并列优先、个人背书辅助的信息结构。
- [x] 已生成可直接预览的三语单文件首页原型 `index.html`。
- [x] 已删除首页口号和介绍性大标题，产品卡片直接开场。
- [x] 已将单文件首页迁移到 Astro + TypeScript 工程，抽出导航和页脚组件，并保留原有三语切换。
- [x] 已将公开画像与微信二维码迁入 `public/images/`，构建产物可直接部署。
- [x] 首页 hero/scenarios/articles 三处各新增 FCL Pipeline Explorer 卡片，三语切换完整覆盖。
- [x] 首页已拆分“个人产品”与“银行专业作品”，五款产品由 Markdown Content Collection 自动分组；ALM 经营分析与 FTP 经营分析均已加入三语详情、可复用媒体栏和静态演示边界说明。
- [x] FTP 经营分析已采用“经营总览→账户级定价追溯→期限与重定价分析”三图故事栏，并提供三语产品卡片、首页详细介绍和独立在线入口。
- [x] 首页已加入左侧可拖动陪伴角色：五种透明表情、产品区域跟随、双端位置记忆、控件避让和三语无障碍均已接入。
- [ ] 尚未实现产品、文章、关于我、合作及 404 等独立页面。
- [x] 工作邮箱已确定为 `8639210@qq.com`。
- [ ] 尚未确定产品价格/购买方式、首批正式文章内容。
- [ ] 为 FCL Pipeline Explorer 申请并配置 leewen.work 三级子域名（如 `lineage.leewen.work`），完成后把首页与对外链接从 GitHub Pages 切到子域名。

## 下一步 TODO

- [x] 确认产品优先的首页结构与三语核心文案。
- [x] 生成单文件静态首页原型，完成三语切换、产品入口、创作者信任区和联系方式。
- [x] 初始化 Astro 静态网站工程并将原型设计迁入页面、基础组件和现有 CSS 设计变量。
- [ ] 在现有三语产品档案基础上，完成产品独立页、文章、关于我、合作和 404 页面。
- [ ] 准备产品截图/演示和脱敏 PDF 简历。
- [ ] 补充首批文章，完成响应式、多语言 SEO、可访问性与上线检查。
- [x] 初始化 Git 仓库、配置 SSH 远端并完成首次提交推送。

## 文件地图

- `src/pages/index.astro`、`src/components/Product*.astro`：三语产品优先首页及数据驱动的产品分组、卡片、单图 sticky 与多图故事栏详情渲染。
- `src/content.config.ts`、`src/content/products/`：产品档案 schema 与五款三语产品数据；新增产品优先在此增加档案，不把卡片重新写进首页。
- `src/components/MascotCompanion.astro`、`public/images/mascot/`：首页陪伴角色的无边框交互层与五张透明 WebP 表情素材。
- `src/components/SiteHeader.astro`、`src/components/SiteFooter.astro`：首页公共导航与页脚组件。
- `public/images/`：可公开部署的彩铅肖像与微信二维码。
- `astro.config.mjs`、`package.json`、`tsconfig.json`：Astro 静态构建、依赖脚本和 TypeScript 配置。
- `docs/WEBSITE_DESIGN.md`：网站设计与实施依据。
- `docs/ADD_PRODUCT_GUIDE.md`：新增产品的资料模板、Markdown 档案、图片、三语校验、构建与发布操作指南。
- `MyResume/李家文_需求分析师_10年以上_2026-05.docx`：中文原始简历，仅保留本地，不提交 Git。
- `MyResume/Li Jiawen_Brief_Resume_Requirements Analyst_202603.docx`：英文原始简历，仅保留本地，不提交 Git。
- `MyResume/李家文肖像画彩铅1.jpg`：网站主视觉候选画像。
- `MyResume/leewen2017微信二维码.jpg`：网站公开微信联系二维码；使用时不得裁切、拉伸或改色。

## 关键实现备忘

- Astro 构建结果统一为 `dist/`；线上不运行 Node.js 或自建 API。
- 简体中文使用根路径，繁体和英文分别使用 `/zh-hant/`、`/en/`。
- 产品和文章用稳定 ID 关联三语版本；缺少译文时不生成空页面或无效语言链接。
- 首页产品按 `personal` / `professional` 自动分组并按 `order` 排序；产品档案缺少三语、分类或链接时 Content Collection schema 会阻止构建。
- 首页产品按钮直接链接产品子域名；主站产品详情只能作为次级“了解更多”入口。
- 银行专业作品统一使用“ALM 经营分析”与“FTP 经营分析”，避免“报表”弱化其多维分析、明细追溯和审计能力；演示系统内部标题不随主站改名。
- 产品详情使用 1–3 项 `media` 数组；三语媒体标题与替代文字数量必须和图片数量一致，单图保持 sticky，多图自然纵向滚动，移动端统一改为普通单列。
- 彩铅肖像和个人履历放在创作者信任区，不放在产品首屏。
- 主站 DNS 配置不得覆盖 `record.leewen.work` 与 `poem.leewen.work`。
- GitHub SSH 远端为 `git@github.com:wen001-git/MyWeb2.git`，主分支为 `main`。
- 原始 DOCX 简历包含不公开信息，已通过 `.gitignore` 排除；只能提交脱敏后的公开版本。
- `scripts/inline.mjs` 当前只处理 `dist/index.html`；多语言子路径落地时需先重构为多页 inline 处理函数再考虑是否保留此架构。
- 陪伴角色仅在产品首屏、使用场景与开始步骤区域跟随视口；进入创作者区域即隐藏，拖动位置按桌面/移动端分别保存在 localStorage。

## 变更记录

| 日期 | 变更内容 |
|------|----------|
| 2026-08-03 | 放大 ALM/FTP 详情区产品识别行，并将 FTP 左栏扩展为经营总览、账户级追溯和多维分析三图故事栏；why：提高产品名称可见性并消除宽幅 Dashboard 下方的大面积视觉空白 |
| 2026-08-03 | 将两款银行产品更名为 ALM 经营分析与 FTP 经营分析，为 FTP 增加 Dashboard 主图和三语首页详情；why：避免“报表”弱化完整分析系统能力，并让访客在进入演示前理解 FTP 的角色、指标和模块范围 |
| 2026-08-03 | 新增 FTP 经营分析报表三语产品档案与公开 Dashboard 截图，并将其排在 ALM 之后展示；why：把已完成的资金转移定价专业作品纳入个人网站，供客户、合作方和招聘方直接体验 |
| 2026-07-29 | 新增 `docs/ADD_PRODUCT_GUIDE.md` 并登记到文件地图，覆盖 AI 代办与手工新增产品流程；why：让后续产品上传有稳定、可重复、可跨工具接手的操作依据 |
| 2026-07-29 | 将首页重构为可扩展的“个人产品＋银行专业作品”双目录，新增四份三语产品档案、ALM 经营分析报表详情和真实 Dashboard 截图；why：区分购买型与专业评估型访客，并让后续新增产品无需复制页面结构 |
| 2026-07-29 | 替换首页陪伴角色的整组视觉素材，以新提供的站立图作为默认形象，金砖、胜利、雨云和鬼脸作为点击表情；why：统一角色脸型与画风并采用用户确认的新角色组合 |
| 2026-07-29 | 新增首页左侧可拖动陪伴角色，接入五种透明表情、区域跟随、双端位置记忆、控件避让、三语无障碍和无边框焦点样式；why：增加个人化创意，同时保护产品按钮与后续阅读区域 |
| 2026-07-25 | post-build 把 `dist/index.html` 内联成 single-file（CSS/JS/图片→`<style>` / `<script type="module">` / `data:image/...;base64,...`），构建脚本改为 `astro build && node scripts/inline.mjs`，构建完 `dist/` 只剩一个约 1.3 MB 的 `index.html`，可双击亦可单独分发；同步删除了昨日误加的「禁止双击 HTML」硬约束、加入多语言页面落地时的重构提醒；why：用户希望 `dist/index.html` 自身就是可直接打开与分发的单一文件，避免任何额外打包或服务步骤 |
| 2026-07-25 | 首页 hero / scenarios / articles 三处各新增 FCL Pipeline Explorer 卡片（CSS-only `.lineage-ui` 视觉、无新图片与新依赖），加入三语 i18n 文案并把 `.product-grid` 改为 3 列（1100px 中间断点降为 2 列再小堆叠），CTA 指向 `https://wen001-git.github.io/ForeclosureRule2/`；同步把硬约束子域名单扩展、把"为 FCL 申请三级子域名"加入 TODO、变更记录追加；why：用户要求把这款房贷止赎数据血缘工具纳入产品组合首页可被直接看到与体验 |
| 2026-07-24 | 将单文件首页迁移为 Astro 7 + TypeScript 静态工程，抽出导航与页脚组件、整理公开图片并验证 `dist/` 构建；why：进入正式多页面和三语内容开发阶段，并支持 Render 标准静态部署 |
| 2026-07-24 | 更新“我在找什么”的三语文案，强调寻找真实问题并结合经验、业务理解与 AI 创造价值；why：同步用户最新自我介绍 |
| 2026-07-24 | 删除首页宏大口号并记录“产品卡片直接开场”的硬约束；why：保持表达具体自然，避免口号抢占产品注意力 |
| 2026-07-24 | 配置 MyWeb2 SSH 远端并将原始 DOCX 简历排除出 Git；why：发布网站代码的同时避免手机号等个人信息进入远端仓库 |
| 2026-07-24 | 新增三语单文件首页原型并记录预览方式、验证状态和后续 Astro 迁移边界；why：用户要求先生成一个可直接打开的 HTML |
| 2026-07-24 | 记录首页产品优先、双产品并列、一次点击体验和个人背书辅助的已确认决策；why：确保后续实现不再把个人介绍或合作入口置于产品之前 |
| 2026-07-24 | 记录已确定的 Astro 静态架构、三语内容模型、发布流程和“关于我”三语定稿状态；why：便于后续 AI 直接按设计方案初始化项目 |
| 2026-07-23 | 将简体中文、繁体中文、英文三语支持写入硬约束、状态与待办；why：确保后续实现从路由、内容到 SEO 均按三语整站建设 |
| 2026-07-23 | 登记微信二维码文件并完成对应待办；why：让后续开发直接复用正式素材并保护二维码可识别性 |
| 2026-07-23 | 确认 8639210@qq.com 为公开工作邮箱并更新隐私约束和待办；why：避免后续实施错误隐藏或替换用户指定邮箱 |
| 2026-07-23 | 初始创建项目协作说明；记录设计阶段现状、静态站硬约束与后续开发入口，便于跨 AI 工具接续 |
