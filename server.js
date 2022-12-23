const http = require("http");
const app = require("./app");
// const fs = require("fs");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started, located at ${PORT}`);
});
