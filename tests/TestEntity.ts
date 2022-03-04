import {Entity} from "../src/Entity";
import {EntityFactory} from "../src/EntityFactory";
import {Reference} from "../src/Reference";

interface TestEntityInterface {
    id: string,
    data: string
}

export class TestEntity extends Entity {

    constructor(factory: EntityFactory, testDat: TestEntityInterface) {

        super(factory, [new Reference((factory.sandraManager.get("id")), testDat.id)]);

        this.addReference(new Reference((factory.sandraManager.get("data")), testDat.data))
    }

}
