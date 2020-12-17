import { isEmpty } from "class-validator";
import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";

import User from "../entities/User";
import auth from "../middleware/auth";
import user from "../middleware/user";

const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be empty";
    if (isEmpty(title)) errors.title = "Title must not be empty";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Sub already exists";

    if (Object.keys(errors).length > 0) throw errors;
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const sub = new Sub({ name, description, title, user });
    await sub.save();

    return res.status(201).json(sub);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Something went wrong" });
  }
};

const router = Router();

router.post("/", user, auth, createSub);

export default router;
