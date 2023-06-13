"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const http_1 = __importDefault(require("http"));
class Server {
    // We define the constructor for the Server and services here
    constructor(config) {
        this.app = (0, express_1.default)();
        this.config = config;
        this.server = http_1.default.createServer(this.app);
    }
    // Initialize Routes, Middlewares, and DB connections
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { AppRouter } = require('./routes');
                const { expressConfig } = require('./config/express.config');
                expressConfig(this.app, AppRouter, this.config);
            }
            catch (e) {
                throw e;
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            yield new Promise((resolve, reject) => {
                this.server.on('error', (err) => {
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
        });
    }
}
exports.server = new Server(config_1.config);
if (!module.parent) {
    exports.server.start();
}
