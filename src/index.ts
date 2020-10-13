import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { Routes } from './routes'
import config from './configuration/config'

// create express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//app.use(auth);

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(d => {
                if(d && d.status)
                    res.status(d.status).send(d.messege || d.errors);
                else
                    res.json(d);
            });
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

app.listen(config.port, '0.0.0.0', async () => {
    console.log(`API initialize in port ${config.port}`);
    try {
        await createConnection();
        console.log('DataBase connected');
    }catch (error) {
        console.error('DataBase not connected', error);
    }

});
