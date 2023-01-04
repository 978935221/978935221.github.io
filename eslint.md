# vite项目安装eslint 

1. 先安装eslint eslint-plugin-vue

```shell

npm install --save-dev eslint eslint-plugin-vue

```
  
2. 初始化eslint
  
```shell

npm eslint --init

```

3. 添加 `git` 支持

    添加git支持即为添加hook

    ·配置 git hook 需要用到 lint-staged，直接安装：

```shell

npm i -D lint-staged

```

  lint-staged 本身和 pre-commit 没有半毛钱关系，但是开源社区帮我们简化了这个过程：


```shell

npm i -g mrm@2

```

```shell
mrm lint-staged
```

## 安装完后即可








