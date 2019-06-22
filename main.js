// window.jQuery = function(nodeOrSelector){
//   let nodes = {}
//   nodes.addClass = function(){}
//   nodes.html = function(){}
//   return nodes
// }
// window.$ = window.jQuery

// window.Promise = function(fn){
//   // ...
//   return {
//     then: function(){}
//   }
// }

// window.jQuery.ajax = function({url, method, body, headers}){
//   return new Promise(function(resolve, reject){
//     let request = new XMLHttpRequest()
//     request.open(method, url) // 配置request
//     for(let key in headers) {
//       let value = headers[key]
//       request.setRequestHeader(key, value)
//     }
//     request.onreadystatechange = ()=>{
//       if(request.readyState === 4){
//         if(request.status >= 200 && request.status < 300){
//           resolve.call(undefined, request.responseText)
//         }else if(request.status >= 400){
//           reject.call(undefined, request)
//         }
//       }
//     }
//     request.send(body)
//   })
// }

// myButton.addEventListener('click', (e)=>{
//   let promise = window.jQuery.ajax({
//     url: '/xxx',
//     method: 'get',
//     headers: {
//       'content-type':'application/x-www-form-urlencoded',
//       'frank': '18'
//     }
//   })

//   promise.then(
//     (text)=>{console.log(text)},
//     (request)=>{console.log(request)}
//   )

// })

// myButton.addEventListener('click',()=>{
//   let request=new XMLHttpRequest()
//   request.open('GET','/xxx')
//   request.send()
//   setInterval(() => {
//     console.log(request.readyState)
//   }, 0);
// })

myButton.addEventListener('click', function (e) {
  let request = new XMLHttpRequest()
  // request.open('get','http://bomber.com:8001/xxx')

  // request.onreadystatechange=function(){
  //   console.log(request.readyState)
  // }


  // setInterval(() => {
  //   console.log(request.readyState)
  // }, 1);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log('说明请求完毕')
      console.log(request.status)
      if (request.status >= 200 && request.status < 300) {
        // let parser = new DOMParser();
        // let xmlDoc = parser.parseFromString(request.responseText, "text/JSON");
        // console.log(xmlDoc)
        // console.log(xmlDoc.__proto__)
        // let title=xmlDoc.getElementsByTagName('heading')[0].textContent
        // console.log(title)
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

  request.open('get', 'http://bomber.com:8001/xxx')
  request.send()
})







