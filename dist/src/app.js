"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_1 = require("../config/db/mongo");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./pkgs/users/delivery/routes"));
const user_mongo_repo_1 = __importDefault(require("./pkgs/users/repository/user_mongo_repo"));
const user_usecase_1 = __importDefault(require("./pkgs/users/usecase/user_usecase"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connects to mongodb instance
mongo_1.connectMongodb();
// register user service
const UserRepoInit = new user_mongo_repo_1.default();
const UserUseCaseInit = new user_usecase_1.default(UserRepoInit);
// mount controller
app.use("/v1", routes_1.default(UserUseCaseInit));
app.listen(
// process.env.PORT ||
8088, () => console.log("server running...."));
//# sourceMappingURL=app.js.map