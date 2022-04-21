"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assets_1 = require("./Assets");
startUnitTesting();
function startUnitTesting() {
    Assets_1.Assets.test().then(res => {
    });
    // EntityTest.test();
    //
    // JetskiWebInterface.test().then(res => {
    //     console.log("JWI test completed");
    // }).catch(err => {
    //     console.log("Error testing JWI");
    // });
    // Contracts.test().then(res => {
    //     console.log("JWI test completed");
    // }).catch(err => {
    //     console.log("Error testing JWI");
    // });
}
//# sourceMappingURL=test.js.map