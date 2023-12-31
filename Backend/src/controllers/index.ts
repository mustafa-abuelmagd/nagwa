import {Router} from 'express';

export type controllerType ={
    url: string;
    router: Router;
}
export class BaseController {
    url: string;
    type: string;
    router: Router;

    constructor(url: string, type: string, router: Router) {
        this.url = url;
        this.type = type;
        this.router = router;
    }
}

