import {AssetCollection, AssetCollectionInterface} from "../../AssetCollection";
import {AssetCollectionFactory} from "../../AssetCollectionFactory";
import {SandraManager} from "../../../SandraManager";
import {Reference} from "../../../Reference";
import {CSCanonizeManager} from "../../CSCanonizeManager";

export class RmrkAssetCollection extends AssetCollection {

    public MAX_SUPPLY: string = 'maxSupply';
    public CREATION_BLOCK: string = 'creationBlock';

    public constructor(factory: AssetCollectionFactory, collectionInterface: AssetCollectionInterface, sandra: SandraManager, maxSupply: Number, creationBlock: Number) {
        super(factory, collectionInterface, sandra);
        this.addReference(new Reference(sandra.get(this.MAX_SUPPLY), maxSupply.toString()));
        this.addReference(new Reference(sandra.get(this.CREATION_BLOCK), creationBlock.toString()));
    }

    public static createRmrkCollection(canonizeManager: CSCanonizeManager, collectionInterface: AssetCollectionInterface, maxSupply: Number, creationBlock: Number) {
        return new RmrkAssetCollection(canonizeManager.getAssetCollectionFactory(), collectionInterface, canonizeManager.getSandra(), maxSupply, creationBlock);
    }

}
