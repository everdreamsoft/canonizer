import {EntityFactory} from "../EntityFactory.js";
import {CSCanonizeManager} from "./CSCanonizeManager.js";

export class BlockchainTokenFactory extends EntityFactory {

    is_a: string = 'tokenPath';
    contained_in_file: string = 'tokenPathFile';

    public static ID: string = 'code';

    constructor(canonizeManager: CSCanonizeManager) {
        super('tokenPath', 'tokenPathFile', canonizeManager.getSandra(), canonizeManager.getSandra().get(BlockchainTokenFactory.ID));
    }

}
