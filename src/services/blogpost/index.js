import express from "express";
import createError from "http-errors";

import PostModel from "./schema.js";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    next(createError(500, "An error occurred while getting the posts"));
  }
});

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id);
    if (post) {
      res.send(post);
    } else {
      next(createError(404, `Post ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An error occurred while getting the post"));
  }
});

postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    const { _id } = await newPost.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      next(createError(500, "An error occurred while saving the post"));
    }
  }
});

postsRouter.put("/:id", async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (post) {
      res.send(post);
    } else {
      next(createError(404, `Post ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An error occurred while modifying the post"));
  }
});

postsRouter.delete("/:id", async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    if (post) {
      res.status(204).send();
    } else {
      next(createError(404, `Post ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An error occurred while deleting the post"));
  }
});

export default postsRouter;
