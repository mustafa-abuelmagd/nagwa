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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const path = __importStar(require("path"));
const middlewares_1 = require("../middlewares");
const fs = __importStar(require("fs"));
const controllerDir = '../controllers/src';
class AppRouter {
    // private router: _Router
    constructor(app, config) {
        this.app = app;
        this.config = config;
    }
    initialize() {
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // @ts-ignore
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        const publicControllers = [];
        const privateControllers = [];
        const dir = path.join(__dirname, controllerDir);
        this.getControllers(dir, privateControllers, publicControllers);
        this.injectControllers(publicControllers);
        this.app.use(middlewares_1.authentication);
        this.injectControllers(privateControllers);
    }
    getControllers(dir, privateControllers, publicControllers) {
        const files = fs.readdirSync(dir);
        for (let i = 0; i < files.length; i++) {
            const controllerDir = path.join(dir, files[i]);
            if (fs.lstatSync(controllerDir).isDirectory()) {
                this.getControllers(controllerDir, privateControllers, publicControllers);
            }
            else {
                const controller = require(`${controllerDir}`);
                if (controller.type === 'private') {
                    privateControllers.push(controller);
                }
                else
                    publicControllers.push(controller);
            }
        }
    }
    injectControllers(controllers) {
        for (let i = 0; i < controllers.length; i++) {
            this.app.use(controllers[i].url, controllers[i].router);
        }
    }
}
exports.AppRouter = AppRouter;
