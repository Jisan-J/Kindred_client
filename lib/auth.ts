import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) throw new Error("MONGODB_URI is not set");

const client = new MongoClient(mongodbUri);
const db = client.db('event_management');

export const auth = betterAuth({
   plugins: [
        jwt(), 
    ], 
    session:{
      cookieCache:{
        enabled:true,
        strategy:'jwt',
        maxAge: 3*24*60*60

      }
    }
    ,
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
}); 