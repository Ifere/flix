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
Object.defineProperty(exports, "__esModule", { value: true });
class UserHandlers {
    constructor(usecase) {
        this.usecase = usecase;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const resp = yield this.usecase.createUser(user);
            res.json(resp);
        });
    }
    authUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const resp = yield this.usecase.authenticateUser(user);
            res.json(resp);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const resp = yield this.usecase.getUser(userID);
            res.json(resp);
        });
    }
    fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = req.query;
            const resp = yield this.usecase.fetchUsers(filter);
            res.json(resp);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const updates = req.body;
            const resp = yield this.usecase.updateUser(userID, updates);
            res.json(resp);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const resp = yield this.usecase.deleteUser(userID);
            res.json(resp);
        });
    }
    getUserFriends(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const filters = req.query;
            const resp = yield this.usecase.getUserFriends(userID, filters);
            res.json(resp);
        });
    }
}
exports.default = UserHandlers;
//# sourceMappingURL=handlers.js.map