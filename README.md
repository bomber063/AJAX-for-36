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
***
接下来我们来实现AJAX技术点大概三个
***

### 1.使用 XMLHttpRequest 发请求
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

### 2.服务器返回 XML 格式的字符串
* [xmlw3schools链接](https://www.w3schools.com/xml/),这个网站需要FQ。
* 你还需要修改[MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types),也就是content-type里面，比如
`    response.setHeader('Content-Type', 'text/xml;charset=utf-8')`
或者
`    response.setHeader('Content-Type', 'application/xml;charset=utf-8')`
都可以
* 在xmlw3schools链接中找到一个例子来尝试
```
    response.write(`
    <?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
    `)
```
* 这样就可以在在开发者工具的响应的最后一部分中看到这一串符合XML格式的字符串啦。
### 3. JS 解析 XML，并更新局部页面(**以前是用JS解析XML，现在是用JS解析JSON**)
* 通过 console.log(request)可以在开发者控制台看到很多事件。基本都在[XMLHttpRequest接口的链接里面，包括属性和方法](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest),此接口继承了 XMLHttpRequestEventTarget 和 EventTarget 的属性。
* 通过[XMLHttpRequest.readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)属性返回一个 XMLHttpRequest  代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：

* markdown写表格需要前面空一行

|值	|状态|	描述|
|:--:|:--:|:--:|
|0	|UNSENT	|代理被创建，但尚未调用 open() 方法。|
|1	|OPENED	open() |方法已经被调用。|
|2	|HEADERS_RECEIVED	send() |方法已经被调用，并且头部和状态已经可获得（**这里说明响应可以是分次数返回的，也就是响应的四个部分可以分几次返回**）。|
|3	|LOADING	|下载中； responseText 属性已经包含部分数据。|
|4	|DONE	|下载操作已完成。|
* 我们在console.log(request)中看到的是4，但是在console.log(request.readyState)看到的是1——原因是这个请求需要大概9ms左右，这对于计算机来说已经很慢了。
### 通过循环及赋值来看看需要多少时间
#### 赋值代码为：
`console.time(); var a=1; console.timeEnd()`
* 输出之后显示:default: 0.010009765625ms，所以赋值操作大概是0.01ms
#### 空循环代码为
```
console.time(); 
for(var i=1;i<10;i++)
{}; 
console.timeEnd()

VM178:4 default: 0.007080078125ms//这是输出所用的时间
```
#### 有内容的循环代码为
```
console.time(); 
for(var i=1;i<10;i++){
 console.log(i)
}; 
console.timeEnd()
web-6c84cca251bafe69e9e1.js:1 1
web-6c84cca251bafe69e9e1.js:1 2
web-6c84cca251bafe69e9e1.js:1 3
web-6c84cca251bafe69e9e1.js:1 4
web-6c84cca251bafe69e9e1.js:1 5
web-6c84cca251bafe69e9e1.js:1 6
web-6c84cca251bafe69e9e1.js:1 7
web-6c84cca251bafe69e9e1.js:1 8
web-6c84cca251bafe69e9e1.js:1 9
VM121:5 default: 3.721923828125ms//这是输出所用的时间
```
* 当然以上的计算不是特别精确，但是可以看到循环十次只需要3ms左右，那么这里的9ms就可以执行很多行代码啦。**所以请求的速度是慢于代码执行的速度的**。

#### 通过setTimeout来设置1ms监听
* 代码为
```
  setInterval(() => {
    console.log(request.readyState)
  }, 1);
```
可以看到输出结果从1直接跳到4了，这里是因为2和3太快了，捕捉不到，比1ms还要快。**并且不管这个代码放在open前面还是后面都不会显示数字0，因为代码执行的速度是大于这个延迟函数1ms的速度的**。

* 如果在open之前不用延迟函数，那么就可以显示出数字0.**因为open之前还没有发起请求，都是按照代码执行的速度，速度是一样的**。
`  console.log(request.readyState)//把它放到open之前就可以显示数字0`
***
* 我们大部分时候只需要记住4这个状态，代码请求已经把响应下载完毕。也就是请求完成。
***

#### 通过XMLHttpRequest.onreadystatechange来查看显示的1,2,3,4
如果把它放到open之前就可以显示出1,2,3,4,因为此时就是从0开始变化到1就有输出啦。
```
  request.onreadystatechange=function(){
    console.log(request.readyState)
  }
  request.open('get','./xxx')
```
* 但是如果放到open之后就只显示出2,3,4,因为此时从0到1的阶段结束了，只有1到2的变化后开始输出。
```
  request.open('get','./xxx')
  request.onreadystatechange=function(){
    console.log(request.readyState)
  }
```
#### 请求结束之后是否成功或者失败的API——readyState
* 需要用到[XMLHttpRequest.status](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status)
* 只读属性 XMLHttpRequest.status 返回了XMLHttpRequest 响应中的数字状态码。status 的值是一个无符号短整型。在请求完成前，status的值为0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。
* status码是标准的HTTP status codes。举个例子，status 200 代表一个成功的请求。如果服务器响应中没有明确指定status码，XMLHttpRequest.status 将会默认为200。
* 可以通过代码来判断请求成功
```
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log('说明请求完毕')
      if (request.status >= 200 && request.status < 300) {
        console.log('说明请求成功')
      }
      else if (request.status >= 400) {
        console.log('说明请求失败')
      }
    }
  }
```
* 当然把后端改成404,这里就会显示说明请求失败。
#### AJAX拿到后端返回的响应信息后如何获取(以XML为例子，XML它现在已经过时了，但是可以学习它的某些操作)
* 通过[XMLHttpRequest.responseText](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseText) 属性返回一个**DOMString**，它包含对文本的请求的响应，如果请求不成功或尚未发送，则返回null。responseText属性在请求完成之前将会得到部分属性。 如果 XMLHttpRequest.responseType 的值不是 text 或者空字符串，届时访问 XMLHttpRequest.responseText 将抛出 InvalidStateError 异常。
* 而这里就是返回的是**字符串，只是长得像XML**，我们可以通过responseText.__proto__可以看到他是一个字符串。
```
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

* [xml操作dom链接说明](https://www.w3schools.com/xml/dom_intro.asp)

我们在控制台输入如下代码
```
var text=`<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`
parser = new DOMParser();
xmlDoc = parser.parseFromString(text,"text/xml");

```
之后就可以获得xmlDoc为XMLdocument元素，内容为:
```
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```
* 之后我们输入xmlDoc.getElementsByTagName('to')[0]，就可以获得to标签及它的内容啦。**说明浏览器获取到后端返回的响应是可以用DOM的各种API来操作它的**
* 上面的API链接——[DOMParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)。DOMParser 可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM Document。

#### 解析SVG或者HTML文档节
* DOMParser也可以用来解析一个SVG文档(Firefox 10.0 / Thunderbird 10.0 / SeaMonkey 2.7)或者HTML文档 (Firefox 12.0 / Thunderbird 12.0 / SeaMonkey 2.9). 根据给定的MIME类型不同,parseFromString方法可能返回三种不同类型的文档.如果MIME类型是 text/xml, 则返回一个XMLDocument, 如果MIME类型是 text/svg+xml,则返回一个 SVGDocument, 如果MIME类型是 text/html, 则返回一个HTMLDocument.
#### 解析 XML节
一旦建立了一个解析对象以后,你就可以使用它的parseFromString方法来解析一个XML字符串:

#### 我们把原来代码修改下
* 此时需要删除前面的申明`<?xml version="1.0" encoding="UTF-8"?>`，不删除可能会报错。
* 后端代码修改如下：
```
else if (path === '/xxx') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml;charset=utf-8')
    response.write(`
<note>
  <to>小谷</to>
  <from>bomber</from>
  <heading>打招呼</heading>
  <body>你好</body>
</note>
    `)
    response.end()
```
* 前端代码修改如下：
```
      if (request.status >= 200 && request.status < 300) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(request.responseText, "text/xml");
        console.log(xmlDoc)
        console.log(xmlDoc.__proto__)
        let title=xmlDoc.getElementsByTagName('heading')[0].textContent
        console.log(title)
        console.log('说明请求成功')
      }
```
* 此时就把**DOMstring字符串解析（或者是转换）成了XML对象**。
***
DOM的API操作会有一些麻烦和局限，并且不够简单。
***
### 用JSON就可以简单的表示一些有结构的数据
* XML大概用了五六年左右后出现了JSON，JSON（JavaScript Object Notation，JavaScript对象表示法）是一种由道格拉斯·克罗克福特构想和设计、轻量级的数据交换**语言**。[JSON维基百科](https://zh.wikipedia.org/wiki/JSON),[JSON百度百科](https://baike.baidu.com/item/JSON/2462549?fr=aladdin)。
* 另一种历史就是道格拉斯抄袭JavaScript而发明了JSON，它写了一本书叫做JavaScript：语言精粹（JavaScript: The Good Parts，2008年），内容是说JavaScript哪里不好。感觉对JS之父有深深的恶意，哈哈
* 学习JSON语言比较简单看看[官方网站](https://www.json.org/)，学过JavaScript的很容易理解
#### JSON和JavaScript的区别
1. JSON没有抄袭function和undefined
2. JSON字符串的首尾必须是双引号""
3. 表格列出更多区别

|JSON|JavaScript|
|:--:|:--:|
|没有|undefined|
|null|null|
|数组["a","b"]|数组['a','b']|
|没有函数|函数function fn(){}|
|对象{"name":"bomber"}|对象{name:'bomber'}|
|字符串"bomber"|字符串'bomber'|
|搞不定，因为JSON没有变量，不能引用|声明一个对象引用自己var a={}<br>a.self=a|
|没有原型链|有原型链|

#### 把代码改成JSON形式
* 后端部分代码
```
    response.write(`
    {
      "note":{
        "to": "小谷",
        "from": "bomber",
        "heading": "打招呼",
        "content": "hi"
      }
    }
    `)
```
* 前端部分修改为：
```
      if (request.status >= 200 && request.status < 300) {
        console.log(request.responseText)//这里可以通过type of或者查看原型链看到是一个字符串
        console.log('说明请求成功')
      }
```
* 前端部分收到后端返回的响应是字符串。
* 我们继续增加代码把这个符合JSON格式的字串符转换成，需要用到[JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。
* 前端部分代码继续修改为：
```
request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log('说明请求完毕')
      if (request.status >= 200 && request.status < 300) {
        let string = request.responseText
        let object = window.JSON.parse(string)//把符合JSON语法的字符串转换成JS对应的值（这里就是对象）。这个值包括数组，函数，布尔等等
        console.log(typeof string)//查看string显示可以看到是一个字符串
        console.log(typeof object)//查看object显示可以看到是一个对象
        console.log('object.note')
        console.log(object.note)//可以通过点操作符找到note这个对象
        console.log('object.note.from')
        console.log(object.note.from)//继续通过点操作符找到from这个key里面对应的value
        console.log('说明请求成功')
      }
      else if (request.status >= 400) {
        console.log('说明请求失败')
      }
    }
  }
```
这段onreadystatechange必须放到`let request = new XMLHttpRequest()`之后，但是放到open和send的前后都没有关系。

### 还有JS来写JSON.parse
* 比如[JSON3.js库](https://bestiejs.github.io/json3/)，目前为止不需要管。

### 同源策略与CORS跨域
#### 用form测试同源
* 前端代码为：
```
  <form action="https://www.baidu.com" method="get">
    <input type="password" name="password">
    <input type="submit">
  </form>
```
* 通过开发者平台，**记住需要打开preserve log(保留日志)**,通过点击提交后显示出来200，说明请求成功。并且也没有报错。

#### 用AJAX方法测试同源
* 前端代码修改一句
```
  request.open('get', 'https://www.baidu.com')
```
* 并且把[request.status](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status)打印出来可以在控制台看到显示是0.
* **在请求完成前，status的值为0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0**。
* 并且在Netword里面看请求显示200成功啦。但是在控制台显示了报错，这里的报错就是同源策略问题。说明可以发请求成功，但是
```
      console.log(request.status)
```
* 最后说明，如果你不是baidu.com页面里面的JS，就不能向baidu.com这个域名发起AJAX请求。当然你可以通过其他的发请求，比如img,iframe,form,css,script,a,link等。


#### 为什么要同源策略
* 因为比如用form表单提交请求后会刷新**原来页面**，**刷新的原来页面就完蛋了**，那么**原来完蛋的页面是没有办法拿到（偷取）新页面的内容的**,这是**很安全的**。
* 而AJAX是可以**读取响应的内容的**。浏览器是大家一起用的，如果你能读取别人的内容，那么只要你访问就可以读取支付宝的余额，发一个get请求来读取支付宝余额。发post请求可以转账，当然转账应该还有手机验证码，另外还可以看QQ空间的好友，隐私日志照片等等这样就在互联中毫无隐私可言，因此浏览器是做了这样的安全限制，是不允许你这么做的。**如果某个浏览器是没有这样的安全限制，那么这个浏览器是一个非常危险的软件，会让你所有密码和隐私泄露，这种安全限制是互联网的基础**。
* 只有协议，域名，端口一模一样才允许发AJAX请求
1. http://baidu.com不可以向http://www.baidu.com发AJAX请求。
2. http://baidu.com:80不可以向http://baidu.com:81发AJAX请求。
* [原知乎链接关于为什么form表单提交没有跨域问题，但ajax提交有跨域问题](https://www.zhihu.com/question/31592553/answer/190789780)


