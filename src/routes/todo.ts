import express from "express";
import { main } from "../controllers/todo";

const router = express.Router();

router.get("/", main);

export default router;
