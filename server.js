import "./loadEnvironment.mjs";
import express from 'express'
import cors from 'cors'
const router = express.Router()
const app = express();
import db from './db/conn.mjs'
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.use('/form-responses',router)



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

// #############################################################################
// All CRUD Routes.

router.get("/", async (req, res) => {
  let collection = await db.collection("form-responses");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});


router.post("/", async (req, res) => {
  let newDocument = {
      name: req.body.name,
  }
  const collection = await db.collection('form-responses')
  let result = await collection.insertOne(newDocument)
  res.send(result).status(204)
})


app.listen(PORT, () => { console.log(`server running on ${PORT}`) })
