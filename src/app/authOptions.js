import  CredentialsProvider  from 'next-auth/providers/credentials';
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from './../libs/mongoConnect';

import  GoogleProvider  from 'next-auth/providers/google';
import { User } from './../models/Users';
import { getServerSession } from "next-auth";
import { UserInfo } from './../models/UserInfo';







 const authOptions  = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: {
      jwt: true,
      strategy: "jwt"
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: "credentials",
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const email = credentials?.email
          const password = credentials?.password
          mongoose.connect(process.env.MONGO_URL)
          const user = await User.findOne({ email })
          const passwordOk = user && bcrypt.compareSync(password, user.password)
          if (passwordOk) {
            return user;
          }
          return null
        }
      })
    ],
  }
  
  
  export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
  console.log(session)
    if (!userEmail) {
      return false;
    }
    const userInfo = await UserInfo.findOne({email:userEmail});
    if (!userInfo) {
      return false;
    }
    return userInfo.admin;
  }

  export default authOptions