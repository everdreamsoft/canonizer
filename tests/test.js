"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("./Block");
startUnitTesting().catch(err => {
    console.log(err);
});
async function startUnitTesting() {
    await Block_1.Block.test();
}
//# sourceMappingURL=test.js.map