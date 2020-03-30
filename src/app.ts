import express from "express";
import { connectMongodb } from "../config/db/mongo";
import cors from "cors";
import UserDelivery from "./pkgs/users/delivery/http/routers";
import UserRepo from "./pkgs/users/repository/user_mongo_repo";
import UserUseCase from "./pkgs/users/usecase/user_usecase";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connects to mongodb instance
connectMongodb();

// register user service
const UserRepoInit = new UserRepo();
const UserUseCaseInit = new UserUseCase(UserRepoInit);

// mount controller
app.use("/v1", UserDelivery(UserUseCaseInit));

app.listen(
    // process.env.PORT ||
    8088, () => console.log("server running...."));
