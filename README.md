# 西藏公考通 - 西藏公职考试岗位查询平台

## 功能特点
- 📊 收录近五年（2021-2026）西藏公务员、事业编、三支一扶、人才引进等岗位数据
- 🔍 多维度搜索：年份、类型、学历、专业、地区、竞争比
- 📈 招录趋势可视化图表
- 🌐 联网搜索官方最新公告
- 📱 响应式设计，手机电脑均可使用

## 数据来源
- [西藏自治区人力资源和社会保障厅](https://hrss.xizang.gov.cn)
- [全国人事考试服务平台](http://zp.cpta.com.cn)
- 2026年西藏公务员报名统计数据（官方PDF）

## 部署到 GitHub Pages

### 方式一：手动部署
1. 在 GitHub 上创建新仓库（如 `xizang-job-site`）
2. 将本目录所有文件推送到仓库 main 分支
3. 进入仓库 Settings → Pages
4. 选择 `main` 分支，`/ (root)` 目录
5. 点击 Save，等待部署完成

### 方式二：命令行部署
```bash
# 在项目目录下执行
git remote add origin https://github.com/你的用户名/xizang-job-site.git
git branch -M main
git push -u origin main
```

## 本地使用
直接在浏览器打开 `index.html` 即可（推荐使用 Chrome/Edge）。

## 数据更新
数据定期通过官方渠道采集更新。如需最新数据，可：
1. 访问 `hrss.xizang.gov.cn` 查看最新公告
2. 在搜索页使用"联网搜索"功能获取官方信息
3. 提交 Issue 告知需要更新的数据

## 免责声明
本站数据仅供参考，请以官方公告为准。
