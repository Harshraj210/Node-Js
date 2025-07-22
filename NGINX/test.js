const fs = require('fs')
const http= require('http')
const path =require('path')

const port =3000
const server=http.createServer((req,res)=>{
  const filepath=path.join(__dirname,req.url ==="/" ? "index.html": req.url)
 const extName= String(path.extname(filepath).toLowerCase())
 const mimTypes ={
  ".html":"text/html",
  ".css":"text/css",
  ".js":"text/javascript",
  ".png":"image/png"
 }
 const contentType = mimTypes[extName] || 'application/octet-stream'
 fs.readFile(filepath,(error,data)=>{
  if (error) {
    if (error.code==="ENOENT") {
      res.writeHead(404,{"Content-Type":"index.html"})
      res.end("404!! fileNot Found")
    }
  }
  else{
    res.writeHead(200,{"Content-Type": contentType})
    res.end(data,"utf-16le")
  }
 })
})
server.listen(port,()=>{
  console.log("Server is runnning on port 3000")
})