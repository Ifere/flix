import express from "express";
import UserUseCase from "../usecase/user_usecase";
import UserHandlers from "./handlers";
const api = express.Router();

export default function newHttpUserDelivery(usecase: UserUseCase) {
    const handler = new UserHandlers(usecase);

    api.route("/users")
        .post((req, res) => handler.createUser(req, res))
        .get((req, res) => handler.fetchUsers(req, res))

    api.route("/users/auth")
    .post((req, res) => handler.authUser(req, res))

    api.route("/users/friends/:userID")
        .get((req, res) => handler.getUserFriends(req, res))

    api.route("/users/:userID")
        .get((req, res) => handler.getUser(req, res))
        .put((req, res) => handler.updateUser(req, res))
        .delete((req, res) => handler.deleteUser(req, res));

    return api;
}
