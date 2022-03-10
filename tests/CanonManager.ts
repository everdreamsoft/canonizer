import {CSCanonizeManager} from "../src/canonizer/CSCanonizeManager";

export class CanonManager {

    private static instance: CanonManager;
    private static readonly SETTINGS = {
        server: // fondue
            {
                jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJmb25kdWUiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYxMTY0NzQ0OTIwMDAwfQ.TX0Xcy7OeHv6oE3iTxKe-TNbMaIefjViCUGvqpFAG3Q',
                gossipUrl: "http://debug.everdreamsoft.com/fondue/alex/gossip"
            },
        local:
            {
                // bsc
                jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJic2MiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYwODE2MjQyMDk2MDAwfQ.X0MLqtaUtCrgfN_sWO0IhybOtftWE4Lltex2Hh0k0u4',
                gossipUrl: "http://localhost:8000/alex/gossip"
            }
    }
    private readonly canonizeManager: CSCanonizeManager;

    private constructor() {
        this.canonizeManager = new CSCanonizeManager({
            connector: {
                gossipUrl: CanonManager.SETTINGS.local.gossipUrl,
                jwt: CanonManager.SETTINGS.local.jwt,
            },
        });
    }

    public static getInstance(): CanonManager {
        if (!CanonManager.instance) {
            CanonManager.instance = new CanonManager();
        }
        return CanonManager.instance;
    }

    public getCSCanonizeManager() {
        return this.canonizeManager;
    }

}
