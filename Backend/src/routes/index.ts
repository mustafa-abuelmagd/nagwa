import express, {Application, Router as _Router} from 'express';
import {configType} from "../config/config.dev";
import * as path from "path";
import {controllerType} from "../controllers";
import * as fs from "fs";
// Controllers directory
const controllerDir = '../controllers/src';

// Construct the application router that injects all the controllers with their paths
// And some necessary middlewares and headers
export class AppRouter {
    app: Application;
    config: configType;
    // private router: _Router
    constructor(app: Application, config: configType) {
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
        const publicControllers: controllerType[] = [];
        const privateControllers: controllerType[] = [];
        const dir: string = path.join(__dirname, controllerDir);
        this.getControllers(dir, privateControllers, publicControllers);
        this.injectControllers(publicControllers);
        // If application provides authentication, it's here that we put the authentication middleware
        this.injectControllers(privateControllers);

    }


    // Getting controllers from controllers folder
    getControllers(dir: string, privateControllers: any[], publicControllers: any[]) {
        const files = fs.readdirSync(dir);
        for (let i = 0; i < files.length; i++) {
            const controllerDir = path.join(dir, files[i]);
            if (fs.lstatSync(controllerDir).isDirectory()) {
                this.getControllers(controllerDir, privateControllers, publicControllers);
            } else {
                const controller = require(`${controllerDir}`)

                if (controller.type === 'private') {
                    privateControllers.push(controller);
                } else publicControllers.push(controller);
            }
        }

    }

    // Inject controllers in the application middleware stack
    injectControllers(controllers: controllerType[]) {
        for (let i: number = 0; i < controllers.length; i++) {
            this.app.use(controllers[i].url, controllers[i].router)
        }
    }

}