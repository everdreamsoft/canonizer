var Concept = /** @class */ (function () {
    function Concept(unid, shortname) {
        this.isPureShortname = false;
        this.unid = unid;
        this.shortname = shortname;
        this.triplets = new Map();
        this.tripletsReferences = new Map();
    }
    Concept.prototype.setTriplet = function (verb, target, notEntity, refs) {
        if (notEntity === void 0) { notEntity = false; }
        var verbExist = false;
        if (this.triplets.get(verb)) {
            // @ts-ignore
            this.triplets.get(verb).push(target);
            verbExist = true;
        }
        else {
            this.triplets.set(verb, [target]);
            //this.tripletsReferences.set(verb,[target]);
        }
        if (notEntity)
            this.isPureShortname = true;
        if (refs) {
            if (verbExist) {
                // @ts-ignore
                this.tripletsReferences.get(verb).push({ concept: target, refs: refs });
            }
            else {
                this.tripletsReferences.set(verb, [{ concept: target, refs: refs }]);
            }
        }
    };
    Concept.prototype.getTriplets = function (verb, target, notEntity, refs) {
        if (notEntity === void 0) { notEntity = false; }
        var verbExist = false;
        if (this.triplets.get(verb)) {
            // @ts-ignore
            this.triplets.get(verb).push(target);
            verbExist = true;
        }
        else {
            this.triplets.set(verb, [target]);
            //this.tripletsReferences.set(verb,[target]);
        }
        if (notEntity)
            this.isPureShortname = true;
        if (refs) {
            if (verbExist) {
                // @ts-ignore
                this.tripletsReferences.get(verb).push({ concept: target, refs: refs });
            }
            else {
                this.tripletsReferences.set(verb, [{ concept: target, refs: refs }]);
            }
        }
    };
    return Concept;
}());
export { Concept };
//# sourceMappingURL=Concept.js.map