let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let body_parser = require('body-parser');
require("dotenv").config();

let database = require('./database/db');
let service_route = require('./routes/service_routes');
const app = express();

//connect with the database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@elyncluster.ab031.mongodb.net/services?retryWrites=true&w=majority` || database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Mongo Connected!"))
.catch((err) => console.log(err));

// set up middleware for http requests
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());

//import routes
app.use('/services', service_route);

// define port
const PORT = process.env.PORT || 5000;

/* Heroku deployment: */
const path = require("path"); // path module

//cluster variable for heroku
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// launch the server
app.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
})