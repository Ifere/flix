import Response from "../../../../config/responses";
import { User, AuthUserSchema } from "../../../models/user_model";
import { UserRepo } from "../repository/user_mongo_repo"



export interface UsecaseI {
    createUser(user: AuthUserSchema): Promise<Response>;
    authenticateUser(auth: AuthUserSchema): Promise<Response>;
    getUser(userID: string): Promise<Response>;
    fetchUsers(filter: any): Promise<Response>;
    updateUser(userID: string, updates: any): Promise<Response>;
    deleteUser(userID: string): Promise<Response>;
    getUserFriends(userID: string, filters: any): Promise<Response>;
}



export default class Usecase implements UsecaseI {
    public repo: UserRepo;

    constructor(repo: UserRepo) {
        this.repo = repo;
    }
    public async createUser(user: AuthUserSchema): Promise<Response> {
        try {
            const data = await this.repo.createUser(user);
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    public async authenticateUser(user: AuthUserSchema): Promise<Response> {
        try {
            const data = await this.repo.authUser(user);
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error,
            }
        }
    }

    public async getUser(userID: string): Promise<Response> {
        try {
            const data = await this.repo.getUser(userID);
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    public async getUserFriends(userID: string, filters: any): Promise<Response> {
        try {
            const data = await this.repo.getUserFriends(userID, filters);
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    public async fetchUsers(filters: any): Promise<Response> {
        try {
            const data = await this.repo.fetchUsers(filters);
            return {
                success: true,
                data,
            };

        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    public async updateUser(userID: string, updates: any): Promise<Response> {
        try {
            const data = await this.repo.updateUser(userID, updates);
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    public async deleteUser(userID: string): Promise<Response> {
        try {
            const data = await this.repo.deleteUser(userID);
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

}
