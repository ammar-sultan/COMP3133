const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("./model/User");

const app = express();
const SERVER_PORT = process.env.PORT || 4000;

// Improved GraphQL Schema
const gqlSchema = buildSchema(`
    type Query {
        welcome: String
        greet(name: String!): String
        user(uid: Int!): User
        users: [User]
    }

    type Mutation {
        addUser(uid: Int!, fnm: String!, lnm: String!, salary: Float!): User 
    }

    type User {
        uid: Int
        fnm: String 
        lnm: String
        salary: Float
    }
`);

// Resolver functions with proper error handling
const rootResolver = {
  welcome: () => "Welcome to GraphQL examples",

  greet: ({ name }) => `Hello, ${name}`,

  user: async ({ uid }) => {
    try {
      const user = await UserModel.findOne({ uid }).lean();
      if (!user) throw new Error("User not found");
      return {
        uid: user.uid,
        fnm: user.firstname,
        lnm: user.lastname,
        salary: user.salary,
      };
    } catch (error) {
      throw new Error(`User query failed: ${error.message}`);
    }
  },

  users: async () => {
    try {
      const users = await UserModel.find().lean();
      return users.map((user) => ({
        uid: user.uid,
        fnm: user.firstname,
        lnm: user.lastname,
        salary: user.salary,
      }));
    } catch (error) {
      throw new Error(`Users query failed: ${error.message}`);
    }
  },

  addUser: async ({ uid, fnm, lnm, salary }) => {
    try {
      // Check for existing user
      const exists = await UserModel.exists({ uid });
      if (exists) throw new Error("User ID already exists");

      const newUser = await UserModel.create({
        uid,
        firstname: fnm,
        lastname: lnm,
        salary,
      });

      return {
        uid: newUser.uid,
        fnm: newUser.firstname,
        lnm: newUser.lastname,
        salary: newUser.salary,
      };
    } catch (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
  },
};

// Database connection with retry logic
const connectDB = async () => {
  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Connecting to MongoDB (attempt ${i + 1})`);
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) throw error;
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
};

// GraphQL middleware setup
app.use(
  "/graphql",
  graphqlHTTP({
    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    }),
  })
);

// Server startup
const startServer = async () => {
  try {
    await connectDB();
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${SERVER_PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
