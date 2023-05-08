import "dotenv/config";
import { Db, MongoClient } from "mongodb";

async function getDb(): Promise<Db> {
  const DB_URI = "mongodb://127.0.0.1:27017/";
  const client = await MongoClient.connect(DB_URI);
  const db = client.db("accounts_db");

  return db;
}

export default getDb;

