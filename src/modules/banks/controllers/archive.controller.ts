import { NextFunction, Request, Response } from "express";
import { ArchiveBankService } from "../services/archive.service.js";
import { db } from "@src/database/database.js";

export const archive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const archiveBankService = new ArchiveBankService(db);
    await archiveBankService.handle(req.params.id, session);

    await db.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
