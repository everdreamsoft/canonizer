import {Assets} from "./Assets";

startUnitTesting();

function startUnitTesting() {

    Assets.test().then(res => {
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

