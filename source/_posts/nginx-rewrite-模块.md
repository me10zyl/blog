---
title: nginx rewrite 模块
date: 2019-05-06 10:54:02
tags: nginx
---
ngx_http_rewrite_module 使用 REPL 来改写URL，实现**重定向**，**重新匹配跳转**，**改写反向代理URL**功能。
<!-- more -->
#### 重定向

```
server{
    location / {
        rewrite http://www.baidu.com;
    }
    location /test1 { #302 临时重定向
        rewrite http://www.baidu.com redirect;
    }
    location /test2 { #301 永久重定向
        rewrite http://www.baidu.com permanent;
    }
    location /test3 {
        return 301 http://www.baidu.com;
    }
}
```

#### 重新匹配跳转
```
# 没有rewrite 后面没有任何 flag 时就顺序执行 
# 当 location 中没有 rewrite 模块指令可被执行时 就重写发起新一轮location匹配
server{
    location / {
        proxy_pass http://www.baidu.com;
    }
    location /test1 {
        rewrite ^/test1/(.*) /s?wd=$1;
    }
}
```
```
server{
    location / {
        proxy_pass http://www.baidu.com;
    }
    location /test1 {
        rewrite ^/test1/(.*) /s?wd=$1 last;
    }
}
```

#### 改写反向代理URL
```
server{
    location /test1 {
        rewrite ^/test1/(.*) /s?wd=$1 break;
        proxy_pass http://www.baidu.com;
    }
}
```

P.S. proxy_pass 后面加/，意思是不会添加location的地址到反向代理URL。