import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB_NAME!;

if (!connectionString) {
  throw new Error("There is no connection string to MongoDB");
}

let client: MongoClient;

async function GetMongoClientInstance() {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }

  return client;
}

export async function GetDb() {
  const client = await GetMongoClientInstance();
  const db = client.db(dbName);

  return db;
}
