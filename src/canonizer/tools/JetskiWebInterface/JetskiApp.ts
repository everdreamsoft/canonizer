import {CSCanonizeManager} from "../../CSCanonizeManager";
import {JetskiProcessEntityFactory} from "./JetskiProcessEntityFactory";
import {JetskiProcessEntity} from "./JetskiProcessEntity";
import {ApiConnector, Gossiper} from "../../../Gossiper";

export class JetskiApp {

    public name: string = 'EVM Jetski';

    private manager: CSCanonizeManager;
    readonly jetskiProcessFactory: JetskiProcessEntityFactory;

    public constructor(manager: CSCanonizeManager, name: string) {
        this.manager = manager;
        this.jetskiProcessFactory = new JetskiProcessEntityFactory(manager.getSandra());
        this.name = name;
    }

    public getProcessFactory()
    {
        return this.jetskiProcessFactory;
    }

}
