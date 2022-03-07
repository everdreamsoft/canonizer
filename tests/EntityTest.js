"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTest = void 0;
const EntityFactory_1 = require("../src/EntityFactory");
const SandraManager_1 = require("../src/SandraManager");
const Entity_1 = require("../src/Entity");
const Reference_1 = require("../src/Reference");
class EntityTest {
    constructor() {
    }
    static test() {
        EntityTest.testWithoutUpdateReference();
        EntityTest.testUpdateReference();
        EntityTest.testEntitiesAddition();
        EntityTest.testJoinedEntities();
        EntityTest.testSearch();
    }
    static testWithoutUpdateReference() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory without updateExistingReference
        let planetFactory = new EntityFactory_1.EntityFactory("planet", "atlasFile", sandra);
        let jupiterEntity = new Entity_1.Entity(planetFactory, [new Reference_1.Reference(sandra.get("name"), "jupiter")]);
        describe("Entity Instance and References without updateExistingReference ", () => {
            let radiusRef = jupiterEntity.createOrUpdateRef(sandra.get("radius[km]"), "69911");
            jupiterEntity.createOrUpdateRef(sandra.get("radius[km]"), "70000");
            test('Instance of Entity', () => {
                expect(jupiterEntity).toBeInstanceOf(Entity_1.Entity);
            });
            test('Instance of reference', () => {
                expect(radiusRef).toBeInstanceOf(Reference_1.Reference);
            });
            test('Reference count', () => {
                expect(jupiterEntity.referenceArray.length).toBe(2);
            });
            test('Updated Reference ', () => {
                expect(jupiterEntity.getRefValue(sandra.get("radius[km]"))).toBe("70000");
            });
        });
    }
    static testUpdateReference() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory with updateExistingReference with concept "name"
        let planetFactory = new EntityFactory_1.EntityFactory("planet", "atlasFile", sandra, sandra.get("name"));
        let jupiterEntity = new Entity_1.Entity(planetFactory, [
            new Reference_1.Reference(sandra.get("name"), "Jupiter"),
            new Reference_1.Reference(sandra.get("radius"), "60000")
        ]);
        let jupiterEntityUpdated = new Entity_1.Entity(planetFactory, [
            new Reference_1.Reference(sandra.get("name"), "Jupiter"),
            new Reference_1.Reference(sandra.get("radius"), "70000")
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
    static testSearch() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory with updateExistingReference with concept "name"
        let planetFactory = new EntityFactory_1.EntityFactory("planet", "atlasFile", sandra, sandra.get("name"));
        let jupiterEntity = new Entity_1.Entity(planetFactory, [
            new Reference_1.Reference(sandra.get("name"), "Jupiter"),
            new Reference_1.Reference(sandra.get("radius"), "60000")
        ]);
        let jupiterEntityUpdated = new Entity_1.Entity(planetFactory, [
            new Reference_1.Reference(sandra.get("name"), "Saturn"),
            new Reference_1.Reference(sandra.get("radius"), "70000")
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
    static testEntitiesAddition() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory without updateExistingReference
        let planetFactory = new EntityFactory_1.EntityFactory("planet", "atlasFile", sandra);
        new Entity_1.Entity(planetFactory, [new Reference_1.Reference(sandra.get("name"), "jupiter")]);
        new Entity_1.Entity(planetFactory, [new Reference_1.Reference(sandra.get("name"), "saturn")]);
        describe("Entities Additions", () => {
            test('Entity Count  ', () => {
                expect(planetFactory.entityArray.length).toBe(2);
            });
        });
    }
    static testJoinedEntities() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory without updateExistingReference
        let planetFactory = new EntityFactory_1.EntityFactory("planet", "atlasFile", sandra);
        let environmentFactory = new EntityFactory_1.EntityFactory("environment", "envFile", sandra);
        let jupiterEntity = new Entity_1.Entity(planetFactory, [new Reference_1.Reference(sandra.get("name"), "jupiter")]);
        let jupiterEnvEntity = new Entity_1.Entity(environmentFactory, [new Reference_1.Reference(sandra.get("temp"), "2000")]);
        jupiterEntity.joinEntity("hasEnv", jupiterEnvEntity, sandra);
        let envEntities = jupiterEntity.getJoinedEntitiesOnVerb("hasEnv");
        describe("Joined Entities", () => {
            test('Entity Count  ', () => {
                expect(envEntities[0]).toBeInstanceOf(Entity_1.Entity);
            });
        });
    }
}
exports.EntityTest = EntityTest;
//# sourceMappingURL=EntityTest.js.map