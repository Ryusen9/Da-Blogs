import dbConnect, { collectionNameObject } from "@/lib/database/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const blogsCollection = dbConnect(collectionNameObject.allBlogs);
  const blogs = await blogsCollection.find({}).toArray();
  return NextResponse.json(blogs);
};
