"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressConfig = void 0;
const bodyParser = __importStar(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const expressConfig = (app, router, config) => {
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({
        limit: "10mb",
        extended: true
    }));
    app.use((0, morgan_1.default)('dev'));
    const __Router = new router(app, config);
    __Router.initialize();
    app.use((req, res, next) => {
        const err = new Error("NotFoundError"); // NotFoundError();
        next(err);
    });
    // app.use((err: BaseError, req: Request, res: Response, next: NextFunction): void => {
    //     const payload = {
    //         code: err.code || 0,
    //         name: err.name,
    //         message: err.message || 'Error',
    //         details: err.stack,
    //         stack: err.stack
    //
    //     };
    //
    //     res.statusCode = err.status || 500;
    //     // ajv errors
    //     if (err.status && err.status === 400) {
    //         // Handle ajv errors
    //         if (Array.isArray(err.message)) {
    //             payload.details = err.message;
    //             payload.message = 'validation error(s)';
    //         }
    //     }
    //
    //     payload.stack = err.stack;
    //
    //     res.json(payload);
    // });
};
exports.expressConfig = expressConfig;
