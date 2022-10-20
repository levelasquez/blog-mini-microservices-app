const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const id = randomBytes(4).toString("hex");

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening in port 4001");
});
