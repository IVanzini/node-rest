import { Router, Request, Response } from "express";

const router = Router();

// non ci va più, perchè alla root risponde il file index.html di angular
// router.get("/", (req: Request, res: Response) => {
//     res.send("Benvenuti sul blog REST API");
// });

router.get("/contatti", (req: Request, res: Response) => {
    res.send("Contattaci");
});

export default router;