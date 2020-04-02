"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../../models/user_model"));
class MongoUserRepo {
    // creates new user
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_model_1.default.create(user);
                data.password = undefined;
                console.log(data);
                return data;
            }
            catch (error) {
                console.log(error);
                throw Error("user not created");
            }
        });
    }
    authUser(userAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                if (userAuth.userName) {
                    data = yield user_model_1.default.findOne({ "userName": userAuth.userName });
                }
                else if (userAuth.email) {
                    data = yield user_model_1.default.findOne({ "email": userAuth.email });
                }
                if (data && data.password && (yield bcrypt_1.default.compare(userAuth.password, data.password))) {
                    return data._id;
                }
                return null;
            }
            catch (error) {
                console.log(error);
                throw Error("sign in failed");
            }
        });
    }
    // gets user by id
    getUserById(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_model_1.default.findById(userID);
                if (data)
                    data.password = undefined;
                return data;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // get user by email or username
    verifyUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                if (user.userName) {
                    data = yield user_model_1.default.findOne({ "userName": user.userName });
                }
                else if (user.email) {
                    data = yield user_model_1.default.findOne({ "email": user.email });
                }
                if (data) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    // gets all users (by filter)
    fetchUsers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find(filters);
                for (const u of users) {
                    u.password = undefined;
                }
                return users;
            }
            catch (error) {
                console.log(error);
                throw Error("users not found");
            }
        });
    }
    // updates user details
    updateUser(userID, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findByIdAndUpdate(userID, { $set: updates }, { new: true });
                if (user)
                    user.password = undefined;
                return user;
            }
            catch (error) {
                console.log(error);
                throw Error("user not updated");
            }
        });
    }
    // deletes user
    deleteUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findByIdAndDelete(userID);
            }
            catch (error) {
                console.log(error);
                throw Error("user not deleted");
            }
        });
    }
    // gets all users from single user
    getUserFriends(userID, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            //     try {
            //         filters = prepareFilter(filters);
            //         const match = {
            //         const products = await UserModel.
            return null;
            //     } catch (error) {
            //         console.log(error);
            //         throw new Error(errors.UnknownError().message);
            //     }
        });
    }
}
exports.default = MongoUserRepo;
//# sourceMappingURL=user_mongo_repo.js.map