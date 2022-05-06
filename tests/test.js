"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("./Block");
const EntityTest_1 = require("./EntityTest");
startUnitTesting().catch(err => {
    console.log(err);
});
async function startUnitTesting() {
    await EntityTest_1.EntityTest.test();
    await Block_1.Block.test();
}
//# sourceMappingURL=test.js.map