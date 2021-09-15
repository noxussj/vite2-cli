# Vite2 Cli [![GitHub repo size](https://img.shields.io/github/repo-size/noxussj/vite2-cli?color=%23f00&label=size)](https://shields.io/category/size) [![GitHub top language](https://img.shields.io/github/languages/top/noxussj/vite2-cli)](https://shields.io/category/analysis) [![npm](https://img.shields.io/npm/dy/vite2-cli)](https://shields.io/category/downloads) [![GitHub](https://img.shields.io/github/license/noxussj/vite2-cli)](https://shields.io/category/license) [![GitHub Repo stars](https://img.shields.io/github/stars/noxussj/vite2-cli?style=social)](https://shields.io/category/social)

通过 vue3.0 + vite2 初始化项目后，通常还需要进行一些额外的配置，例如 vue-router、vuex、eslint、axios、global scss... 等功能，而 vite2 cli 的作用就是已经提前帮你配置好了。并且还集成了一些其他规范化的功能，目录结构、代码提交校验、代码标签排序等

## 安装

安装到全局

```
npm i vite2-cli -g
```

使用 cli

```
vite2-cli
```

## 相关功能

#### 持续集成

-   采用 vue3.0 + vite + typescript + scss
-   采用 eslint 代码规范
-   集成 git hooks 钩子
-   集成 git commit message 规范
-   集成 git commit code 规范
-   集成 eslint vue/attributes-order 规范
-   已配置 global scss 变量
-   已配置 vue-router 4
-   已配置 vuex 4
-   已配置 @ alias

#### 代码提交信息校验

-   feat：新功能（feature）
-   fix：修补 bug
-   docs：文档（documentation）
-   style： 格式（不影响代码运行的变动）
-   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
-   test：增加测试
-   chore：构建过程或辅助工具的变动
