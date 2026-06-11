# 部署到 GitHub Pages
# 使用方法：在 PowerShell 中运行此脚本

$repoName = "xizang-job-site"
$repoDir = "C:\Users\mmjbx\Desktop\xizang-job-site"

Write-Host "=== 西藏公考通 - GitHub Pages 部署脚本 ===" -ForegroundColor Cyan
Write-Host ""

# 检查是否已登录 GitHub
$ghCheck = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "请先登录 GitHub：" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor Green
    exit 1
}

# 创建 GitHub 仓库
Write-Host "正在创建 GitHub 仓库..." -ForegroundColor Cyan
gh repo create $repoName --public --source $repoDir --push --remote origin --description "西藏公考通 - 西藏公务员事业编岗位查询平台"

if ($LASTEXITCODE -eq 0) {
    Write-Host "仓库创建成功！" -ForegroundColor Green

    # 启用 GitHub Pages
    Write-Host "正在启用 GitHub Pages..." -ForegroundColor Cyan
    gh api repos/$env:GITHUB_USER/$repoName/pages -X POST -f source.branch="main" -f source.path="/"

    # 获取 Pages URL
    $pagesUrl = gh api repos/$env:GITHUB_USER/$repoName/pages | ConvertFrom-Json | Select -ExpandProperty html_url

    Write-Host ""
    Write-Host "=== 部署完成 ===" -ForegroundColor Green
    Write-Host "网站地址: $pagesUrl" -ForegroundColor Green
} else {
    Write-Host "创建失败，请手动执行：" -ForegroundColor Red
    Write-Host "1. 在 GitHub 创建新仓库 $repoName" -ForegroundColor Yellow
    Write-Host "2. 在项目目录运行：" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/你的用户名/$repoName.git" -ForegroundColor Green
    Write-Host "   git branch -M main" -ForegroundColor Green
    Write-Host "   git push -u origin main" -ForegroundColor Green
    Write-Host "3. 在仓库 Settings → Pages 启用" -ForegroundColor Yellow
}
