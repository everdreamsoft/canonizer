"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = require("./Contracts");
startUnitTesting();
function startUnitTesting() {
    // EntityTest.test();
    //
    // JetskiWebInterface.test().then(res => {
    //     console.log("JWI test completed");
    // }).catch(err => {
    //     console.log("Error testing JWI");
    // });
    Contracts_1.Contracts.test().then(res => {
        console.log("JWI test completed");
    }).catch(err => {
        console.log("Error testing JWI");
    });
}
// Mocha and Chai testing framework examples
/*
import assert from "assert"
import { expect } from 'chai';

describe('Hello function', () => {
    it('should return hello world', () => {
        const result = "Hello World!";
        expect(result).to.equal('Hello World!');
    });
});


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
*/
//# sourceMappingURL=test.js.map