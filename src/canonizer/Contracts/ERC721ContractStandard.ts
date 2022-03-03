import {SandraManager} from "../../SandraManager.js";
import {Reference} from "../../Reference.js";
import {ContractStandard} from "../ContractStandard.js";
import {CSCanonizeManager} from "../CSCanonizeManager.js";

export class ERC721ContractStandard extends ContractStandard {

  public getDisplayStructure(): string {
    return "tokenId-" + this.getTokenId();
  }

  sandra: SandraManager;

  constructor(canonizeManager: CSCanonizeManager, tokenId?: string) {
    let factory = canonizeManager.getContractStandardFactory();
    super(factory,[new Reference(canonizeManager.getSandra().get("class_name"),"CsCannon\\Blockchains\\Contracts\\ERC721")]);

    this.name = "ERC721";
    this.sandra = canonizeManager.getSandra();

    //we need to bind the the standard to the canonizer class
    if (tokenId) {
      this.setTokenId(tokenId);
    }
  }

  public setTokenId(value: string) {
    this.setSpecifierValue(this.sandra.get("tokenId"), value);
  }

  public getTokenId(): string {
    if (!this.getSpecifierArray().get(this.sandra.get("tokenId")))
      throw new Error("tokenId not specified");
    return <string>this.getSpecifierArray().get(this.sandra.get("tokenId"));
  }

}
