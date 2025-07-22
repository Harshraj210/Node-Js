const fs = require("fs");
const path = require("path");
// creating your http server
const http = require("http");

// server wil run port 3000
const port = 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    // __dirnmae = current folder where script is srunning
    req.url === "/" ? "index.html" : req.url
  );

  const extName = String(path.extname(filePath)).toLowerCase();
  const mimtypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/Javascript",
    ".png": "image/png",
  };
  const contenttype = mimtypes[extName] || "application/octet-stream";
  //   fs.readFile(filePath,(error,contenttype)=>{ This is wrong is se chodBhangda hoga
  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404!! : File NHI MILA BHAI");
        // res.end("404!! : File NHI MILA BHAI Ezz").statusCode(404);
      }
    } else {
      res.writeHead(200, { "Content-Type": contenttype });
      // 200 = staus code (200 -->okayish , 500 --> server error)
      res.end(data, "utf-8");
    }
  });
});
server.listen(port, () => {
  // server.listen it tells the poirt to start running on that port

  console.log(`server is running on 3000`);
});
