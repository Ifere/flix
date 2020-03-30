"use strict";
// import { Request, Response } from "express";
// import UserUseCase from "../usecase/user_usecase";
// export default class UserHandlers {
//     public usecase: UserUseCase;
//     constructor(usecase: UserUseCase) {
//         this.usecase = usecase;
//     }
//     public async createMovie(req: Request, res: Response) {
//         const user = req.body;
//         const resp = await this.usecase.createMovie(movie);
//         res.json(resp);
//     }
//     public async getMovie(req: Request, res: Response) {
//         const { userID } = req.params;
//         const resp = await this.usecase.getMovies(movieID);
//         res.json(resp);
//     }
//     public async fetchMovies(req: Request, res: Response) {
//         const filter = req.query
//         const resp = await this.usecase.fetchMovies(filter);
//         res.json(resp);
//     }
//     public async updateMovies(req: Request, res: Response) {
//         const { userID } = req.params;
//         const updates = req.body;
//         const resp = await this.usecase.updateMovie(userID, updates);
//         res.json(resp);
//     }
//     public async deleteMovies(req: Request, res: Response) {
//         const { userID } = req.params;
//         const resp = await this.usecase.deleteMovie(userID);
//         res.json(resp);
//     }
// }
//# sourceMappingURL=handlers.js.map