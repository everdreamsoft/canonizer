import {Reference} from "./Reference.js";
import {EntityFactory} from "./EntityFactory.js";
import {Concept} from "./Concept.js";
import {SandraManager} from "./SandraManager";

//does this move to the other branche ?


export class Entity {

    public subjectConcept: Concept;
    public id: number;
    // TODO make private and make getters
    public referenceArray: Reference[] = [];
    public factory: EntityFactory;
    public brotherEntityMap: Map<Concept, Map<Concept, Entity[]>> = new Map<Concept, Map<Concept, Entity[]>>();

    public constructor(factory: EntityFactory, references: Array<Reference>) {

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
        })

        if (factory.updateOnExistingRef.shortname != "null_concept") {
            factory.addOrUpdateEntity(this, factory.updateOnExistingRef);
        } else
            factory.addEntity(this);

    }

    public addReference(ref: Reference) {

        this.referenceArray.push(ref);
        return this;

    }

    public getRefValue(concept: any): string {

        const foundConcept = this.factory.sandraManager.somethingToConcept(concept);
        const ref = this.referenceArray.find(ref => ref.concept == foundConcept);
        return ref ? ref.value : '';

    }

    public createOrUpdateRef(concept: any, value: string): Reference {

        const foundConcept = this.factory.sandraManager.somethingToConcept(concept);

        let ref = this.referenceArray.find(ref => ref.concept == foundConcept);

        if (ref === undefined) {
            // @ts-ignore
            ref = new Reference(foundConcept, value);
            this.addReference(ref);
        }
        // @ts-ignore
        ref.value = value;

        return <Reference>ref;
    }


    public joinEntity(verb: string, entity: Entity, sandraManager: SandraManager, refArray?: Reference[]) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), entity.subjectConcept, false, refArray);
        this.factory.joinFactory(entity.factory, verb)
    }

    public setTriplet(verb: string, target: string, sandraManager: SandraManager, refArray?: Reference[]) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), sandraManager.get(target), false, refArray);
    }

    public setPureShortnameTriplet(verb: string, target: string, sandraManager: SandraManager, refArray?: Reference[]) {
        this.subjectConcept.setTriplet(sandraManager.get(verb), sandraManager.get(target), true, refArray);
    }

    public getJoinedEntitiesOnVerb(verb: any): Entity[] {
        const sandra = this.factory.sandraManager;
        const concept = sandra.somethingToConcept(verb);

        const results = this.subjectConcept.triplets.get(concept);
        let entityResult: Entity[] = [];
        if (results) {
            results.forEach(concept => {
                //find corresponding entity
                const entities = [...sandra.entityList.values()].filter((item: Entity) => item.subjectConcept === concept);
                entities.forEach(foundEntity => {
                    entityResult.push(foundEntity)
                })

            })
        }
        return entityResult;

    }


}
