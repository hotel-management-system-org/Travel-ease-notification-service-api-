import { Request, Response} from 'express';
import { logger } from '../utils/logger';
import {AppError} from "../utils/error-handler";

export function errorMiddleware(
    err: Error | AppError,
    req: Request,
    res: Response,
): void {
    logger.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
    });

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}