import express from "express";
import cors from "cors";
import listEndPoints from "express-list-endpoints";
import mongoose from "mongoose";

import postsRoutes from "./services/blogpost/index.js";

const server = express();
const port = process.env.PORT || 3001;

// ***************** MIDDLEWARES

server.use(cors());
server.use(express.json());

// ***************** ROUTES

server.use("/blogposts", postsRoutes);

// ***************** ERROR HANDLERS

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
