"use strict";
exports.__esModule = true;
exports.EntityFactory = void 0;
var EntityFactory = /** @class */ (function () {
    function EntityFactory(isa, containedIn, sandraManager, updateOnExistingRef) {
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
    EntityFactory.prototype.addEntity = function (entity) {
        var _this = this;
        this.entityArray.push(entity);
        var factory = this;
        entity.referenceArray.forEach(function (element) {
            factory.sandraManager.registerNewReference(element);
            factory.refMap.set(element.concept.unid, element.concept.shortname);
            var refMapByConcept;
            if (!_this.entityByRevValMap.has(element.concept)) {
                refMapByConcept = new Map();
                _this.entityByRevValMap.set(element.concept, refMapByConcept);
            }
            else {
                // @ts-ignore
                refMapByConcept = _this.entityByRevValMap.get(element.concept);
            }
            if (refMapByConcept.has(element.value)) {
                var existingElement = refMapByConcept.get(element.value);
                // @ts-ignore
                existingElement.push(entity);
            }
            else {
                refMapByConcept.set(element.value, [entity]);
            }
        });
    };
    EntityFactory.prototype.addOrUpdateEntity = function (entity, onRefConcept) {
        var _this = this;
        var updateOn = onRefConcept ? onRefConcept : this.updateOnExistingRef;
        var entityOnFactoryConstraint = this.entityArray.find(function (element) { return element.getRefValue(updateOn) == entity.getRefValue(updateOn); });
        if (entityOnFactoryConstraint !== undefined && onRefConcept && onRefConcept != this.updateOnExistingRef) {
            //user want to update entity but the constraint provided violate factory constraint
            throw new Error("Factory integrity constraint violation entity exist with "
                + this.updateOnExistingRef.shortname + "while checking on integrity on" + onRefConcept.shortname);
        }
        var indexOfExistingEntity = this.entityArray.findIndex(function (element) { return element.getRefValue(updateOn) == entity.getRefValue(updateOn); });
        // Update the existing entity wih new one.
        if (indexOfExistingEntity >= 0) {
            entity.referenceArray.forEach(function (element) {
                _this.sandraManager.registerNewReference(element);
                _this.refMap.set(element.concept.unid, element.concept.shortname);
                var refMapByConcept;
                if (!_this.entityByRevValMap.has(element.concept)) {
                    refMapByConcept = new Map();
                    _this.entityByRevValMap.set(element.concept, refMapByConcept);
                }
                else {
                    // @ts-ignore
                    refMapByConcept = _this.entityByRevValMap.get(element.concept);
                }
                if (refMapByConcept.has(element.value)) {
                    var existingElement = refMapByConcept.get(element.value);
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
    };
    EntityFactory.prototype.getEntitiesWithRefValue = function (refConcept, value) {
        var concept = this.sandraManager.somethingToConcept(refConcept);
        var entities = this.entityArray.filter(function (element) { return element.getRefValue(concept) === value; });
        if (entities !== undefined) {
            return entities;
        }
        return null;
    };
    EntityFactory.prototype.joinFactory = function (entityFactory, onVerb) {
        if (this.joinedFactory.find(function (e) { return e.onVerb === onVerb; }))
            return;
        var createOnRef = entityFactory.updateOnExistingRef;
        this.joinedFactory.push({ entityFactory: entityFactory, onVerb: onVerb, createOnRef: createOnRef });
    };
    EntityFactory.prototype.listenFromRemote = function (gossiper) {
    };
    return EntityFactory;
}());
exports.EntityFactory = EntityFactory;
