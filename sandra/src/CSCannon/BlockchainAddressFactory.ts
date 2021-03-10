import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainAddress} from "./BlockchainAddress.js";

export class BlockchainAddressFactory extends EntityFactory {

    public is_a:string = 'blockchainAddress';
    public contained_in_file:string = 'blockchainAddressFile';
    public onBlockchain:string = 'genericBlockchain';
    private sandra:SandraManager ;

    static ON_BLOCKCHAIN = 'onBlockchain'



    public constructor(sandra:SandraManager) {

        super('blockchainAddress','blockchainAddressFile',sandra);
        this.sandra = sandra ;
        this.updateOnExistingRef = sandra.get('address');
    }

    public getOrCreate(address:string):BlockchainAddress{
        if (this.entityByRevValMap.has(this.sandra.get('address'))){
            let addressRefMap = this.entityByRevValMap.get(this.sandra.get('address'));

            // @ts-ignore
            if (addressRefMap.has(address)){
                //address exists in factory
                // @ts-ignore
                return addressRefMap.get(address)[0];
            }

        }

        return new BlockchainAddress(this,address,this.sandra);



    }




}