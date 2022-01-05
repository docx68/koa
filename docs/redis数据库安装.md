# Redis on Windows

在 Virtual Box VM 中运行 Redis 的本机版本。建议在生产环境中使用 Linux 上的Redis，但对于 Windows 平台上的开发人员来说，运行自己的本地版本的 redis 进行开发通常很有用。

在Windows上运行redis的3种最流行的方法是使用Microsoft的原生移植版redis的二进制版本，但由于这是一个非官方端口，它总是落后于Linux / OSX上redis的最新官方开发。

## 在Windows上的Ubuntu上安装Redis

1. 在"开始"屏幕中，搜索**"打开或关闭 Windows 功能**"

2. 选择 Windows 子系统 for Linux 

安装后，您可以通过从Windows命令提示符键入bash在Ubuntu上运行**bash。**要安装最新版本的 Redis，我们首先需要安装一些必备组件：

```
$ sudo apt-get update
$ sudo apt-get install make
$ sudo apt-get install gcc
```

按照官方编译安装

```
$ wget https://download.redis.io/releases/redis-6.2.6.tar.gz
$ tar xzf redis-6.2.6.tar.gz
$ cd redis-6.2.6
$ make
```
现在编译的二进制文件在目录中可用。运行 Redis 时，将：`src`，复制配置文件，修改路径只核实位置

```
$ src/redis-server
```

启动代码

```
./bin/redis-server ./redis.conf
```

