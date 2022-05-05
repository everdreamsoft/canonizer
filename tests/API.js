"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Api {
    static async getBlock(id) {
        try {
            const response = await axios_1.default.get(Api.BLOCK_URL + id);
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
Api.BLOCK_URL = _a.API_ROUTE + 'test/block/';
//# sourceMappingURL=API.js.map