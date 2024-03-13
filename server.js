// import app from './app'

// const port = process.env.PORT

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

import { MongoClient } from 'mongodb';
import {config} from "dotenv";
config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

let conn;

try {
  
  conn = await client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
      console.log("listening for requests");
    })
  });
} catch(e) {
  console.error(e)
}

let db = conn.db("4dx")

console.log(db);

app.get("/", async (req, res) => {
    let item = await client.db("4dx").collection("form-responses")
    let results = await item.find({}).toArray(0)

    return res.send(results).status(200)
})


// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('client/dist', options))

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({
    at: new Date().toISOString(),
    method: req.method,
    hostname: req.hostname,
    ip: req.ip,
    query: req.query,
    headers: req.headers,
    cookies: req.cookies,
    params: req.params
  })
    .end()
})


// module.exports = app

// app.listen(PORT, () => { console.log(`server running on ${PORT}`) })
