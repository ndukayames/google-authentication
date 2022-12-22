const https = require("https");
const app = require("./app");
const fs = require("fs");

const PORT = process.env.PORT || 8000;

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

server.listen(PORT, () => {
  console.log(`Server started, located at ${PORT}`);
});
