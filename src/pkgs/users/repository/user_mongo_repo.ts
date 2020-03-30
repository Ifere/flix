import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel, { User, AuthUser, VerifyUser } from "../../../models/user_model";
import user_model from "../../../models/user_model";

// implements the user repo interface
// implements the user repo interface using mongodb mongoose
export interface UserRepo {
    createUser(user: AuthUser): Promise<User | null>;
    authUser(userAuth: AuthUser): Promise<string | null>;
    getUserById(userID: string): Promise<User | null>;
    verifyUser(user: AuthUser): Promise<boolean>;
    fetchUsers(filters: any): Promise<User[] | null>;
    updateUser(userID: string, updates: any): Promise<User | null>;
    deleteUser(userID: string): Promise<any>;
    getUserFriends(userID: string, filter: any): Promise<User[] | null>;
}


export default class MongoUserRepo implements UserRepo {

    // creates new user
    public async createUser(user: AuthUser): Promise<User | null> {
        try {
            const data = await UserModel.create(user);
            data.password = undefined
            console.log(data)
            return data;

        } catch (error) {
            console.log(error);
            throw Error("user not created");
        }

    }

    public async authUser(userAuth: AuthUser): Promise<string | null> {
        try {
            let data;
            if (userAuth.userName) {
                data = await UserModel.findOne({ "userName": userAuth.userName });
            }
            else if (userAuth.email) {
                data = await UserModel.findOne({ "email": userAuth.email });
            }

            if (data && data.password && await bcrypt.compare(userAuth.password, data.password)) {
                return data._id
            }
            return null
        } catch (error) {
            console.log(error);
            throw Error("sign in failed");
        }
    }

    // gets user by id

    public async getUserById(userID: string): Promise<User | null> {
        try {
            const data = await UserModel.findById(userID)
            if (data) data.password = undefined
            return data;

        } catch (error) {
            console.log(error);
            return null

        }
    }

    // get user by email or username

    public async verifyUser(user: AuthUser): Promise<boolean> {
        try {
            let data;
            if (user.userName) {
                data = await UserModel.findOne({ "userName": user.userName });
            }
            else if (user.email) {
                data = await UserModel.findOne({ "email": user.email });
            }
            if (data) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }


    // gets all users (by filter)
    public async fetchUsers(filters: any): Promise<User[] | null> {
        try {
            const users = await UserModel.find(filters);
            // for (const u of users) {
            //         u.password = undefined
            // }
            return users
        } catch (error) {
            console.log(error);
            throw Error("users not found");

        }
    }

    // updates user details
    public async updateUser(userID: string, updates: any): Promise<User | null> {
        try {
            const user = await UserModel.findByIdAndUpdate(userID, { $set: updates }, { new: true });
            if (user) user.password = undefined
            return user
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
