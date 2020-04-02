import express from "express";
import UserUseCase from "../../usecase/user_usecase";
import UserHandlers from "./handlers";
import { AuthMiddleware } from "../../../../../config/crypto/auth";
const api = express.Router({ mergeParams: true });

export default function newHttpUserDelivery(usecase: UserUseCase) {
    const handler = new UserHandlers(usecase);


    api.route("/users")
        .post((req, res, next) => handler.createUser(req, res, next))

    api.route("/users/auth")
        .post((req, res) => handler.authUser(req, res))

    api.use("/users", AuthMiddleware)

    api.route("/users")
        .get((req, res, next) => handler.fetchUsers(req, res))

    api.route("/users/friends/:userID")
        .get((req, res) => handler.getUserFriends(req, res))

    api.route("/users/:userID")
        .get((req, res, next) => handler.getUser(req, res))
        .put((req, res) => handler.updateUser(req, res))
        .delete((req, res) => handler.deleteUser(req, res));

    return api;
};
