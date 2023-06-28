# 安装eslint

## JavaScript

js 的重要性不言而喻，因此开源社区对它的支持近乎完美，不管你的 js 在哪里，都可以很方便的配置。

我们将要配置的 js 代码风格是 StandardJS, 它通过汇总一些 eslint 规则而成，eslint 是 js 里校验代码质量的大哥。

### 1. 添加配置文件

StandardJS 本身是一些 eslint 规则的集合，因此添加配置文件就是添加 eslint 的配置文件。

这一步主要参考 eslint 的文档（切记：不要参考 StandardJS 文档）。

首先安装 eslint:

```shell
npm install eslint --save-dev
```

安装成功后执行下面的命令配置 StandardJS:

```shell
npx eslint --init
```

执行命令后，命令会依次问你几个问题，如下：

```shell
√ How would you like to use ESLint ? stlye
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard-with-typescript
√ What format do you want your config file to be in? · JavaScript

√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · pnpm
```

### 2.添加 git 支持

添加 git 支持的过程就是配置 git pre-commit hook。它允许我们在提交代码之前，运行自定义命令。

如果对 git hook 很陌生，可以在 git bash 里面执行并查看命令输出：

```shell
git help hooks
```

配置 git hook 需要用到 lint-staged，直接安装：

```shell
npm i -D lint-staged
```

lint-staged 本身和 pre-commit 没有半毛钱关系，但是开源社区帮我们简化了这个过程：

```shell
npm i -g mrm@2
```

mrm 提供了很多配置文件的生成能力，在生成 lint-staged 配置文件时，它会自动帮我们做两件事：

安装配置 git hook 的依赖，即 husky:

在 package.json 里面增加 "lint-staged" 对象字段描述不同的文件如何校验，默认自动加上了 js, css 的校验支持

运行下面的命令生成配置吧：

```shell
mrm lint-staged
```

运行后，如果 package.json devDependencies 中新增了 husky，则 pre-commit 已经被正确的设置了

## CSS

### 1. 添加配置文件

先安装依赖：

```shell
npm install --save-dev stylelint stylelint-config-standard
```

在仓库根目录添加配置文件 `.stylelintrc.json`：

```json
{
  "extends": "stylelint-config-standard"
}
```

### 2. 添加编辑器支持

在 vscode 里面安装插件：`stylelint`，它可以自动标红不规范的 css

配置自动保存格式化：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

后面看情况是否增加 js-beautify-css 的说明

### 3. 添加 git 支持

添加 js 的 git 支持时安装了 lint-staged，我们只需要在 package.json 里面 "lint-staged" 字段添加上 css 文件的处理就可以了：

```json
{
  "lint-staged": {
    "*.css": "stylelint",
    "*.vue": "stylelint"
  }
}
```