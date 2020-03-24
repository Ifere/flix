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
class Usecase {
    constructor(repo) {
        this.repo = repo;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.createUser(user);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
    authenticateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.authUser(user);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
    getUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.getUser(userID);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
    getUserFriends(userID, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.getUserFriends(userID, filters);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
    fetchUsers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.fetchUsers(filters);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
    updateUser(userID, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.updateUser(userID, updates);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
    deleteUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repo.deleteUser(userID);
                return {
                    success: true,
                    data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error,
                };
            }
        });
    }
}
exports.default = Usecase;
//# sourceMappingURL=user_usecase.js.map