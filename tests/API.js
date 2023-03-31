"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Api {
    static async getJWIProcess(id) {
        try {
            const response = await axios_1.default.get(Api.PROCESSES_URL + id);
            return response.data;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    static async getAssetsWithoutMeta() {
        try {
            const response = await axios_1.default.get(Api.ASSETS_WITHOUT_META_URL);
            return response.data.assets;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.default = Api;
_a = Api;
Api.API_ROUTE = 'http://localhost:8000/api/v1/';
Api.PROCESSES_URL = _a.API_ROUTE + 'jwi/process/';
Api.ASSETS_WITHOUT_META_URL = `${_a.API_ROUTE}jetski/assetsWithoutMeta/`;
//# sourceMappingURL=API.js.map