"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const local = "mongodb://localhost:27017/flix";
const url = "mongodb+srv://ifere:haaland2020@cluster0-mvvga.mongodb.net/test?retryWrites=true&w=majority";
exports.connectMongodb = () => {
    mongoose_1.default.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log("db connected")).catch(console.log);
};
//# sourceMappingURL=mongo.js.map