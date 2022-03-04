"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Entity = void 0;
var Reference_js_1 = require("./Reference.js");
//does this move to the other branche ?
var Entity = /** @class */ (function () {
    function Entity(factory, references) {
        var _this = this;
        // TODO make private and make getters
        this.referenceArray = [];
        this.brotherEntityMap = new Map();
        this.id = 0;
        this.factory = factory;
        factory.sandraManager.registerNewEntity(this);
        this.subjectConcept = factory.sandraManager.get('entity:subject:' + this.id);
        // In case updateOnExistingRef is set then entity must have reference.
        if (factory.updateOnExistingRef && ((references && references.length == 0) || !references)) {
            throw new Error("Entity factory expects reference for updateOnExistingRef option -" + (factory.updateOnExistingRef.shortname) + ", no references provided");
        }
        references.forEach(function (ref) {
            _this.addReference(ref);
        });
        if (factory.updateOnExistingRef) {
            factory.addOrUpdateEntity(this, factory.updateOnExistingRef);
        }
        else
            factory.addEntity(this);
    }
    Entity.prototype.addReference = function (ref) {
        this.referenceArray.push(ref);
        return this;
    };
    Entity.prototype.getRefValue = function (concept) {
        var foundConcept = this.factory.sandraManager.somethingToConcept(concept);
        var ref = this.referenceArray.find(function (ref) { return ref.concept == foundConcept; });
        return ref ? ref.value : '';
    };
    Entity.prototype.createOrUpdateRef = function (concept, value) {
        var foundConcept = this.factory.sandraManager.somethingToConcept(concept);
        var ref = this.referenceArray.find(function (ref) { return ref.concept == foundConcept; });
        if (ref === undefined) {
            // @ts-ignore
            ref = new Reference_js_1.Reference(foundConcept, value);
            this.addReference(ref);
        }
        // @ts-ignore
        ref.value = value;
        return ref;
    };
    Entity.prototype.joinEntity = function (verb, entity, sandraManager, refArray) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), entity.subjectConcept, false, refArray);
        this.factory.joinFactory(entity.factory, verb);
    };
    Entity.prototype.setTriplet = function (verb, target, sandraManager, refArray) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), sandraManager.get(target), false, refArray);
    };
    Entity.prototype.setPureShortnameTriplet = function (verb, target, sandraManager, refArray) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), sandraManager.get(target), true, refArray);
    };
    Entity.prototype.getJoinedEntitiesOnVerb = function (verb) {
        var sandra = this.factory.sandraManager;
        var concept = sandra.somethingToConcept(verb);
        var results = this.subjectConcept.triplets.get(concept);
        var entityResult = [];
        if (results) {
            results.forEach(function (concept) {
                //find corresponding entity
                var entities = __spreadArrays(sandra.entityList.values()).filter(function (item) { return item.subjectConcept === concept; });
                entities.forEach(function (foundEntity) {
                    entityResult.push(foundEntity);
                });
            });
        }
        return entityResult;
    };
    return Entity;
}());
exports.Entity = Entity;
