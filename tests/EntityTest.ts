import {EntityFactory} from "../src/EntityFactory";
import {SandraManager} from "../src/SandraManager";
import {Entity} from "../src/Entity";
import {Reference} from "../src/Reference";

export class EntityTest {

    constructor() {
    }

    public static test() {

        EntityTest.testWithoutUpdateReference();
        EntityTest.testUpdateReference();
        EntityTest.testEntitiesAddition();
        EntityTest.testJoinedEntities();
        EntityTest.testSearch();

    }

    private static testWithoutUpdateReference() {

        let sandra = new SandraManager();

        // Creating factory without updateExistingReference
        let planetFactory = new EntityFactory("planet", "atlasFile", sandra, sandra.get("name"));
        let jupiterEntity = new Entity(planetFactory, [new Reference(sandra.get("name"), "jupiter")]);

        //CanonManager.getInstance().getCSCanonizeManager().gossip(planetFactory).then(res => {});

        describe("Entity Instance and References without updateExistingReference ", () => {

            let radiusRef = jupiterEntity.createOrUpdateRef(sandra.get("radius[km]"), "69911");
            jupiterEntity.createOrUpdateRef(sandra.get("radius[km]"), "70000");

            test('Instance of Entity', () => {
                expect(jupiterEntity).toBeInstanceOf(Entity);
            });

            test('Instance of reference', () => {
                expect(radiusRef).toBeInstanceOf(Reference);
            });

            test('Reference count', () => {
                expect(jupiterEntity.referenceArray.length).toBe(2);
            });

            test('Updated Reference ', () => {
                expect(jupiterEntity.getRefValue(sandra.get("radius[km]"))).toBe("70000");
            });

        });

    }

    private static testUpdateReference() {

        let sandra = new SandraManager();

        // Creating factory with updateExistingReference with concept "name"
        let planetFactory = new EntityFactory("planet", "atlasFile", sandra, sandra.get("name"));

        let jupiterEntity = new Entity(planetFactory, [
            new Reference(sandra.get("name"), "Jupiter"),
            new Reference(sandra.get("radius"), "60000")
        ]);

        let jupiterEntityUpdated = new Entity(planetFactory, [
            new Reference(sandra.get("name"), "Jupiter"),
            new Reference(sandra.get("radius"), "70000")
        ]);

        describe("Entity Instance and References with updateExistingReference ", () => {

            test('Entity Count  ', () => {
                expect(planetFactory.entityArray.length).toBe(1);
            });

            test('Reference value', () => {
                expect(planetFactory.entityArray[0].getRefValue(sandra.get("radius"))).toBe("70000");
            });

        });

    }

    private static testSearch() {
        let sandra = new SandraManager();

        // Creating factory with updateExistingReference with concept "name"
        let planetFactory = new EntityFactory("planet", "atlasFile", sandra, sandra.get("name"));

        let jupiterEntity = new Entity(planetFactory, [
            new Reference(sandra.get("name"), "Jupiter"),
            new Reference(sandra.get("radius"), "60000")
        ]);

        let jupiterEntityUpdated = new Entity(planetFactory, [
            new Reference(sandra.get("name"), "Saturn"),
            new Reference(sandra.get("radius"), "70000")
        ]);

        let searchSaturn = planetFactory.getAllWith("name", "Saturn");
        let searchSaturnLowerCase = planetFactory.getAllWith("name", "saturn");
        let searchJupiter = planetFactory.getAllWith("name", "Jupiter");
        let searchRadius = planetFactory.getAllWith("radius", "70000");

        describe("Search on reference name and value", () => {
            test('Confirm search is case sensitive ', () => {
                expect(searchSaturnLowerCase.length).toBe(0);
            });
            test('Search Saturn ', () => {
                expect(searchSaturn.length).toBe(1);
            });
            test('Search Jupiter ', () => {
                expect(searchJupiter.length).toBe(1);
            });
            test('Search Radius  ', () => {
                expect(searchRadius.length).toBe(1);
            });
        });

    }

    private static testEntitiesAddition() {

        let sandra = new SandraManager();

        // Creating factory without updateExistingReference
        let planetFactory = new EntityFactory("planet", "atlasFile", sandra);

        new Entity(planetFactory, [new Reference(sandra.get("name"), "jupiter")]);
        new Entity(planetFactory, [new Reference(sandra.get("name"), "saturn")]);

        describe("Entities Additions", () => {
            test('Entity Count  ', () => {
                expect(planetFactory.entityArray.length).toBe(2);
            });
        });
    }

    private static testJoinedEntities() {

        let sandra = new SandraManager();

        // Creating factory without updateExistingReference
        let planetFactory = new EntityFactory("planet", "atlasFile", sandra);
        let environmentFactory = new EntityFactory("environment", "envFile", sandra);

        let jupiterEntity = new Entity(planetFactory, [new Reference(sandra.get("name"), "jupiter")]);
        let jupiterEnvEntity = new Entity(environmentFactory, [new Reference(sandra.get("temp"), "2000")]);

        jupiterEntity.joinEntity("hasEnv", jupiterEnvEntity, sandra);

        let envEntities = jupiterEntity.getJoinedEntitiesOnVerb("hasEnv");

        describe("Joined Entities", () => {
            test('Entity Count  ', () => {
                expect(envEntities[0]).toBeInstanceOf(Entity);
            });
        });

    }


}