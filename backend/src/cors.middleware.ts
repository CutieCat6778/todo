/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log("Request...", req.headers.location);

    const origins = process.env.ORIGINS.split(',')

    console.log(req.header('Origin'), origins.indexOf(req.header('Origin')));

    if (origins.indexOf(req.header('Origin'))) {
      res.header('Access-Control-Allow-Origin', req.header('Origin'));
      res.header('Access-Control-Allow-Headers', 'content-type');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    }

    next();
  }
}
