const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRouter = require("./routes/urlRouter");
const staticRouter = require("./routes/staticRouter");
const userRouter=require("./routes/userRouter");

// Connection to MongoDB
connectToMongoDB();

/*
  loading express in app variable.........
  This is a function provided by the Express framework. When called, it creates a new Express application object.
  This object represents your entire web application and provides methods and properties to define routes, handle
  requests, set up middleware, and more.
*/
const app = express();

// Definig the port number on which our server is listening
const PORT = 8001;

/*
  app.use(express.json());: This line adds middleware to parse incoming requests with JSON payloads. When a 
  client sends a request with a JSON payload (typically in the body of a POST or PUT request), this middleware
  parses the JSON data and makes it available in the req.body property of the request object. It allows your Express
  application to easily handle JSON data sent by clients.
*/
app.use(express.json());

/*
  app.use(express.urlencoded({ extended: false }));: This line adds middleware to parse incoming requests with
  URL-encoded payloads. URL encoding is a way to encode data in the URL's query string or in the body of a POST 
  request. The extended: false option specifies that the URL-encoded data should be parsed using the built-in Node.js
  querystring library. If you set extended: true, it would use the qs library instead
*/
app.use(express.urlencoded({ extended: false }));

/* This line sets the view engine to EJS (Embedded JavaScript). EJS is a templating engine
  that allows you to embed JavaScript code within your HTML templates, making it easier
  to generate dynamic content on the server side.
 */
app.set("view engine", "ejs");

/* Here, the code sets the directory where the application will look for views (templates).
 path.resolve("./views") resolves the path to the "views" directory in the project's
root directory. This line tells Express to look for EJS templates in the "views" directory.
*/

app.set("views", path.resolve("./views"));

// This line uses a route called staticRouter for handling requests to the root URL ("/"). The staticRouter is likely
// responsible for serving static files (like CSS, images, or client-side JavaScript) from a specific directory.
app.use("/", staticRouter);

//handle requests that match the path "/url" or any subpaths under "/url" and invokes the urlRouter
app.use("/url", urlRouter);

//handle requests that match the path "/user" or any subpaths under "/user" and invokes the userRouter
app.use("/user",userRouter);

// Listening on port 8001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
