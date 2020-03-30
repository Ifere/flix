import mongoose from "mongoose";
const local = "mongodb://localhost:27017/flix";
const url = "mongodb+srv://ifere:<haaland2020>@cluster0-mvvga.mongodb.net/test?retryWrites=true&w=majority"
export const connectMongodb = () => {
    mongoose.connect(
        url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log("db connected")).catch(console.log);
};
