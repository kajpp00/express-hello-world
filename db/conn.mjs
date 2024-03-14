import { MongoClient } from "mongodb";
const PORT = process.env.PORT
import express from 'express'
const app = express();
const connection = process.env.ATLAS_URI || ""

const client = new MongoClient(connection)

let conn;

try {
    conn = await client.connect()
    app.listen(PORT, () => { console.log(`server running on ${PORT}`) })

    console.log("Mongo db connected...")
} catch (e) {
    console.error(e)
}
// app.listen(PORT, () => { console.log(`server running on ${PORT}`) })

let db = conn.db("4dx")

export default db