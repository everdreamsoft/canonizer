import {SandraManager} from "../../SandraManager.js";
import {Reference} from "../../Reference.js";
import {ContractStandard} from "../ContractStandard.js";
import {CSCanonizeManager} from "../CSCanonizeManager.js";
import {ContractStandardFactory} from "../ContractStandardFactory";

export class UniqueContractStandard extends ContractStandard {

    public getDisplayStructure(): string {
        return "tokenId-" + this.getTokenId();
    }

    sandra: SandraManager

    constructor(canonizeManager: CSCanonizeManager, tokenTokenId?: string) {

        let factory = canonizeManager.getContractStandardFactory();
        super(factory, [new Reference(canonizeManager.getSandra().get(ContractStandardFactory.CLASS_NAME), "CsCannon\\\Blockchains\\\Substrate\\\Unique\\\UniqueContractStandard")]);
        this.sandra = canonizeManager.getSandra();
        if (tokenTokenId) {
            this.setTokenId(tokenTokenId);
        }
    }

    public setTokenId(value: string) {
        this.setSpecifierValue(this.sandra.get('tokenId'), value);
    }

    public getTokenId(): string {
        if (!this.getSpecifierArray().get(this.sandra.get('tokenId'))) throw new Error("tokenId not specified for unique contract");
        return <string>this.getSpecifierArray().get(this.sandra.get('tokenId'));
    }

}
