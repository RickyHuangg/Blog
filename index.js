import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

function details(head, info) {
  this.head = head;
  this.info = info;
}

function newPost(head, info) {
  const paper = new details(head, info);
  posts.push(paper);
}
function edit(index, head, info) {
  const paper = new details(head, info);
  posts[index] = paper;
}
function deletePost(index) {
  posts.splice(index, 1);
}
app.post("/save", (req, res) => {
  const title = req.body["title"];
  const content = req.body["content"];
  newPost(title, content);

  res.redirect("/");
});
app.get("/view/:id", (req, res) => {
  let number = req.params.id;
  let paper = posts[number];
  res.render("view.ejs", {
    head: paper.head,
    content: paper.info,
    loca: number,
  });
});

app.get("/edit/:id", (req, res) => {
  let number = req.params.id;
  let paper = posts[number];
  res.render("edit.ejs", {
    head: paper.head,
    content: paper.info,
    loca: number,
  });
});

app.post("/editPost/:id", (req, res) => {
  let number = req.params.id;
  const title = req.body["title"];
  const content = req.body["content"];
  edit(number, title, content);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  let number = req.params.id;
  deletePost(number);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
