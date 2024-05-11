import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
): void => {
    console.error('An unexpected error occurred:', err);
    res.status(500).json({ message: 'Internal server error' });
};