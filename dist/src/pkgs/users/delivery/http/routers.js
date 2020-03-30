"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlers_1 = __importDefault(require("./handlers"));
const auth_1 = require("../../../../../config/crypto/auth");
const api = express_1.default.Router({ mergeParams: true });
function newHttpUserDelivery(usecase) {
    const handler = new handlers_1.default(usecase);
    api.route("/users")
        .post((req, res, next) => handler.createUser(req, res, next));
    api.route("/users/auth")
        .post((req, res) => handler.authUser(req, res));
    api.use("/users", auth_1.AuthMiddleware);
    api.route("/users")
        .get((req, res, next) => handler.fetchUsers(req, res));
    api.route("/users/friends/:userID")
        .get((req, res) => handler.getUserFriends(req, res));
    api.route("/users/:userID")
        .get((req, res, next) => handler.getUser(req, res))
        .put((req, res) => handler.updateUser(req, res))
        .delete((req, res) => handler.deleteUser(req, res));
    return api;
}
exports.default = newHttpUserDelivery;
//# sourceMappingURL=routers.js.map