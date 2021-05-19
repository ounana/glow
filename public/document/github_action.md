Github Action
=====================
这是gitbub官方出品的一个功能，是一种自动化自定义的工作流程服务，您可以发现、创建和共享操作以执行您喜欢的任何作业（包括 CI/CD），并将操作合并到完全自定义的工作流程中。

快速入门
---------------
在 5 分钟或更短时间内将 GitHub Actions 工作流程添加到现有仓库。创建一个工作流程并查看结果。
1. 在项目根目录创建.github/workflow目录，在此目录下创建名为main.yml的新文件。
2. 将以下YAML内容复制到main.yml 文件中。注：如果您的默认分支不是main，请更新DEFAULT_BRANCH的值以匹配您仓库的默认分支名称。
```yaml
name: Super-Linter
on: push
jobs:
  super-lint:
    name: super-lint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Run Super-Linter
        uses: github/super-linter@v3
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
3. 要运行您的工作流程，将此更新提交到github远程仓库即可。
4. 要查看工作流程的执行结果，可到github仓库action菜单下查看即可。

工作流程YAML语法
-------------------------
- name: 工作流程的名称
- on: 需要监听的事件
- jobs: 需要执行的任务
  - name: 任务名称
  - runs-on: 要运行的机器类型
  - steps: 任务步骤
    - name: 步骤名称
    - uses: 使用的action
    - env: 为当前任务注入的环境变量

自定义github action
-------------------------
github提供一种方式可以自定义action，以Docker容器的形式发布你的action。

要创建你的action:
1. 创建一个新的文件夹作为action的目录，如my-action。
2. 创建Dockerfile文件，在该文件中写入以下代码
```dockerfile
# 运行代码的容器图像
FROM alpine:3.10
# 将文件从action仓科拷贝到docker容器
COPY entrypoint.sh /entrypoint.sh
# Docker容器启动时执行的代码文件
ENTRYPOINT ["/entrypoint.sh"]
```
3. 编写shell代码，创建entrypoint.sh文件到该目录下。
```shell
#!/bin/sh -l
echo $MY_ENV
```
4. 使用该action，在yml文件中。
```yaml
jobs:
  steps:
    - name: my-actionb
      uses: ./my-action
      env:
        MY_ENV: MY_ENV
```