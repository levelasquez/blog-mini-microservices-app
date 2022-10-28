const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Event Received: ", req.body.type);

  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, status, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
