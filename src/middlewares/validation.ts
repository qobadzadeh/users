import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateSchema = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: `Validation error: ${error.message}` });
        }
        next();
    };
};
