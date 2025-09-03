const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes")

// express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://node-tuts:Jdapat03@node-tut.ih9bwbp.mongodb.net/";
mongoose
  .connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

// listen for requests

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/", (req, res) => {
  res.redirect("/blogs").catch((err) => {
    console.log(err);
  });
});



app.use('/blogs', blogRoutes)


// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
