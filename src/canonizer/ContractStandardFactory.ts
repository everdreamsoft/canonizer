import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";

export class ContractStandardFactory extends EntityFactory {

    public is_a: string = 'blockchainStandard';
    public contained_in_file: string = 'blockchainStandardFile';

    static CLASS_NAME = "class_name";

    constructor(sandra: SandraManager) {
        super('blockchainContract', 'blockchainStandardFile', sandra, sandra.get(ContractStandardFactory.CLASS_NAME));
    }

}
