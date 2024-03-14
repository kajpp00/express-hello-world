import { MongoClient } from "mongodb";
const connection = process.env.ATLAS_URI || ""
import express from 'express'
const app = express();
const client = new MongoClient(connection)
const PORT = process.env.PORT

let conn;

try {
    conn = await client.connect()
    app.listen(PORT, () => { console.log(`server running on ${PORT}`) })

    console.log("Mongo db connected...")
} catch (e) {
    console.error(e)
} 


let db = conn.db("4dx")

export default db