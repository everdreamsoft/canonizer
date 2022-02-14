import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainContract} from "./BlockchainContract.js";
import {Blockchain} from "./Blockchain";

export class BlockchainContractFactory extends EntityFactory{


    public contained_in_file:string = 'blockchainContractFile';
    private sandra:SandraManager ;
    public  static JOIN_COLLECTION = 'inCollection';
    public  static  EXPLICIT_TOKEN_LISTING_SHORTNAME = 'explicitListing';
    public  static CONTRACT_STANDARD = 'contractStandard';
    public  static ON_BLOCKCHAIN_VERB = 'onBlockchain';

    //public blockchain?:Blockchain;

    public constructor(sandra:SandraManager) {

        super('blockchainContract','blockchainContractFile',sandra);
        this.sandra = sandra ;
        this.updateOnExistingRef = sandra.get('id');
    }

    public getOrCreate(id:string):BlockchainContract{
        if (this.entityByRevValMap.has(this.sandra.get('id'))){
            let addressRefMap = this.entityByRevValMap.get(this.sandra.get('id'));

            if (addressRefMap && addressRefMap.has(id)){
                //address exists in factory
                // @ts-ignore
                return addressRefMap.get(id);
            }

        }

        return new BlockchainContract(this,id,this.sandra);

    }





}
