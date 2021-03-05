# npm

## 命令
```
  * 查看全局包
  > npm ls -g --depth 0

  * 加入到生产阶段依赖
  > npm install react -S

  * 加入到开发阶段依赖
  > npm install react -D

  * 安装指定版本
  > npm install react@16.8.2

  * 初始化项目
  > npm init my-app

  * 卸载包
  > npm uninstall react -S|-D

  * 修复包
  > npm audit fix

  * 得到检查报告
  > npm audit --json

  * 更新包
  > npm update react
  > npm update -g

```

## 配置
```
  * 全局包安装位置修改
  > npm config set prefix "D:\nodejs\node_global"

  * 缓存目录修改
  > npm config set cache "D:\nodejs\node_cache"

  * 全局包安装路径
  > npm root -g

  * 镜像地址查看
  > npm get registry

  * 官方镜像地址
  https://registry.npmjs.org/

  * 淘宝镜像地址
  > npm config set registry https://registry.npm.taobao.org
  > npm config set disturl https://npm.taobao.org/dist/

  * yarn镜像地址
  > yarn config set registry https://registry.npm.taobao.org
  > yarn config set disturl https://npm.taobao.org/dist/

  github 拉取慢可修改以下地址
  https://github.com.cnpmjs.org/ounana/glow.git

  github 默认是不支持pushState历史API的路由器browserHistory

  解决方案
  1. 使用hashHistory
  2. 将404.html添加到build文件夹中


  

```