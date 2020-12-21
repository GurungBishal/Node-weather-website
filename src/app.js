const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");
const { query } = require("express");

console.log(__dirname);

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPathDirectory = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPathDirectory);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    user: "Bishal Gurung",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    user: "Bishal Gurung",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    text: "This is some help text",
    title: "Help text",
    user: "Bishal Gurung",
  });
});

app.use(express.static(path.join(__dirname, "../public/about.html")));
app.use(express.static(path.join(__dirname, "../public/help.html")));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const queryLocation = req.query.address;
  geoCode(queryLocation, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    foreCast(latitude, longitude, (error, foreCastData) => {
      res.send({
        forecast: foreCastData,
        location,
        address: queryLocation,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.name) {
    return res.send({
      error: "You must enter a name",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    user: "Tom Hardy",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    user: "Tom Hardy",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("The node js server is up and running" + port);
});
