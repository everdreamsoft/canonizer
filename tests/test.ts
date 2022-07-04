import {Assets} from "./Assets";
import {Event} from "./Event";
import {EntityTest} from "./EntityTest";

startUnitTesting();

function startUnitTesting() {

    // Event.test().then(res => {
    // });

    EntityTest.test();

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

