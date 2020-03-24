import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel, { User, AuthUserSchema } from "../../../models/user_model";

// implements the user repo interface
// implements the user repo interface using mongodb mongoose
export interface UserRepo {
    createUser(user: AuthUserSchema): Promise<User | null>;
    authUser(userAuth: AuthUserSchema): Promise<User | null>;
    getUser(userID: string): Promise<User | null>;
    fetchUsers(filters: any): Promise<User[] | null>;
    updateUser(userID: string, updates: any): Promise<User | null>;
    deleteUser(userID: string): Promise<any>;
    getUserFriends(userID: string, filter: any): Promise<User[] | null>;
}


export default class MongoUserRepo implements UserRepo {

    // creates new user
    public async createUser(user: AuthUserSchema): Promise<User | null> {
        try {
            const data = await UserModel.create(user);
            console.log(data)
            return data;

        } catch (error) {
            console.log(error);
            throw Error("user not created");
        }

    }

    public async authUser(userAuth: AuthUserSchema): Promise<User | null> {
        try {
            console.log(userAuth);
            let data;

            if (userAuth.userName) {
                data = await UserModel.findOne({ "userName": userAuth.userName });
            }
            else if (userAuth.email) {
                data = await UserModel.findOne({ "email": userAuth.email });
            }

            if (data && await bcrypt.compare(userAuth.password, data.password)) {
                console.log(data)
                return data
            }
            return null
        } catch (error) {
            console.log(error);
            throw Error("sign in failed");
        }
        
    }

    // gets user by id
    public async getUser(userID: string): Promise<User | null> {
        try {
            const data = await UserModel.findById(userID)
            return data;

        } catch (error) {
            console.log(error);
            throw Error("user not found");

        }
    }


    // gets all users (by filter)
    public async fetchUsers(filters: any): Promise<User[] | null> {
        try {
            const users = await UserModel.find(filters);
            return users
        } catch (error) {
            console.log(error);
            throw Error("users not found");

        }
    }

    // updates user details
    public async updateUser(userID: string, updates: any): Promise<User | null> {
        try {
            return await UserModel.findByIdAndUpdate(userID, { $set: updates }, { new: true });
        } catch (error) {
            console.log(error);
            throw Error("user not updated");

        }

    }

    // deletes user
    public async deleteUser(userID: string): Promise<any> {

        try {
            return await UserModel.findByIdAndDelete(userID);
        } catch (error) {
            console.log(error);
            throw Error("user not deleted")

        }

    }

    // gets all users from single user
    public async getUserFriends(userID: string, filters: any): Promise<User[] | null> {
        //     try {
        //         filters = prepareFilter(filters);

        //         const match = {
        //         const products = await UserModel.
        return null

        //     } catch (error) {
        //         console.log(error);
        //         throw new Error(errors.UnknownError().message);

        //     }
    }

}
