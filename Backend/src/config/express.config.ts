import express, {Application, Request, Response, NextFunction} from 'express';

import {configType} from "./config.dev";
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import {BaseError, NotFoundError} from "../errors/Errors";

export const expressConfig = (app: Application, router: any, config: configType) => {
    // Use body-parser and morgan logging middlewares
    app.use(bodyParser.json({limit: "10mb"}));
    app.use(bodyParser.urlencoded({
        limit: "10mb",
        extended: true
    }));
    app.use(morgan('dev'));

    // Instantiate the application router
    const __Router = new router(app, config);
    __Router.initialize();
    app.use((req, res, next) => {
        const err = new NotFoundError(); // NotFoundError();
        next(err);
    });
    //Error handling middleware
    app.use((err: BaseError, req: Request, res: Response, next: NextFunction): void => {
        const payload = {
            code: err.code || 0,
            name: err.name,
            message: err.message || 'Error',
            details: err.stack,
            stack: err.stack

        };

        res.statusCode = err.status || 500;
        // ajv errors
        if (err.status && err.status === 400) {
            // Handle ajv errors
            if (Array.isArray(err.message)) {
                payload.details = err.message;
                payload.message = 'validation error(s)';
            }
        }

        payload.stack = err.stack;

        res.json(payload);
    });
}