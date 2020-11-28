import { validate } from "class-validator";
import { Request, Response, Router } from "express";

import { User } from "../entities/User";

const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  try {
    // TODO: Validate data
    let errors: Record<string, any> = {};
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errors.email = "Email is already taken";
    if (usernameUser) errors.username = "Username is already taken";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // TODO: Create user
    const user = new User({ email, username, password });

    const error = await validate(user);
    if (error.length > 0) return res.status(400).json({ error });

    await user.save();

    // TODO: Return user
    return res.json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};

const router = Router();
router.post("/register", register);

export default router;
