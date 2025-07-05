const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const server = http.createServer(app);

app.get('/test', (req, res) => {
    res.send('Hello World!');
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});