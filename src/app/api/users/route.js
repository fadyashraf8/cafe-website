import mongoose from "mongoose";
import { User } from './../../../models/Users';
import { isAdmin } from "../auth/[...nextauth]/route.js";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    if (await isAdmin()) {
      const users = await User.find();
      return Response.json(users);
    } else {
      return Response.json([]);
    }
  }