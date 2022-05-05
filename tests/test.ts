import {Block} from "./Block";

startUnitTesting().catch(err => {
    console.log(err);
});

async function startUnitTesting() {
    await Block.test();
}

