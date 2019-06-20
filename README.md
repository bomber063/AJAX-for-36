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
* 存在的问题
1. 点击后会在当前页面刷新，
2. 或者在新开一个页面刷新，所以不是特别好用。
### a标签发请求
* a标签可以发起get请求，[JSbin链接](http://js.jirengu.com/qovigosoda/1/edit),通过开发者工具在Network里面可以看到发起了一个请求，并且get请求会把submit的信息一起放到Request Headers的view source的第一行可以看到。
* 我们增加一个[click()原生的API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/click)，可以自动点击，[jsbin链接](http://js.jirengu.com/gidohiwigi/1/edit?html,output)
* 可以设置一个延迟函数,比如setTimeout来延迟三秒自动点击。
* 存在的问题
1. 点击后会在当前页面刷新，
2. 或者在新开一个页面刷新，所以不是特别好用。
3. 只能发起get请求。
### img标签发请求
* img发请求不会刷新页面或者新开一个页面刷新。
* img发请求必须把它放到body里面。
* img存在的问题
1. img只能发起get请求。
2. img发请求必须以图片形式展示。
* [jsbin链接](http://js.jirengu.com/wiwewaweba/1/edit?html,output)
### link标签发请求
* link发请求必须把它放到head里面。
* 存在的问题
1. link只能发起get请求
2. 只能以 CSS、favicon 的形式展示
* [jsbin链接](http://js.jirengu.com/cavubipoju/1/edit?html,output)
### scirpt标签发请求
* scirpt发请求必须把它放到body里面。
* script存在的问题
1. script只能发起get请求
2. script只能以JS脚本的形式运行。比如上节课说的[jsonp就是这个方式](https://github.com/bomber063/JSONP-for-35).
* [jsbin链接](http://js.jirengu.com/duxitumifa/1/edit?html,output)
***
* 以上就是能考虑的常规的请求方式
***
* 以前的时候没有什么方式可以实现
1. get、post、put、delete 请求都行
2. 想以什么形式展示就以什么形式展示

## 微软的突破
* IE 5 率先在 JS 中引入 ActiveX 对象（API），使得 JS 可以直接发起 HTTP 请求。IE在早期对web的贡献是十分巨大的，只不过IE没有遵从标准，可能当时是有点自大了，导致后面出了一个chorme一军突起，导致IE走向末路。早期的IE6占了全球浏览器的90%份额，当时还有一个firefox占了10%左右的份额，然后IE的负责部分就把IE的维护拆掉了，只留下很少的人维护不出病毒即可，也不怎么更新了。firefox也是一直都不温不火，最后被谷歌开发的浏览器chrome突然击垮了IE浏览器。chorme浏览器大概是2008年出现的。仅仅用了两年时间就把IE的份额准平了，现在已经占到份额40%左右。IE大概30%左右。现在大陆用IE的也不多了，开发者一般用chorme，别的用双核浏览器——[维基百科](https://zh.wikipedia.org/wiki/%E5%8F%8C%E6%A0%B8%E6%B5%8F%E8%A7%88%E5%99%A8),[百度百科](https://baike.baidu.com/item/%E5%8F%8C%E6%A0%B8%E6%B5%8F%E8%A7%88%E5%99%A8/7126309?fr=aladdin)
* 随后 Mozilla、 Safari、 Opera 也跟进（抄袭）了，取名 XMLHttpRequest，它的[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)，[它的W3c链接](http://www.w3school.com.cn/xml/xml_http.asp)并被纳入 W3C 规范
***
我们可以在控制台输入
```
window.XMLHttpRequest
```
后可以看到是一个函数
并且我们可以用它构造一个实例对象
```
var x=new XMLHttpRequest()
```
然后我们就可以到看到这个a存在很多属性和函数.
* Gmail就是最早用AJAX功能的，就是页面不会刷新，但是会局部更新。只是当点的一瞬间，它会请求邮件的内容然后展示给你。
***
* 终于Jesse James Garrett(杰西·詹姆士·贾瑞特)提出AJAX这个概念
* AJAX技术点大概三个：
1. 使用 XMLHttpRequest 发请求
2. 服务器返回 XML 格式的字符串(这里为什么是XML，因为当时提出AJAX概念的时候，用XML是比较容易做到的数据传输格式，但是后面都**改用JSON**)
3. JS 解析 XML，并更新局部页面(**以前是用JS解析XML，现在是用JS解析JSON**)

* 一个面试题就是：请使用原生JS来发送AJAX请求。(这个记得后面再补充)
## 写一个AJAX
* 首先我们要明白http响应的第四分部始终都是字符串,只是某些时候刚好符合html格式的一个字符串而已。但是它不是html，而是字符串。当然前三部分也是字符串。
`    response.write(string)`
* http的**后端路径没有点**,比如路径是'/xxx'，而不是'./xxx'，因为浏览器会默认转换为'/xxx'。**后端加点会导致请求出错，而前端部分的路径可加点，也可以不加点**。
* 如果是js的后台响应返回是可以在前端浏览器自动执行的。
* 写出下面三句话就可以发请求啦，用的API包括——[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest),[send](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send),[open](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)
```
myButton.addEventListener('click',function(e){
  let request=new XMLHttpRequest()
  request.open('get','/xxx')
  request.send()
})
```
### XMLHttpRequest
* 使用XMLHttpRequest (XHR)对象可以与服务器交互。您可以从URL获取数据，而**无需让整个的页面刷新。这使得Web页面可以只更新页面的局部**，而不影响用户的操作。XMLHttpRequest在 Ajax 编程中被大量使用。

### open()
* 初始化一个请求。该方法只能JavaScript代码中使用，若要在native code中初始化请求，请使用openRequest()。
* 语法：xhrReq.open(method, url);
* method
> 要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。这里也可以写小写，如果你写的是这四个以外的方法也可以，但是服务器只是不接受。**就是你想怎么请求，就怎么请求**。对于非HTTP(S) URL被忽略。
* url
> 一个DOMString表示要向其发送请求的URL。
> 后面的是可选的。默认是异步的，还有post请求中用户认证名和认证密码。
### send()
* XMLHttpRequest.send() 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。

