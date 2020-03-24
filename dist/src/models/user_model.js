"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Schema
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
        sparse: true,
        match: [emailRegex, "PLease enter a valid email address"],
        lowercase: true
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    password: {
        type: String,
        required: true
    },
    igHandle: {
        type: String,
        default: "",
    },
    avatar: {
        tyep: String,
        default: "",
    },
    friends: [{
            type: [String],
        }],
    favoriteGenres: {
        type: [String]
    },
    favoriteMovies: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "movie",
    },
    watched: {
        type: [String],
        unique: true,
    },
    toWatch: {
        type: [String],
        unique: true,
    },
});
// // Virtuals
// UserSchema.virtual("fullName").get(function () {
//     return this.firstName + this.lastName
// })
// // Methods
// UserSchema.methods.getGender = function () {
//     return this.gender > 0 "Male" : "Female"
// }
// // DO NOT export
// interface IUserBase extends IUserSchema {
//     fullName: string;
//     getGender(): string;
// }
// // Export this for strong typing
// export interface IUser extends IUserBase {
//     company: ICompany["_id"];
// }
// // Export this for strong typing
// export interface IUser_populated extends IUserBase {
//     company: ICompany;
// }
// // Static methods
// UserSchema.statics.findMyCompany = async function (id) {
//     return this.findById(id).populate("company").exec()
// }
// // For model
// export interface IUserModel extends model<IUser> {
//     findMyCompany(id: string): Promise<IUser_populated>
// }
// Document middlewares
UserSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = bcrypt_1.default.hashSync(user.password, bcrypt_1.default.genSaltSync(10));
    }
    next();
});
// UserSchema.pre("save", function (this: IUser, next: any): void {
//     const user = this;
//     // Generate the salt
//     bcrypt.genSalt(10, function (error: Error, salt): void {
//         if (error) return next(error);
//         let password = user.password;
//         // Hash the password
//         bcrypt.hash(password, salt, function (error, hash): void {
//             if (error) return next(error);
//             password = hash;
//             next();
//         });
//     });
// });
// Default export
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user_model.js.map