# market

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```


## push 代码的时候 如果发现

```sh
$ git push
fatal: unable to access 'https://github.com/978935221/978935221.github.io.git/': Failed to connect to github.com port 443 after 21063 ms: Couldn't connect to server
```

解决方案：

```sh
# 这里的地址为你电脑设置里面的代理地址
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 开启后需要取消代理，避免电脑其他非github仓库的代码无法提交
git config --global --unset http.proxy
git config --global --unset https.proxy
```

然后打开cmd 输入 用来刷新DNS解析缓存
```sh
ipconfig/flushdns
```