import {Block} from "./Block";
import {EntityTest} from "./EntityTest";

startUnitTesting().catch(err => {
    console.log(err);
});

async function startUnitTesting() {
    await EntityTest.test();
    await Block.test();

}

