import {Request, Response, NextFunction} from 'express';

export type User =  {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    token?: string,
    todos?: string[],
    created_at?: Date,
    updated_at?: Date,
}

declare global {
    namespace Express {
        interface Request {
            user?: User | undefined;
            user_id?: string | undefined;
            validate: Function;
        }
    }
}

import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import {config} from '../config';


export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if (authorization) {
        // @ts-ignore
        jwt.verify(authorization, config.auth.local.key, async (err: Error, decoded: string) => {
            if (err || _.isNil(decoded)) {
                next(new Error("UnauthenticatedError"));
            }
            try {
                const obj = decoded;

                next();
            } catch (e) {
                next(new Error("Unauthorized to see this resource"));
            }
        });
    } else {
        next(new Error("Unauthorized to see this resource"))
    }


};
