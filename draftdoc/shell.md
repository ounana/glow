# SHELL

- ls 列出目录
- mkdir [folder_name] 创建文件夹
- touch [file_name] 创建文件
- rm [file_name] 删除文件
- rm -rf [folder_name] 强制删除且无法恢复
- nohup node [app.js] & 后台运行程序，要杀死该进程，需要记住该进程的pid，通过任务管理结束该进程。进程输出日志会产出在当前目录下的nohup.out文件中。
- pwd 输出当前目录路径
- cp [file_name] [path] 复制文件到路径
- mv [file_name] [path] 移动文件到路径
- echo [string] 输出一段字符串
- echo [string] > [file_name] 创建文件并将内容写入文件
- cat [file_name] 输出文件内容
- ps -ef 输出进程信息
- kill -9 [pid] 结束进程
- chmod +x [file_.sh] 提供脚本执行权限
- git version | wc -l 统计执行结果输出行数
- $? 上一段程序的退出状态

## 语法
- 逻辑执行
```sh
# 前一条命令执行成功，才会执行后续命令
git push www.baidu.com && \
echo hello world
```
- 赋值变量
```sh
# 注意等号两边不能有空格
# 赋值字符串
name="huahua"
echo $name
# 赋值一段脚本输出结果
version=`git version`
echo $version
```
- 实现暂停
```sh
function pause(){
  read -n 1 -p "$*" INP
  if [ $INP != '' ];
    then
      echo -ne '\b \n'
    fi
}
pause "pause..."
```
- $? 上一个程序的退出状态
```sh
git version
# 一般0表示执行成功 1表示执行失败
echo $?
if [ $? -ne 0 ];
  then
    echo "Execution failed!"
    exit 1
  fi
```


# SSH
是较可靠的，专为远程登陆和其他网络服务提供安全性的协议。几乎所有的平台都可以运行SSH。
- 登陆
```sh
ssh 用户@ip -p 端口
ssh root@94.191.35.215 -p 22
# 如果有密码，会提示让输入密码
# id_dsa         -->私钥(钥匙)
# id_dsa.pub     -->公钥(锁)
```