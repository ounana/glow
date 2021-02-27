# GIT

## 全局配置
### 查看
- git config --list 列出所有配置信息
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
- git clone [远程库地址] [自定义文件夹名]

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
- git remote update origin -p 更新远程分支列表，当远程有新的分支需要跟新的时候

### 创建
- git branch [branch_name] 创建当前分支的副本
- git checkout -b [branch_name] 创建当前分支的副本，并切换到副本分支
- git checkout --orphan [branch_name] 创建孤立分支，没有任何历史提交信息

### 切换
- git checkout HEAD 到当前指针位置
- git checkout [main/master] 到主分支
- git checkout [branch_name] 切换分支
- git checkout [log_hash信息] 回滚到历史位置

### 合并
把其他分支合并到当前自己的分支，将分支与当前分支合并
- git merge [branch_name]
- git pull origin [branch_name] 将远端分支拉到本地当前分支

### 删除
- git push origin --delete [branch_name] 删除远程分支
- git branch -d [branch_name] 删除本地分支

### 常用多人开发模式
1. 克隆远程仓库到本地
2. 基于开发分支（develop-branch）创建一个自己的分支
3. 然后基于自己的分支开发修改，提交到本地
4. 切换到开发分支，将自己的分支合并到开发分支
5. 将开发分支推送到远端，最后合并到主分支

## 远程仓库
origin 是默认的远程库名
### 查看
- git remote 列出远程仓库
- git remote -v 显示详细信息

### 添加/修改
- git remote add [远程库名] [远程库地址]
- git remote set-url [远程库名] [远程库地址]

### 推/拉
- git push
- git push orogin [branch_name]
- git pull
- git pull origin [branch_name]

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