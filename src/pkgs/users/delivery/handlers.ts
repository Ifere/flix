import { Request, Response } from "express";
import UserUseCase from "../usecase/user_usecase";

export default class UserHandlers {

    public usecase: UserUseCase;
    constructor(usecase: UserUseCase) {
        this.usecase = usecase;
    }

    public async createUser(req: Request, res: Response) {
        const user = req.body;
        const resp = await this.usecase.createUser(user);
        res.json(resp);
    }

    public async authUser(req: Request, res: Response) {
        const user = req.body;
        const resp = await this.usecase.authenticateUser(user);
        res.json(resp);
    }

    public async getUser(req: Request, res: Response) {
        const { userID } = req.params;
        const resp = await this.usecase.getUser(userID);
        res.json(resp);
    }

    public async fetchUsers(req: Request, res: Response) {
        const filter = req.query
        const resp = await this.usecase.fetchUsers(filter);
        res.json(resp);
    }

    public async updateUser(req: Request, res: Response) {
        const { userID } = req.params;
        const updates = req.body;
        const resp = await this.usecase.updateUser(userID, updates);
        res.json(resp);
    }

    public async deleteUser(req: Request, res: Response) {
        const { userID } = req.params;
        const resp = await this.usecase.deleteUser(userID);
        res.json(resp);
    }

    public async getUserFriends(req: Request, res: Response) {
        const { userID } = req.params;
        const filters = req.query;
        const resp = await this.usecase.getUserFriends(userID, filters);
        res.json(resp);
    }
}
