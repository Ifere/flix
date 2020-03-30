import Response from "../../../../config/responses";
import { User, AuthUser } from "../../../models/user_model";
import { UserRepo } from "../repository/user_mongo_repo"



export interface UsecaseI {
    createUser(user: AuthUser): Promise<Response>;
    authenticateUser(auth: AuthUser): Promise<any>;
    getUserById(userID: string): Promise<Response>;
    verifyUser(user: AuthUser): Promise<boolean>;
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
    public async createUser(user: AuthUser): Promise<Response> {
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

    public async authenticateUser(user: AuthUser): Promise<string | null> {
        try {
            const data = await this.repo.authUser(user);
            return data
        } catch (error) {
            return null
        }
    }

    public async getUserById(userID: string): Promise<Response> {
        try {
            const data = await this.repo.getUserById(userID);
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

    public async verifyUser(user: AuthUser): Promise<boolean> {
        try {
            const data = await this.repo.verifyUser(user);
            return data
        } catch (error) {
            console.log(error)
            return false
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
