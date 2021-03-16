const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080

const app = express()

// 匹配静态资源
app.use(express.static(__dirname + '/build'))

// 将404抛给前端
app.get('*', function (_, response){
  response.sendFile(path.join(__dirname, './build/index.html'))
})

app.listen(port, ()=>{
  console.log("server started on port " + port) 
})