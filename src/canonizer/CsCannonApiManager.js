var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BlockchainEventFactory } from "./BlockchainEventFactory.js";
import { BlockchainContract } from "./BlockchainContract.js";
import { BlockchainEvent } from "./BlockchainEvent.js";
import { AssetFactory } from "./AssetFactory.js";
import { Reference } from "../Reference.js";
import { BlockchainContractFactory } from "./BlockchainContractFactory.js";
import { KusamaBlockchain } from "./Kusama/KusamaBlockchain.js";
import { EntityFactory } from "../EntityFactory.js";
import { Entity } from "../Entity.js";
var nodeXMLHttp = false;
try {
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}
catch (e) {
    console.log(e);
}
var CsCannonApiManager = /** @class */ (function () {
    function CsCannonApiManager(manager, apiUrl) {
        this.canonize = manager;
        this.apiUrl = apiUrl;
    }
    CsCannonApiManager.prototype.getCollections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, collections;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiCall('collections?sortBy=creationTimestamp&orderBy=desc')];
                    case 1:
                        response = _a.sent();
                        collections = [];
                        response.data.forEach(function (collection) {
                            console.log(collection.id);
                            if (collection.name != undefined && collection.id != '46C7F6523465F3681D-CHUNG') { //should be curator
                                // @ts-ignore
                                if (collection.image != undefined) {
                                    // @ts-ignore
                                    collection.imageUrl = collection.image;
                                }
                                var oneCollection = _this.canonize.createCollection(collection);
                                collections.push(oneCollection);
                            }
                        });
                        return [2 /*return*/, collections];
                }
            });
        });
    };
    CsCannonApiManager.prototype.getAddressBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response, balance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiCall('balances/' + address)];
                    case 1:
                        response = _a.sent();
                        balance = new EntityFactory('balanceItem', 'balanceFile', this.canonize.getSandra());
                        response.data.collections.forEach(function (collection) {
                            console.log(collection);
                            collection.orbs.forEach(function (orb) {
                                var balanceItem = new Entity(balance, []);
                                balanceItem.addReference(new Reference(_this.canonize.getSandra().get("imgUrl"), orb.asset.image));
                                // balanceItem.addReference(new Reference(this.canonize.getSandra().get("assetName"), orb.asset.id));
                            });
                        });
                        console.log(response);
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    CsCannonApiManager.prototype.getCollectionAssets = function (collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, assetFactory, _i, _a, _b, key, assetRaw, asset;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.apiCall('collections/' + collectionId)];
                    case 1:
                        response = _c.sent();
                        assetFactory = new AssetFactory(this.canonize.getSandra());
                        for (_i = 0, _a = Object.entries(response.data.assets); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], assetRaw = _b[1];
                            // @ts-ignore
                            if (assetRaw.imgUrl != undefined) {
                                // @ts-ignore
                                assetRaw.imageUrl = assetRaw.imgUrl;
                            }
                            asset = new Asset(assetFactory, assetRaw, this.canonize.getSandra());
                        }
                        return [2 /*return*/, assetFactory];
                }
            });
        });
    };
    CsCannonApiManager.prototype.getCollectionEvents = function (collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, eventFactory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiCall('events?collection=' + collectionId)];
                    case 1:
                        response = _a.sent();
                        eventFactory = this.buildEventFactoryFromResponse(response);
                        return [2 /*return*/, eventFactory];
                }
            });
        });
    };
    CsCannonApiManager.prototype.getEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, eventFactory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiCall('events')];
                    case 1:
                        response = _a.sent();
                        eventFactory = this.buildEventFactoryFromResponse(response);
                        return [2 /*return*/, eventFactory];
                }
            });
        });
    };
    CsCannonApiManager.prototype.getAddressEvents = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response, eventFactory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiCall('events/' + address)];
                    case 1:
                        response = _a.sent();
                        eventFactory = this.buildEventFactoryFromResponse(response);
                        return [2 /*return*/, eventFactory];
                }
            });
        });
    };
    CsCannonApiManager.prototype.buildEventFactoryFromResponse = function (response) {
        var blockchain = new KusamaBlockchain(this.canonize.getSandra());
        var eventFactory = new BlockchainEventFactory(new KusamaBlockchain(this.canonize.getSandra()), this.canonize.getSandra());
        var blockchainContractFactory = new BlockchainContractFactory(this.canonize.getSandra());
        var _loop_1 = function (key, eventRaw) {
            var eventData = eventRaw;
            // @ts-ignore
            if (eventRaw.txId != undefined) {
                // @ts-ignore
                eventData[Blockchain.TXID_CONCEPT_NAME] = eventData.txId;
            }
            var contractId = eventData.contract.address;
            var standard = this_1.canonize.getStandardFromName(eventData.contract.standard);
            for (var _i = 0, _a = Object.entries(eventData.contract.token); _i < _a.length; _i++) {
                var _b = _a[_i], propKey = _b[0], propVal = _b[1];
                if (propVal) {
                    console.log("setting" + propKey + " prop val" + propVal);
                    standard === null || standard === void 0 ? void 0 : standard.setSpecifierValue(this_1.canonize.getSandra().get(propKey), propVal);
                }
            }
            ;
            var canonize = this_1.canonize;
            var contract = new BlockchainContract(blockchainContractFactory, contractId, canonize.getSandra(), standard);
            var event_1 = new BlockchainEvent(eventFactory, eventData.source, eventData.destination, contract, eventData.txId, eventData.timestamp, eventData.quantity, blockchain, eventData.blockHeight, standard, this_1.canonize.getSandra());
            if (standard === null || standard === void 0 ? void 0 : standard.getDisplayStructure()) {
                event_1.addReference(new Reference(canonize.getSandra().get('tokenPath'), standard === null || standard === void 0 ? void 0 : standard.getDisplayStructure()));
            }
            if (eventData.orbs) {
                eventData.orbs.forEach(function (orb) {
                    var assetRaw = orb.asset;
                    var collectionRaw = orb.collection;
                    console.log(orb.collection);
                    event_1.createOrUpdateRef(canonize.getSandra().get(AssetFactory.imageUrl), assetRaw.imgURL);
                    event_1.createOrUpdateRef(canonize.getSandra().get('collectionName'), collectionRaw.name);
                    event_1.createOrUpdateRef(canonize.getSandra().get('collectionId'), collectionRaw.id);
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(response.data); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], eventRaw = _b[1];
            _loop_1(key, eventRaw);
        }
        return eventFactory;
    };
    CsCannonApiManager.prototype.addApiOrbs = function () {
    };
    CsCannonApiManager.prototype.apiCall = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, base;
            return __generator(this, function (_a) {
                url = this.apiUrl;
                base = 'api/v1/';
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("GET", url + base + path);
                        xmlhttp.send();
                        console.log(url + base + path);
                        xmlhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var response = JSON.parse(this.responseText);
                                resolve(response);
                            }
                            else if (this.readyState == 4)
                                reject('Bad request :' + this.status);
                        };
                    })];
            });
        });
    };
    return CsCannonApiManager;
}());
export { CsCannonApiManager };
//# sourceMappingURL=CsCannonApiManager.js.map