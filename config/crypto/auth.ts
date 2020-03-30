import fs from "fs";
import jwt, { Algorithm, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose"
import UserRepo from "../../src/pkgs/users/repository/user_mongo_repo";
import { AuthUser, VerifyUser } from "../../src/models/user_model";
// PRIVATE and PUBLIC key
// const privateKEY = fs.readFileSync("jwt_key.pem", 'utf8');
// const publicKEY = fs.readFileSync("jwt_key.pub", 'utf8');
const SecretKey:jwt.Secret = "a2e0bf066dbdbe113b1ced372f5aa7c27d2547d3f2df3e7ea70d4aa1d120fd14380864eb8e9399a89e7d4ce0ed424f68ce8c9e6a2b7571441afccc4325449104"



// SIGNING OPTIONS
const signOptions: jwt.SignOptions = {
    issuer: "Masaba Consulting Group",
    subject: "ifere1066@gmail.com",
    audience: "",
    expiresIn: "15m",
    algorithm: "RS256"
};
interface TokenData {
    token: string;
    expiresIn: number;
    // userID: Types.ObjectId;
}
export interface TokenUserId {
    user_id: string
}



// class JwtToken {
//     constructor(token: string, expiresIn: number, userId: Types.ObjectId) {
//         this.token = token;
//         this.expiresIn = expiresIn;
//         this.userId = userId;
//     }
// }

class AuthStrategy {
    // constructor() {
    // super(CredentialsAuthStrategy.provideOptions(), CredentialsAuthStrategy.handleUserAuth);
    // }

    // SIGNING OPTIONS
    al: Algorithm = "RS256"
    signOptions: jwt.SignOptions = {
        issuer: "Masaba Consulting Group",
        subject: "ifere1066@gmail.com",
        audience: "",
        expiresIn: "1h",
        algorithm: "RS256"
    };

    // Verification Options
    verifyOptions: jwt.VerifyOptions = {
        issuer: "Masaba Consulting Group",
        audience: "",
    };

    public decode(token: string) {
        return jwt.decode(token, { complete: true });
    }

    // public async authMiddleware(req: Request, res:Response, next: NextFunction) {
    //     const header = req.headers;
    //     if (header && header.authorization) {
    //         try {
    //             const bearer = header.authorization.split(' ');
    //             const bearerToken = bearer[1]
    //             const key = privateKEY
    //             const verify = jwt.verify(bearerToken, key) as TokenUserId
    //             req.params.userID = verify.user_id;
    //             next()
    //         } catch (error) {
    //             console.log(error)
    //             next()
    //         }
    //     } else {
    //         next(res.sendStatus(403).json({"message": "No authentication"}))
    //     }
    // }
}


export async function AuthMiddleware(req: Request, res:Response, next: NextFunction) {
    const header = req.headers;
    console.log(req.params)
    if (header && header.authorization) {
        try {
            const bearer = header.authorization.split(' ');
            const bearerToken = bearer[1]
            const Verify = jwt.verify(bearerToken, "a2e0bf066dbdbe113b1ced372f5aa7c27d2547d3f2df3e7ea70d4aa1d120fd14380864eb8e9399a89e7d4ce0ed424f68ce8c9e6a2b7571441afccc4325449104") as TokenUserId
            const checker = new UserRepo();
            let user;
            user = await checker.getUserById(Verify.user_id)
            console.log(req.route)
            if (user && req.params.userID && Verify.user_id === req.params.userID) {
                // TODO: work on authentication
                next()
            }
            else if (user) {
                console.log(user._id, Verify.user_id)
                next()
            } else {
                res.sendStatus(403)
            }
        } catch (error) {
            next(console.log("error extracting token"))
            res.sendStatus(403)

        }
    } else {
        next(res.sendStatus(403).json({"message": "No authentication"}))
    }
}

export function SignToken(toEncrypt: TokenUserId, options: jwt.SignOptions = signOptions): TokenData {


    const Token: TokenData = { token: jwt.sign(toEncrypt,'a2e0bf066dbdbe113b1ced372f5aa7c27d2547d3f2df3e7ea70d4aa1d120fd14380864eb8e9399a89e7d4ce0ed424f68ce8c9e6a2b7571441afccc4325449104'),
                                expiresIn: 3600,
    }
    return Token

}
