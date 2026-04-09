import express, {Application} from "express";
import helmet from "helmet";
import cors from "cors";
import {errorMiddleware} from "./middleware/error.middleware";

export function createApp(): Application {
    const app = express();

    app.use(helmet());
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(errorMiddleware)
    return app;
}