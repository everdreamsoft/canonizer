"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Reference_js_1 = require("./Reference.js");
//does this move to the other branche ?
class Entity {
    constructor(factory, references) {
        // TODO make private and make getters
        this.referenceArray = [];
        this.brotherEntityMap = new Map();
        this.id = 0;
        this.factory = factory;
        factory.sandraManager.registerNewEntity(this);
        this.subjectConcept = factory.sandraManager.get('entity:subject:' + this.id);
        // In case updateOnExistingRef is set then entity must have reference.
        if (factory.updateOnExistingRef.shortname != "null_concept" && ((references && references.length == 0) || !references)) {
            throw new Error("Entity factory expects reference for updateOnExistingRef option -" + (factory.updateOnExistingRef.shortname) + ", no references provided");
        }
        references.forEach(ref => {
            this.addReference(ref);
        });
        if (factory.updateOnExistingRef.shortname != "null_concept") {
            factory.addOrUpdateEntity(this, factory.updateOnExistingRef);
        }
        else
            factory.addEntity(this);
    }
    addReference(ref) {
        this.referenceArray.push(ref);
        return this;
    }
    getRefValue(concept) {
        const foundConcept = this.factory.sandraManager.somethingToConcept(concept);
        const ref = this.referenceArray.find(ref => ref.concept == foundConcept);
        return ref ? ref.value : '';
    }
    createOrUpdateRef(concept, value) {
        const foundConcept = this.factory.sandraManager.somethingToConcept(concept);
        let ref = this.referenceArray.find(ref => ref.concept == foundConcept);
        if (ref === undefined) {
            // @ts-ignore
            ref = new Reference_js_1.Reference(foundConcept, value);
            this.addReference(ref);
        }
        // @ts-ignore
        ref.value = value;
        return ref;
    }
    joinEntity(verb, entity, sandraManager, refArray) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), entity.subjectConcept, false, refArray);
        this.factory.joinFactory(entity.factory, verb);
    }
    setTriplet(verb, target, sandraManager, refArray, updateOnExisting) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), sandraManager.get(target), false, refArray, updateOnExisting);
    }
    setPureShortnameTriplet(verb, target, sandraManager, refArray) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), sandraManager.get(target), true, refArray);
    }
    getJoinedEntitiesOnVerb(verb) {
        const sandra = this.factory.sandraManager;
        const concept = sandra.somethingToConcept(verb);
        const results = this.subjectConcept.triplets.get(concept);
        let entityResult = [];
        if (results) {
            results.forEach(concept => {
                //find corresponding entity
                const entities = [...sandra.entityList.values()].filter((item) => item.subjectConcept === concept);
                entities.forEach(foundEntity => {
                    entityResult.push(foundEntity);
                });
            });
        }
        return entityResult;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map