var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Concept } from "./Concept.js";
var SandraManager = /** @class */ (function () {
    function SandraManager() {
        this.invisible = null;
        this.conceptList = [];
        this.entityList = [];
        this.refList = [];
        this.conceptMap = new Map();
        this.entityMap = new Map();
        this.registerNewConcept('null_concept');
    }
    SandraManager.prototype.registerNewConcept = function (shortname) {
        var conceptId = this.conceptList.length;
        var concept = new Concept(conceptId, shortname);
        this.conceptMap.set(concept.shortname, concept);
        this.conceptList.push(concept);
        return concept;
    };
    SandraManager.prototype.registerNewEntity = function (entity) {
        entity.id = this.entityList.length;
        this.entityMap.set(entity.id, entity);
        this.entityList.push(entity);
        return entity;
    };
    SandraManager.prototype.registerNewReference = function (ref) {
        ref.refId = this.refList.length;
        this.refList.push(ref);
        return ref;
    };
    SandraManager.prototype.get = function (shortname) {
        if (this.conceptMap.get(shortname))
            return this.conceptMap.get(shortname);
        return this.registerNewConcept(shortname);
    };
    // public somethingToConcept(something:any):Concept{
    SandraManager.prototype.somethingToConcept = function (something) {
        if (something instanceof Concept)
            return something;
        if (typeof something === 'string') {
            return this.get(something);
        }
        if (typeof something === "number") {
            var concept = __spreadArrays(this.conceptMap.values()).filter(function (item) { return item.unid === something; });
            return concept[0];
        }
        return this.get('null_concept');
    };
    SandraManager.ISA_SHORTNAME = 'is_a';
    return SandraManager;
}());
export { SandraManager };
//# sourceMappingURL=SandraManager.js.map