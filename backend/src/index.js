require('dotenv').config()

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const postgraphile = require('./postgraphile')

const { PORT } = process.env

app.use(cors())

var corsOptions = {
  origin: 'http://localhost:7000',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))

// Default response for any other request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(postgraphile)

app.listen(process.env.PORT, () => 
  {
    console.log(`Server running on port http://${process.env.HOST}:${process.env.PORT}`)
    console.log(`GraphQL http://${process.env.HOST}:${process.env.PORT}/graphql`)  
    console.log(`GraphQL IDE http://${process.env.HOST}:${process.env.PORT}/graphiql`)
  }
)

app.get("/", (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  res.json({"message":"Ok"})
});

/*
const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();

app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://postgres:root@localhost:5432/gesttore",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

// app.listen(process.env.PORT || 3000);
console.log(process.env.PORT)
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
*/