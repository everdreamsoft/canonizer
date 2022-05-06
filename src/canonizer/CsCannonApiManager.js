"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsCannonApiManager = void 0;
const BlockchainEventFactory_js_1 = require("./BlockchainEventFactory.js");
const BlockchainContract_js_1 = require("./BlockchainContract.js");
const BlockchainEvent_js_1 = require("./BlockchainEvent.js");
const AssetFactory_js_1 = require("./AssetFactory.js");
const Reference_js_1 = require("../Reference.js");
const BlockchainContractFactory_js_1 = require("./BlockchainContractFactory.js");
const KusamaBlockchain_js_1 = require("./Kusama/KusamaBlockchain.js");
const EntityFactory_js_1 = require("../EntityFactory.js");
const Entity_js_1 = require("../Entity.js");
let nodeXMLHttp = false;
try {
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}
catch (e) {
    console.log(e);
}
class CsCannonApiManager {
    constructor(manager, apiUrl) {
        this.canonize = manager;
        this.apiUrl = apiUrl;
    }
    async getCollections() {
        let response = await this.apiCall('collections?sortBy=creationTimestamp&orderBy=desc');
        let collections = [];
        response.data.forEach((collection) => {
            if (collection.name != undefined && collection.id != '46C7F6523465F3681D-CHUNG') { //should be curator
                // @ts-ignore
                if (collection.image != undefined) {
                    // @ts-ignore
                    collection.imageUrl = collection.image;
                }
                let oneCollection = this.canonize.createCollection(collection);
                collections.push(oneCollection);
            }
        });
        return collections;
    }
    async getAddressBalance(address) {
        let response = await this.apiCall('balances/' + address);
        let balance = new EntityFactory_js_1.EntityFactory('balanceItem', 'balanceFile', this.canonize.getSandra());
        response.data.collections.forEach((collection) => {
            console.log(collection);
            collection.orbs.forEach((orb) => {
                const balanceItem = new Entity_js_1.Entity(balance, []);
                balanceItem.addReference(new Reference_js_1.Reference(this.canonize.getSandra().get("imgUrl"), orb.asset.image));
                // balanceItem.addReference(new Reference(this.canonize.getSandra().get("assetName"), orb.asset.id));
            });
        });
        return balance;
    }
    async getCollectionAssets(collectionId) {
        let response = await this.apiCall('collections/' + collectionId);
        let assetFactory = new AssetFactory_js_1.AssetFactory(this.canonize.getSandra());
        for (const [key, assetRaw] of Object.entries(response.data.assets)) {
            // @ts-ignore
            if (assetRaw.imgUrl != undefined) {
                // @ts-ignore
                assetRaw.imageUrl = assetRaw.imgUrl;
            }
            // @ts-ignore
            let asset = new Asset(assetFactory, assetRaw, this.canonize.getSandra());
        }
        return assetFactory;
    }
    async getCollectionEvents(collectionId) {
        let response = await this.apiCall('events?collection=' + collectionId);
        let eventFactory = this.buildEventFactoryFromResponse(response);
        return eventFactory;
    }
    async getEvents() {
        let response = await this.apiCall('events');
        let eventFactory = this.buildEventFactoryFromResponse(response);
        return eventFactory;
    }
    async getAddressEvents(address) {
        let response = await this.apiCall('events/' + address);
        let eventFactory = this.buildEventFactoryFromResponse(response);
        return eventFactory;
    }
    buildEventFactoryFromResponse(response) {
        let blockchain = new KusamaBlockchain_js_1.KusamaBlockchain(this.canonize.getSandra());
        let eventFactory = new BlockchainEventFactory_js_1.BlockchainEventFactory(new KusamaBlockchain_js_1.KusamaBlockchain(this.canonize.getSandra()), this.canonize.getSandra());
        let blockchainContractFactory = new BlockchainContractFactory_js_1.BlockchainContractFactory(this.canonize.getSandra());
        for (const [key, eventRaw] of Object.entries(response.data)) {
            const eventData = eventRaw;
            // @ts-ignore
            if (eventRaw.txId != undefined) {
                // @ts-ignore
                eventData[Blockchain.TXID_CONCEPT_NAME] = eventData.txId;
            }
            const contractId = eventData.contract.address;
            let standard = this.canonize.getStandardFromName(eventData.contract.standard);
            for (const [propKey, propVal] of Object.entries(eventData.contract.token)) {
                if (propVal) {
                    console.log("setting" + propKey + " prop val" + propVal);
                    standard === null || standard === void 0 ? void 0 : standard.setSpecifierValue(this.canonize.getSandra().get(propKey), propVal);
                }
            }
            let canonize = this.canonize;
            const contract = new BlockchainContract_js_1.BlockchainContract(blockchainContractFactory, contractId, canonize.getSandra(), standard);
            const event = new BlockchainEvent_js_1.BlockchainEvent(eventFactory, eventData.source, eventData.destination, contract, eventData.txId, eventData.timestamp, eventData.quantity, blockchain, eventData.blockHeight, standard, this.canonize.getSandra());
            if (standard === null || standard === void 0 ? void 0 : standard.getDisplayStructure()) {
                event.addReference(new Reference_js_1.Reference(canonize.getSandra().get('tokenPath'), standard === null || standard === void 0 ? void 0 : standard.getDisplayStructure()));
            }
            if (eventData.orbs) {
                eventData.orbs.forEach((orb) => {
                    let assetRaw = orb.asset;
                    let collectionRaw = orb.collection;
                    console.log(orb.collection);
                    event.createOrUpdateRef(canonize.getSandra().get(AssetFactory_js_1.AssetFactory.imageUrl), assetRaw.imgURL);
                    event.createOrUpdateRef(canonize.getSandra().get('collectionName'), collectionRaw.name);
                    event.createOrUpdateRef(canonize.getSandra().get('collectionId'), collectionRaw.id);
                });
            }
        }
        return eventFactory;
    }
    addApiOrbs() {
    }
    async apiCall(path) {
        let url = this.apiUrl;
        let base = 'api/v1/';
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url + base + path);
            xmlhttp.send();
            console.log(url + base + path);
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    resolve(response);
                }
                else if (this.readyState == 4)
                    reject('Bad request :' + this.status);
            };
        });
    }
}
exports.CsCannonApiManager = CsCannonApiManager;
//# sourceMappingURL=CsCannonApiManager.js.map