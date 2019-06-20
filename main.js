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

  request.open('get', './xxx')
  // request.onreadystatechange=function(){
  //   console.log(request.readyState)
  // }
  request.send()


  // setInterval(() => {
  //   console.log(request.readyState)
  // }, 1);
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
})







