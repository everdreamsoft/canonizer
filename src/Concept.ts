import {Reference} from "./Reference.js";

interface tripletRef {
    concept: Concept,
    refs: Reference[]
}

interface Parameters {
    concept: Concept,
    value: Map<string, string>
}

export class Concept {

    public unid: number;
    public shortname: string;
    public triplets: Map<Concept, Array<Concept>>;
    public tripletsReferences: Map<Concept, Array<tripletRef>>;
    public tripletParams: Map<Concept, Array<Parameters>>;

    public isPureShortname: boolean = false;

    constructor(unid: number, shortname: string) {

        this.unid = unid;
        this.shortname = shortname;
        this.triplets = new Map<Concept, Array<Concept>>();
        this.tripletsReferences = new Map<Concept, Array<tripletRef>>();
        this.tripletParams = new Map<Concept, Array<Parameters>>();

    }

    public setTriplet(verb: Concept, target: Concept, notEntity: boolean = false, refs?: Reference[], updateOnExisting?: boolean) {

        updateOnExisting = updateOnExisting ? updateOnExisting : false;

        let verbExist = false;
        if (this.triplets.get(verb)) {
            // @ts-ignore
            this.triplets.get(verb).push(target);
            verbExist = true;
        } else {
            this.triplets.set(verb, [target]);
            //this.tripletsReferences.set(verb,[target]);
        }

        if (notEntity) this.isPureShortname = true;

        if (refs) {
            if (verbExist) {
                // @ts-ignore
                this.tripletsReferences.get(verb).push({concept: target, refs: refs})
            } else {
                this.tripletsReferences.set(verb, [{concept: target, refs: refs}])
            }
        }

        if (updateOnExisting) {
            let param = new Map([["updateOnExisting", String(updateOnExisting)]]);

            if (this.tripletParams.get(verb)) {
                // @ts-ignore
                this.tripletParams.get(verb).push({concept: target, value: param})
            } else
                this.tripletParams.set(verb, [{concept: target, value: param}])
        }
    }

    public getTriplets(verb: Concept, target: Concept, notEntity: boolean = false, refs?: Reference[]) {

        let verbExist = false;
        if (this.triplets.get(verb)) {
            // @ts-ignore
            this.triplets.get(verb).push(target);
            verbExist = true;
        } else {
            this.triplets.set(verb, [target]);
            //this.tripletsReferences.set(verb,[target]);
        }

        if (notEntity) this.isPureShortname = true;

        if (refs) {
            if (verbExist) {
                // @ts-ignore
                this.tripletsReferences.get(verb).push({concept: target, refs: refs})
            } else {
                this.tripletsReferences.set(verb, [{concept: target, refs: refs}])
            }
        }
    }

}
