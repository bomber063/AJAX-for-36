# AJAX-for-36
## nodejs-test后台启动应用
`node server.js 8888 >! log 2>&1 &`

### 启动应用

`node server.js 8888`

或者

`node server 8888`

### 添加路由

1. 打开 server.js，添加 if else
2. 重新运行 node server.js 8888

## AJAX简介
* AJAX即“Asynchronous JavaScript and XML”（异步的JavaScript与XML技术）
* 由Jesse James Garrett(杰西·詹姆士·贾瑞特)提出AJAX这个概念
* 详细可见[维基百科链接](https://zh.wikipedia.org/wiki/AJAX)或者[百度百科链接](https://baike.baidu.com/item/ajax/8425?fr=aladdin)

## 首先了解一下其他发请求的操作
### form发请求
1. form发请求的前提是需要一个submit按钮。首先可以发送get请求
* 一个简单的[JSbin链接](http://js.jirengu.com/totabozuci/1/edit?html,output)
* 通过开发者工具在Network里面可以看到发起了一个请求，并且get请求会把submit的信息一起放到Request Headers的view source的第一行可以看到。
* xxx就是action的路径，这里的xxx在开发者工具的view source里面会自动加上\，而在action里面可以加斜杠，比如\xxx，也可以不加斜杠,比如xxx。
* password就是提交的name的给的值，后面的111就是你输入的信息，因为这里是get提交的，显示查询参数（Query String Parameters），所以是明文，都可以看得见。显示类似这样 
`GET /xxx?password=111 HTTP/1.1`
2. 我们改成post请求
* 改成post请求在Request Headers的view source的第一行就没有查询参数了。
* 而提交的信息会显示在第四部分，也就是空格行的下一个部分，也就是表单信息(Form Data)里面，这里最好也是点一下view source，比如看到
`password:123`
* 然后第二部分和第三部分可以在Request Headers的view source里面看到


