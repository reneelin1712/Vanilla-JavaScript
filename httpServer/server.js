const http = require("http");

const server = http.createServer((request, response) => {
  // we process request and response here
  const { method, url, headers } = request;
  const userAgent = headers["user-agent"];
  console.log(userAgent);

  response.writeHead(200, {
    "Content-Type": "application/json",
    "X-Powered-By": "Renee"
  });
  const responseBody = { env: "Node.js" };
  response.write(JSON.stringify(responseBody));
  response.end();
});

server.listen(5000, () => {
  console.log("server is listening on port 5000");
});
