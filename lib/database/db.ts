import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObject = {
  allBlogs: "blog_collections",
};

export default function dbConnect(collection_name: string) {
  const uri = process.env.DB_CONNECTION_STRING;
  if (!uri)
    throw new Error("DB_CONNECTION_STRING environment variable is not defined");
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(collection_name);
  return collection;
}
