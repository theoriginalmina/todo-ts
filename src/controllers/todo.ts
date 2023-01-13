import { Request, Response } from "express";

export const main = (_req: Request, res: Response) => {
	res.send("Hi");
};
