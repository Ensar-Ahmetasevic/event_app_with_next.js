import { MongoClient } from "mongodb";

// connecting to MongoDB
export async function connectDatabase() {
  const url =
    "mongodb+srv://Ensar_MongoDB:Love1986+@cluster0.1odepbc.mongodb.net/events?retryWrites=true&w=majority";
  const client = await MongoClient.connect(url);

  return client;
}

// accessing and inserting in to DB
export async function insertDocument(client, colection, document) {
  const db = client.db();
  const result = await db.collection(colection).insertOne(document);
  //we wanna make sure that in "db-util", we actually do "return" that "result", so that here we also grab that result and return it.
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  //The default (an empty object: {}) ensures that NO filter is applied (i.e. we get ALL documents).

  // accessing in to DB
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  // find()- finde ALL, sort({_id:-1}) - sort from newest to oldest, toArray() - convert to array

  return documents;
}
