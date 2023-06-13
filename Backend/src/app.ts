import express, {Application} from 'express';
import {config} from "./config";
import {configType} from "./config/config.dev";
import http from 'http';
import {AppRouter} from "./routes";

export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
    port?: number;
}

class Server {
    app: Application;
    config: configType;
    server: any;

    // We define the constructor for the Server and services here
    constructor(config: configType) {
        this.app = express();
        this.config = config;
        this.server = http.createServer(this.app);
    }
    // Initialize Routes, Middlewares, and DB connections
    async initialize() {
        try {
            const {AppRouter} = require('./routes')
            const {expressConfig} = require('./config/express.config') // Retrieve the express configurations
            expressConfig(this.app, AppRouter, this.config);
        } catch (e) {
            throw e;
        }
    }
    // Start the necessary services and start the server after that
    async start() {
        await this.initialize();
        await new Promise((resolve, reject) => {
            this.server.on('error', (err: ErrnoException) => {
                if (err.syscall !== 'listen') {
                    return reject(err);
                }
                switch (err.code) {
                    case 'EACCES':
                        console.error(`port ${err.port} requires elevated privileges`);
                        process.exit(1);
                    case 'EADDRINUSE':
                        console.error(`port ${err.port} is already in use`);
                        process.exit(1);
                    default:
                        reject(err);
                }
            });

            this.server.on('listening', () => {
                resolve(undefined);

            });

            this.server.listen(this.config.port);
        });

        const info = this.server.address();
        console.log(`Running API server at ${info.address}:${info.port} on ${this.config.NODE_ENV}`);


    }

}

export const server: Server = new Server(config)
if (!module.parent) {
    server.start();
}