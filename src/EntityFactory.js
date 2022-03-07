"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFactory = void 0;
class EntityFactory {
    constructor(isa, containedIn, sandraManager, updateOnExistingRef) {
        this.entityArray = [];
        this.storage = '';
        this.refMap = new Map();
        this.entityByRevValMap = new Map();
        this.joinedFactory = [];
        this.brotherEntityMap = new Map();
        this.is_a = isa;
        this.contained_in_file = containedIn;
        this.sandraManager = sandraManager;
        if (updateOnExistingRef == null) {
            updateOnExistingRef = sandraManager.get('null_concept');
        }
        this.updateOnExistingRef = updateOnExistingRef;
    }
    addEntity(entity) {
        this.entityArray.push(entity);
        let factory = this;
        entity.referenceArray.forEach(element => {
            factory.sandraManager.registerNewReference(element);
            factory.refMap.set(element.concept.unid, element.concept.shortname);
            let refMapByConcept;
            if (!this.entityByRevValMap.has(element.concept)) {
                refMapByConcept = new Map();
                this.entityByRevValMap.set(element.concept, refMapByConcept);
            }
            else {
                // @ts-ignore
                refMapByConcept = this.entityByRevValMap.get(element.concept);
            }
            if (refMapByConcept.has(element.value)) {
                let existingElement = refMapByConcept.get(element.value);
                // @ts-ignore
                existingElement.push(entity);
            }
            else {
                refMapByConcept.set(element.value, [entity]);
            }
        });
    }
    addOrUpdateEntity(entity, onRefConcept) {
        const updateOn = onRefConcept ? onRefConcept : this.updateOnExistingRef;
        let entityOnFactoryConstraint = this.entityArray.find(element => element.getRefValue(updateOn) == entity.getRefValue(updateOn));
        if (entityOnFactoryConstraint !== undefined && onRefConcept && onRefConcept != this.updateOnExistingRef) {
            //user want to update entity but the constraint provided violate factory constraint
            throw new Error("Factory integrity constraint violation entity exist with "
                + this.updateOnExistingRef.shortname + "while checking on integrity on" + onRefConcept.shortname);
        }
        let indexOfExistingEntity = this.entityArray.findIndex(element => element.getRefValue(updateOn) == entity.getRefValue(updateOn));
        // Update the existing entity wih new one.
        if (indexOfExistingEntity >= 0) {
            entity.referenceArray.forEach(element => {
                this.sandraManager.registerNewReference(element);
                this.refMap.set(element.concept.unid, element.concept.shortname);
                let refMapByConcept;
                if (!this.entityByRevValMap.has(element.concept)) {
                    refMapByConcept = new Map();
                    this.entityByRevValMap.set(element.concept, refMapByConcept);
                }
                else {
                    // @ts-ignore
                    refMapByConcept = this.entityByRevValMap.get(element.concept);
                }
                if (refMapByConcept.has(element.value)) {
                    let existingElement = refMapByConcept.get(element.value);
                    // @ts-ignore
                    existingElement.push(entity);
                }
                else {
                    refMapByConcept.set(element.value, [entity]);
                }
            });
            this.entityArray[indexOfExistingEntity] = entity;
            return this;
        }
        // Add new entity to array
        this.addEntity(entity);
        return this;
    }
    getEntitiesWithRefValue(refConcept, value) {
        let concept = this.sandraManager.somethingToConcept(refConcept);
        let entities = this.entityArray.filter(element => element.getRefValue(concept) === value);
        if (entities !== undefined) {
            return entities;
        }
        return null;
    }
    joinFactory(entityFactory, onVerb) {
        if (this.joinedFactory.find(e => e.onVerb === onVerb))
            return;
        let createOnRef = entityFactory.updateOnExistingRef;
        this.joinedFactory.push({ entityFactory, onVerb, createOnRef });
    }
    listenFromRemote(gossiper) {
    }
    getAllWith(referenceName, referenceValue) {
        if (!referenceName) {
            throw new Error("Reference name not provided");
        }
        let referenceConcept = this.sandraManager.somethingToConcept(referenceName);
        let array = this.entityArray.filter(entity => {
            return entity.getRefValue(referenceConcept) == referenceValue;
        });
        return array;
    }
}
exports.EntityFactory = EntityFactory;
//# sourceMappingURL=EntityFactory.js.map