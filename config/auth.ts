import jwt from "jsonwebtoken";
import { NextFunction } from "express";

const passToken = (req: Request, res: Response, next: NextFunction) => {
    // tslint:disable-next-line: no-string-literal
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
};

module.exports = passToken
