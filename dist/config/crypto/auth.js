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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_mongo_repo_1 = __importDefault(require("../../src/pkgs/users/repository/user_mongo_repo"));
// PRIVATE and PUBLIC key
// const privateKEY = fs.readFileSync("jwt_key.pem", 'utf8');
// const publicKEY = fs.readFileSync("jwt_key.pub", 'utf8');
const SecretKey = "a2e0bf066dbdbe113b1ced372f5aa7c27d2547d3f2df3e7ea70d4aa1d120fd14380864eb8e9399a89e7d4ce0ed424f68ce8c9e6a2b7571441afccc4325449104";
// SIGNING OPTIONS
const signOptions = {
    issuer: "Masaba Consulting Group",
    subject: "ifere1066@gmail.com",
    audience: "",
    expiresIn: "15m",
    algorithm: "RS256"
};
// class JwtToken {
//     constructor(token: string, expiresIn: number, userId: Types.ObjectId) {
//         this.token = token;
//         this.expiresIn = expiresIn;
//         this.userId = userId;
//     }
// }
class AuthStrategy {
    constructor() {
        // constructor() {
        // super(CredentialsAuthStrategy.provideOptions(), CredentialsAuthStrategy.handleUserAuth);
        // }
        // SIGNING OPTIONS
        this.al = "RS256";
        this.signOptions = {
            issuer: "Masaba Consulting Group",
            subject: "ifere1066@gmail.com",
            audience: "",
            expiresIn: "1h",
            algorithm: "RS256"
        };
        // Verification Options
        this.verifyOptions = {
            issuer: "Masaba Consulting Group",
            audience: "",
        };
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
    decode(token) {
        return jsonwebtoken_1.default.decode(token, { complete: true });
    }
}
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const header = req.headers;
        console.log(req.params);
        if (header && header.authorization) {
            try {
                const bearer = header.authorization.split(' ');
                const bearerToken = bearer[1];
                const Verify = jsonwebtoken_1.default.verify(bearerToken, "a2e0bf066dbdbe113b1ced372f5aa7c27d2547d3f2df3e7ea70d4aa1d120fd14380864eb8e9399a89e7d4ce0ed424f68ce8c9e6a2b7571441afccc4325449104");
                const checker = new user_mongo_repo_1.default();
                let user;
                user = yield checker.getUserById(Verify.user_id);
                console.log(req.route);
                if (user && req.params.userID && Verify.user_id === req.params.userID) {
                    // TODO: work on authentication
                    next();
                }
                else if (user) {
                    console.log(user._id, Verify.user_id);
                    next();
                }
                else {
                    res.sendStatus(403);
                }
            }
            catch (error) {
                next(console.log("error extracting token"));
                res.sendStatus(403);
            }
        }
        else {
            next(res.sendStatus(403).json({ "message": "No authentication" }));
        }
    });
}
exports.AuthMiddleware = AuthMiddleware;
function SignToken(toEncrypt, options = signOptions) {
    const Token = { token: jsonwebtoken_1.default.sign(toEncrypt, 'a2e0bf066dbdbe113b1ced372f5aa7c27d2547d3f2df3e7ea70d4aa1d120fd14380864eb8e9399a89e7d4ce0ed424f68ce8c9e6a2b7571441afccc4325449104'),
        expiresIn: 3600,
        userID: toEncrypt.user_id
    };
    return Token;
}
exports.SignToken = SignToken;
//# sourceMappingURL=auth.js.map