import { Request, Response, Router } from "express";
import Post from "../entities/Post";
import Sub from "../entities/Sub";

import auth from "../middleware/auth";

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === "")
    return res.status(400).json({ title: "Title should not be empty" });

  try {
    // Find Sub
    const subRecord = await Sub.findOneOrFail({ name: sub });

    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    return res.status(201).json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
};

const router = Router();

router.post("/", auth, createPost);

export default router;
