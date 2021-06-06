const path = require("path");
const express = require("express");
const http = require("http");
const hbs = require("hbs");
const geocod = require("./utils/geocoding");
const weatherInfo = require("./utils/whetherinfo");
const geocoder = require("./utils/geocoding");

const app = express();

//define path for express configration
const publicDirPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
// const helpDirPath = path.join(__dirname, "../public/help.html");
// const aboutDirPath = path.join(__dirname, "../public/about.html");
// const whetherDirPath = path.join(__dirname, "../public/whether.html ");

//setup handelbars and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirPath));
// app.use(express.static(helpDirPath));
// app.use(express.static(aboutDirPath));
// app.use(express.static(whetherDirPath));

// app.get("", (req, res) => {
//   res.send("hello express !!!");
// });

// app.get("/help", (req, res) => {
//   res.send("Ready to help !!!");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About us...</h1>");
// });

// app.get("/whether", (req, res) => {
//   res.send([
//     {
//       Forcast: "Sunny",
//     },
//     {
//       Location: "India",
//     },
//   ]);
// });
const port =process.env.PORT || 3000
app.get("", (req, res) => {
  res.render("index", {
    title: "Weathery App",
    name: "shashi kant",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpTitle: "Happy to Help",
    name: "shashi kant",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "shashi kant",
    aboutTitle: " We are creater of this web app",
  });
});

app.get("/whether", (req, res) => {
  if (!req.query.address) {
    return res.send("No address provided");
  }

  geocoder(req.query.address, (error, { location, lat, long }) => {
    if (error) {
      return res.send(error);
    }

    weatherInfo(lat, long, (error, forcastedData) => {
      if (error) {
        return res.send({ error });
      }
      // console.log("hello");
      res.send({
        forecast: forcastedData,
        location,
        address: req.query.address,
      });
    });
  });
  // res.render("whether", {
  //   title: "Weather",
  //   name: "shashi kant",
  //   whetherTitle: "Current whether is sunny",
  //   rainChances: " 10 %",
  //   isSunny: true,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Working error",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "shashi kant",
    errorNote: "Help artical did not found !!!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shashi kant",
    errorNote: "404 Page Not Found",
  });
});

// http
//   .createServer((req, res) => {
//     res.write("hello world");
//     res.end();
//   })
//   .listen(8080);

app.listen(port, () => {
  console.log("Working");
});
