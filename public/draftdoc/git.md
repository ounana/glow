# GIT

## 基础配置
### 查看
- git config --list
- git config user.name
- git config user.email

### 设置
- git config --global user.name [name]  
- git config --global user.email [email]

## 创建仓库
### 初始化本地仓库
- git init
- git init [folder_name] 自动创建文件夹

### 克隆远程仓库
- git clone [远程库地址]

## 本地提交
1. 添加到暂存区
git add .
2. 提交commits
git commit -m [注释]

### 放弃修改
- git checkout [file_name]

## 状态/日志
- git status
- git log
- git log --oneline 一行显示
- git log --graph 图形化

## 分支操作
### 查看
- git branch 列出本地分支
- git branch -a 列出本地分支和远程分支

### 创建
- git branch [branch_name]
- git checkout -b [br] 拷贝一个当前分支的副本
- git checkout --orphan [分支名] //创建孤立分支，没有任何提交

### 切换
- HEAD 当前指针位置，版本位置
- master 主分支
- git checkout [分支名]
- git checkout master //回到主分支

### 定位、回滚 HEAD

- git checkout [身份信息]

### 合并 把谁的分支合并到当前自己的分支，将分支与当前分支合并

- git merge [分支名]

### 删除

- git push origin --delete [分支名] //删除远程分支
- git branch -d [分支名] //删除本地分支

### 多人开发模式：

- 从主分支创建自己的分支，然后修改自己的分支，最后合并到主分支

### 更新远程分支列表

- git remote update origin -p

  

## 远程仓库

### 查看
  git remote 
  git remote -v //显示详细信息

### 添加

  git remote add [远程库名] [远程库地址]

### 修改

  git remote set-url [远程库名] [远程库地址]

### 推

  git push -u [远程库名] [分支名]
  git push

### 拉

  git pull

### 克隆

  git clone [远程库地址]
  git clone [远程库地址] [自定义文件夹]

* origin 默认的远程库名

## SSH公钥
### 为什么需要ssh公钥？
当我们需要远端登陆的时候，比如git的每次fetch和push都需要登陆的话，那么就太麻烦了，于是就发明了一种客户端公钥的方式，客户端生成一个本地机器的唯一公钥，把这个公钥存在服务端，那么每次访问服务端，只需要告诉它客户端的公钥，以证明是彼此信任关系。

GIT项目的两种方式克隆到本地：
- 通过HTTP:URL方式clone到本地，这样每次fetch/push都需要登陆。
- 使用SSH:URL的方式，需要在提前在本地生成ssh公钥，并存储到服务端。

目前github都是支持这两种方式克隆到本地的。把本地公钥存储到github方式：
- 进入个人setting目录
- 进入SSH and GPG keys菜单
- 选择New SSH key
- title 可以任意设置，将.pub文件的内容复制到内容区，保存即可

### 配置SSH公钥
```sh
# 进入公钥存放目录
cd ~/.ssh
# 输出目录列表 .pub文件就是公钥文件
ls
# 如果没有 用以下命令生成
ssh-keygen -t rsa -C [email]
# 一路回车即可 会提示让你输入文件名字
```

## github多人开发概念

- organization 组织
- team 团队
- repository 仓库

### 操作流程
1. 创建组织，在组织中创建一个仓库
2. 创建团队，向团队中添加github成员
3. 为组织中的仓库添加一个创建好的团队
4. 为该团队设置可访问该仓库的权限，merge/push等