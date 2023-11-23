import express, { Request, Response, NextFunction } from "express";
import {config} from "dotenv";
import indexRouter from "./routes/index";
import blogRouter from "./routes/blog";
import usersRouter from "./routes/users";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", indexRouter);
app.use("/api/posts", blogRouter);
app.use("/api/users", usersRouter);

// app.get("/", (req: Request, res: Response) => {
//     res.json({ message: "Evviva" });
// });

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));