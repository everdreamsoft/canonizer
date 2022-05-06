import {CSCanonizeManager} from "./CSCanonizeManager.js";
import {AssetCollection, AssetCollectionInterface} from "./AssetCollection.js";
import {BlockchainEventFactory} from "./BlockchainEventFactory.js";
import {BlockchainContract} from "./BlockchainContract.js";
import {BlockchainEvent} from "./BlockchainEvent.js";
import {AssetFactory} from "./AssetFactory.js";
import {Reference} from "../Reference.js";
import {BlockchainContractFactory} from "./BlockchainContractFactory.js";
import {KusamaBlockchain} from "./Kusama/KusamaBlockchain.js";
import {EntityFactory} from "../EntityFactory.js";
import {Entity} from "../Entity.js";

let nodeXMLHttp = false;

try {
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
} catch (e) {
    console.log(e)
}

export class CsCannonApiManager {
    private readonly canonize: CSCanonizeManager;
    private readonly apiUrl: string;

    public constructor(manager: CSCanonizeManager, apiUrl: string) {
        this.canonize = manager;
        this.apiUrl = apiUrl;
    }

    public async getCollections(): Promise<AssetCollection[]> {

        let response: any = await this.apiCall('collections?sortBy=creationTimestamp&orderBy=desc');
        let collections: AssetCollection[] = [];

        response.data.forEach((collection: AssetCollectionInterface) => {
            if (collection.name != undefined && collection.id != '46C7F6523465F3681D-CHUNG') { //should be curator
                // @ts-ignore
                if (collection.image != undefined) {
                    // @ts-ignore
                    collection.imageUrl = collection.image
                }
                let oneCollection = this.canonize.createCollection(collection);
                collections.push(oneCollection)
            }
        })

        return collections;

    }

    public async getAddressBalance(address: string): Promise<EntityFactory> {

        let response: any = await this.apiCall('balances/' + address);
        let balance = new EntityFactory('balanceItem', 'balanceFile', this.canonize.getSandra());
        response.data.collections.forEach((collection: any) => {
            console.log(collection);
            collection.orbs.forEach((orb: any) => {
                const balanceItem = new Entity(balance, [])
                balanceItem.addReference(new Reference(this.canonize.getSandra().get("imgUrl"), orb.asset.image));
                // balanceItem.addReference(new Reference(this.canonize.getSandra().get("assetName"), orb.asset.id));

            })
        })

        return balance;

    }

    public async getCollectionAssets(collectionId: string): Promise<AssetFactory> {

        let response: any = await this.apiCall('collections/' + collectionId);
        let assetFactory = new AssetFactory(this.canonize.getSandra());
        for (const [key, assetRaw] of Object.entries(response.data.assets)) {
            // @ts-ignore
            if (assetRaw.imgUrl != undefined) {
                // @ts-ignore
                assetRaw.imageUrl = assetRaw.imgUrl

            }
            // @ts-ignore
            let asset = new Asset(assetFactory, assetRaw, this.canonize.getSandra())
        }

        return assetFactory;

    }

    public async getCollectionEvents(collectionId: string): Promise<BlockchainEventFactory> {
        let response: any = await this.apiCall('events?collection=' + collectionId);
        let eventFactory = this.buildEventFactoryFromResponse(response);
        return eventFactory;
    }

    public async getEvents(): Promise<BlockchainEventFactory> {
        let response: any = await this.apiCall('events');
        let eventFactory = this.buildEventFactoryFromResponse(response);
        return eventFactory;
    }

    public async getAddressEvents(address: string): Promise<BlockchainEventFactory> {
        let response: any = await this.apiCall('events/' + address);
        let eventFactory = this.buildEventFactoryFromResponse(response);
        return eventFactory;
    }

    private buildEventFactoryFromResponse(response: any): BlockchainEventFactory {

        let blockchain = new KusamaBlockchain(this.canonize.getSandra());
        let eventFactory = new BlockchainEventFactory(new KusamaBlockchain(this.canonize.getSandra()), this.canonize.getSandra());
        let blockchainContractFactory = new BlockchainContractFactory(this.canonize.getSandra());

        for (const [key, eventRaw] of Object.entries(response.data)) {
            const eventData: any = eventRaw;
            // @ts-ignore
            if (eventRaw.txId != undefined) {
                // @ts-ignore
                eventData[Blockchain.TXID_CONCEPT_NAME] = eventData.txId

            }
            const contractId = eventData.contract.address;
            let standard = this.canonize.getStandardFromName(eventData.contract.standard);

            for (const [propKey, propVal] of Object.entries(eventData.contract.token)) {

                if (<string>propVal) {
                    console.log("setting" + propKey + " prop val" + <string>propVal);
                    standard?.setSpecifierValue(this.canonize.getSandra().get(propKey), <string>propVal);
                }
            }

            let canonize = this.canonize;
            const contract = new BlockchainContract(blockchainContractFactory, contractId, canonize.getSandra(), standard)

            const event = new BlockchainEvent(eventFactory,
                eventData.source,
                eventData.destination,
                contract,
                eventData.txId,
                eventData.timestamp,
                eventData.quantity,
                blockchain,
                eventData.blockHeight,
                standard,
                this.canonize.getSandra())

            if (standard?.getDisplayStructure()) {
                event.addReference(new Reference(canonize.getSandra().get('tokenPath'), standard?.getDisplayStructure()));
            }

            if (eventData.orbs) {
                eventData.orbs.forEach((orb: { asset: any; collection: any }) => {
                    let assetRaw = orb.asset;
                    let collectionRaw = orb.collection;
                    console.log(orb.collection);

                    event.createOrUpdateRef(canonize.getSandra().get(AssetFactory.imageUrl), assetRaw.imgURL)
                    event.createOrUpdateRef(canonize.getSandra().get('collectionName'), collectionRaw.name)
                    event.createOrUpdateRef(canonize.getSandra().get('collectionId'), collectionRaw.id)

                })
            }
        }

        return eventFactory;

    }

    private addApiOrbs() {

    }

    public async apiCall(path: string) {

        let url: string = this.apiUrl;
        let base: string = 'api/v1/'

        return new Promise((resolve: any, reject: any) => {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url + base + path);
            xmlhttp.send();
            console.log(url + base + path);
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    resolve(response);
                } else if (this.readyState == 4)
                    reject('Bad request :' + this.status);
            }
        });

    }

}
