"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("./Event");
startUnitTesting();
function startUnitTesting() {
    Event_1.Event.test().then(res => {
    });
    // EntityTest.test();
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