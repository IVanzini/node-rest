import { Router, Request, Response } from "express";
import * as db from "../db";
import { PostAddDTO } from "../models/post";
import { Error } from "mongoose";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    res.json(await db.getPosts());
});

router.post("/add", async (req: Request, res: Response) => {
    const post: PostAddDTO = req.body;

    try {
        const r = await db.addPost(post.title, post.body, post.author, post.hidden);
        res.json(r);
    } catch(error) {
        const err = {
            message: (error as Error.ValidationError).message 
        }
        res.status(400).json(err);
    }
});

export default router;