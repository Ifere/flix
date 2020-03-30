import { Request, Response, NextFunction } from "express";
import GeneralResponse from "../../../../../config/responses";
import { SignToken, TokenUserId } from "../../../../../config/crypto/auth";
import UserUseCase from "../../usecase/user_usecase";
import { AuthUser } from "../../../../models/user_model";

export default class UserHandlers {

    public usecase: UserUseCase;
    constructor(usecase: UserUseCase) {
        this.usecase = usecase;
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user: AuthUser = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            }
            if (!await this.usecase.verifyUser(user)) {

                const resp = await this.usecase.createUser(user);
                if (user) {
                    const t: TokenUserId = {
                        user_id: resp.data._id,
                    }
                    const token = SignToken(t)
                    res.json(token);
                } else {
                    const respp: GeneralResponse = {
                        success: false,
                        error: "User already exists"
                    }
                    res.json(respp)
                }
            }
        } catch (error) {
            console.log(error)
            const resp: GeneralResponse = {
                success: false,
                error: "Unknown Error"
            }
            res.json(resp)

        }
    }

    public async authUser(req: Request, res: Response) {
        try {
            const login = req.body;
            const user = await this.usecase.authenticateUser(login);
            if (user) {
                const t: TokenUserId = {
                    user_id: user,
                }
                const token = SignToken(t)
                res.json(token)

            }
        } catch (error) {
            console.log(error)
            res.sendStatus(403)
        }
    }

    public async getUser(req: Request, res: Response) {
        const { userID } = req.params;
        const resp = await this.usecase.getUserById(userID);
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
