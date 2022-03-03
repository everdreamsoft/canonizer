import {Entity} from "../Entity.js";
import {AssetCollectionFactory} from "./AssetCollectionFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainAddress} from "./BlockchainAddress.js";
import {Reference} from "../Reference";


export interface AssetCollectionInterface {

    id: string,
    name?: string,
    imageUrl?: string,
    description?: string,

}

export class AssetCollection extends Entity {


    public constructor(factory: AssetCollectionFactory, collectionInterface: AssetCollectionInterface, sandra: SandraManager) {

        super(factory, [new Reference(sandra.get(AssetCollectionFactory.COLLECTION_ID), collectionInterface.id )]);

        collectionInterface.name ? this.addReference(new Reference(sandra.get(AssetCollectionFactory.MAIN_NAME), collectionInterface.name )) : null;
        collectionInterface.imageUrl ? this.addReference(new Reference(sandra.get(AssetCollectionFactory.MAIN_IMAGE), collectionInterface.imageUrl )): null;
        collectionInterface.description ? this.addReference(new Reference(sandra.get(AssetCollectionFactory.DESCRIPTION), collectionInterface.description )): null;

    }


    public getImageUrl(): string {
        return this.getRefValue(AssetCollectionFactory.MAIN_IMAGE) ? this.getRefValue(AssetCollectionFactory.MAIN_IMAGE) : '';

    }

    public getName(): string {
        return this.getRefValue(AssetCollectionFactory.MAIN_NAME) ? this.getRefValue(AssetCollectionFactory.MAIN_NAME) : '';

    }

    public getDescription(): string {
        return this.getRefValue(AssetCollectionFactory.DESCRIPTION) ? this.getRefValue(AssetCollectionFactory.DESCRIPTION) : '';

    }

    public getId(): string {
        return this.getRefValue(AssetCollectionFactory.COLLECTION_ID) ? this.getRefValue(AssetCollectionFactory.COLLECTION_ID) : '';

    }

    public setOwner(owner: BlockchainAddress) {

        this.joinEntity(AssetCollectionFactory.COLLECTION_OWNER, owner, this.factory.sandraManager);

    }

}
