# 从npm转换成pnpm

1.卸载当前 npm 下的 node_modules

```shell
rm -rf node_modules
```

2.全局安装 pnpm

```shell
npm install pnpm -g
```

3.在项目根目录创建 .npmrc 文件，内容如下

```shell
# pnpm 配置 
shamefully-hoist=true 
auto-install-peers=true 
strict-peer-dependencies=false
```

4.将 `package-lock.json` 和 `yarn.lock` 转成 `pnpm-lock.yaml` 文件，保证依赖版本不变

```shell
pnpm import
```

5.通过 pnpm 安装依赖

```shell
pnpm install
```

安装完成后，就可使用 `pnpm run dev` 运行工程了

