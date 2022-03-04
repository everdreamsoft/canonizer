import {CSCanonizeManager} from "../../CSCanonizeManager";
import {JetskiProcessEntityFactory} from "./JetskiProcessEntityFactory";
import {JetskiProcessEntity} from "./JetskiProcessEntity";
import {ApiConnector, Gossiper} from "../../../Gossiper";

export class JetskiApp {

    private manager: CSCanonizeManager;
    readonly jetskiProcessFactory: JetskiProcessEntityFactory;

    public constructor(manager: CSCanonizeManager) {
        this.manager = manager;
        this.jetskiProcessFactory = new JetskiProcessEntityFactory(manager.getSandra());
    }

    public getProcessFactory()
    {
        return this.jetskiProcessFactory;
    }

}
