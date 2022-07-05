import {Concept} from "./Concept.js";
import {SandraManager} from "./SandraManager.js";
import {Entity} from "./Entity";
import {Gossiper} from "./Gossiper.js";
import {Reference} from "./Reference";
import {AssetInterface} from "./canonizer/Asset";

interface JoinedFactory {
    entityFactory: EntityFactory;
    onVerb: string
    createOnRef: Concept

}

export class EntityFactory {

    public is_a: string
    public contained_in_file: string
    public entityArray: Entity[] = [];
    public storage: string = '';
    public refMap: Map<number, string> = new Map<number, string>();
    public entityByRevValMap: Map<Concept, Map<string, Entity[]>> = new Map<Concept, Map<string, Entity[]>>();
    public joinedFactory: JoinedFactory[] = [];
    public sandraManager: SandraManager;
    public updateOnExistingRef: Concept;
    public brotherEntityMap: Map<Concept, Map<Concept, Entity[]>> = new Map<Concept, Map<Concept, Entity[]>>();

    public constructor(isa: string, containedIn: string, sandraManager: SandraManager, updateOnExistingRef?: Concept) {

        this.is_a = isa;
        this.contained_in_file = containedIn;
        this.sandraManager = sandraManager;
        if (updateOnExistingRef == null) {
            updateOnExistingRef = sandraManager.get('null_concept');
        }
        this.updateOnExistingRef = updateOnExistingRef;

    }

    public getReferences(references: any): Array<Reference> {
        throw new Error("Function not implemented");
    }

    public replaceOrAddReference(entity: Entity, data: any) {
        throw new Error("Function not implemented");
    }

    public getOrCreateEntity(references: any) {

        let existingRefKey = Object.keys(references).find(value => {
            return value == this.updateOnExistingRef.shortname
        })

        if (this.updateOnExistingRef.shortname != "null_concept" && existingRefKey) {

            let indexOfExistingEntity = this.entityArray.findIndex(element => {
                return existingRefKey ? element.getRefValue(this.updateOnExistingRef) == references[existingRefKey] : false;
            });

            if (indexOfExistingEntity >= 0) {
                this.replaceOrAddReference( this.entityArray[indexOfExistingEntity], references);
                return this.entityArray[indexOfExistingEntity];
            } else {
                return null;
            }

        } else {
            return null
        }
    }

    public addEntity(entity: Entity) {

        this.entityArray.push(entity);
        let factory = this;

        entity.referenceArray.forEach(element => {

            factory.sandraManager.registerNewReference(element);
            factory.refMap.set(element.concept.unid, element.concept.shortname);

            let refMapByConcept: Map<string, Entity[]>;

            if (!this.entityByRevValMap.has(element.concept)) {

                refMapByConcept = new Map<string, Entity[]>();
                this.entityByRevValMap.set(element.concept, refMapByConcept);
            } else {
                // @ts-ignore
                refMapByConcept = this.entityByRevValMap.get(element.concept);
            }

            if (refMapByConcept.has(element.value)) {
                let existingElement = refMapByConcept.get(element.value);
                // @ts-ignore
                existingElement.push(entity);
            } else {
                refMapByConcept.set(element.value, [entity]);
            }

        })

    }

    public updateExistingEntity(newEntity: Entity, existingEntity: Entity) {

        newEntity.referenceArray.forEach(element => {

            this.sandraManager.registerNewReference(element);
            this.refMap.set(element.concept.unid, element.concept.shortname);

            let refMapByConcept: Map<string, Entity[]>;

            if (!this.entityByRevValMap.has(element.concept)) {
                refMapByConcept = new Map<string, Entity[]>();
                this.entityByRevValMap.set(element.concept, refMapByConcept);
            } else {
                // @ts-ignore
                refMapByConcept = this.entityByRevValMap.get(element.concept);
            }

            if (refMapByConcept.has(element.value)) {
                let existingElement = refMapByConcept.get(element.value);
                // @ts-ignore
                existingElement.push(newEntity);
            } else {
                refMapByConcept.set(element.value, [newEntity]);
            }

        });

        // Replacing reference array
        existingEntity.referenceArray = newEntity.referenceArray;

        // Updating triplets
        newEntity.subjectConcept.triplets.forEach((value, key) => {
            existingEntity.subjectConcept.triplets.set(key, value);
        });


    }

    public addOrUpdateEntity(entity: Entity, onRefConcept?: Concept): this {

        const updateOn = onRefConcept ? onRefConcept : this.updateOnExistingRef;

        let entityOnFactoryConstraint = this.entityArray.find(element => element.getRefValue(updateOn) == entity.getRefValue(updateOn));

        if (entityOnFactoryConstraint !== undefined && onRefConcept && onRefConcept != this.updateOnExistingRef) {
            //user want to update entity but the constraint provided violate factory constraint
            throw new Error("Factory integrity constraint violation entity exist with "
                + this.updateOnExistingRef.shortname + "while checking on integrity on" + onRefConcept.shortname)

        }

        let indexOfExistingEntity = this.entityArray.findIndex(element => element.getRefValue(updateOn) == entity.getRefValue(updateOn))

        // Update the existing entity wih new one.
        if (indexOfExistingEntity >= 0) {
            this.updateExistingEntity(entity, this.entityArray[indexOfExistingEntity]);
            return this;
        }

        // Add new entity to array
        this.addEntity(entity);
        return this;

    }

    // TODO - Old Code, did not work for assets, kept this code in case reference is needed?
    // Bug in this code - in case you have a triplet in existing entity, it changes the rfrence by changing the
    // subject id of the existing entity with new one. T
    public addOrUpdateEntityOld(entity: Entity, onRefConcept?: Concept): this {

        const updateOn = onRefConcept ? onRefConcept : this.updateOnExistingRef;

        let entityOnFactoryConstraint = this.entityArray.find(element => element.getRefValue(updateOn) == entity.getRefValue(updateOn))
        if (entityOnFactoryConstraint !== undefined && onRefConcept && onRefConcept != this.updateOnExistingRef) {
            //user want to update entity but the constraint provided violate factory constraint
            throw new Error("Factory integrity constraint violation entity exist with "
                + this.updateOnExistingRef.shortname + "while checking on integrity on" + onRefConcept.shortname)

        }

        let indexOfExistingEntity = this.entityArray.findIndex(element => element.getRefValue(updateOn) == entity.getRefValue(updateOn))

        // Update the existing entity wih new one.
        if (indexOfExistingEntity >= 0) {
            entity.referenceArray.forEach(element => {

                this.sandraManager.registerNewReference(element);
                this.refMap.set(element.concept.unid, element.concept.shortname);

                let refMapByConcept: Map<string, Entity[]>;

                if (!this.entityByRevValMap.has(element.concept)) {

                    refMapByConcept = new Map<string, Entity[]>();
                    this.entityByRevValMap.set(element.concept, refMapByConcept);
                } else {
                    // @ts-ignore
                    refMapByConcept = this.entityByRevValMap.get(element.concept);
                }

                if (refMapByConcept.has(element.value)) {
                    let existingElement = refMapByConcept.get(element.value);
                    // @ts-ignore
                    existingElement.push(entity);
                } else {
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

    public getEntitiesWithRefValue(refConcept: any, value: string): any {

        let concept = this.sandraManager.somethingToConcept(refConcept);
        let entities = this.entityArray.filter(element => element.getRefValue(concept) === value);
        if (entities !== undefined) {
            return entities;
        }
        return null;
    }

    public joinFactory(entityFactory: EntityFactory, onVerb: string) {

        if (this.joinedFactory.find(e => e.onVerb === onVerb)) return;

        let createOnRef = entityFactory.updateOnExistingRef;
        this.joinedFactory.push({entityFactory, onVerb, createOnRef});
    }

    public listenFromRemote(gossiper: Gossiper) {
    }

    public getAllWith(referenceName: string, referenceValue: string): Entity[] {
        if (!referenceName) {
            throw new Error("Reference name not provided")
        }

        let referenceConcept = this.sandraManager.somethingToConcept(referenceName);

        let array = this.entityArray.filter(entity => {
            return entity.getRefValue(referenceConcept) == referenceValue
        })

        return array;

    }

}

