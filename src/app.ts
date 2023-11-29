import express, { Request, Response, NextFunction } from "express";
import path from "node:path";
import cors from "cors";
import {config} from "dotenv";
import indexRouter from "./routes/index";
import blogRouter from "./routes/blog";
import usersRouter from "./routes/users";

config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());// serve a consentire le chiamate da angular se angular è su un altro server; 
// in questo caso non serve perchè angular è sullo stesso server (cartella public)
app.use(express.static("public"));// ci abbiamo messo i file generati con la build da angular, va a vedere se trova un file index.html
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/posts", blogRouter);
app.use("/api/users", usersRouter);

// app.get("/", (req: Request, res: Response) => {
//     res.json({ message: "Evviva" });
// });

// fallback: ridireziono al file index.html così che è angular a gestire le rotte
app.use((req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// errore 404: non serve più perchè c'è il middleware sopra, quindi è angular a gestire il 404
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(404).send("Risorsa non trovata.");
// });

// errore 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Qualcosa è andato storto.");
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`)); // se non metto l'hostname di default è localhost