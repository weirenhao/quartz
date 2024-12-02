---
date created: 2024-12-02 10:42
share: "true"
date updated: 2024-12-02 10:44
---

## 1.官网下载安装Postman

```复制
https://www.postman.com/
```

## 2.浏览器安装插件（推荐谷歌）

```复制
postman interceptor
```

## 3.开始抓包

### 3.1 postman interceptor插件和postman APP建立连接

在插件上直接打开APP即可
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20240910153207.png)

关联成功后Start Capture按钮变亮，一次不亮，多点几次
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20240910153308.png)

### 3.2  模拟需要执行操作

点击Start Capture按钮，在需要对应的网页进行需要捕获的操作

操作结束后，点击停止按钮。然后接受打开postman app的请求，即可在postman上看到需要的接口
捕获的接口大多数都有安全验证，需要使用其他方法解决如

1.[[../../Python/Python爬虫/Python中处理CSRF令牌|Python中处理CSRF令牌]]
