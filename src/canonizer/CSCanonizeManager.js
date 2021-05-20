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
import { SandraManager } from "../SandraManager.js";
import { AssetCollectionFactory } from "./AssetCollectionFactory.js";
import { AssetCollection } from "./AssetCollection.js";
import { AssetFactory } from "./AssetFactory.js";
import { Asset } from "./Asset.js";
import { BlockchainTokenFactory } from "./BlockchainTokenFactory.js";
import { ContractStandardFactory } from "./ContractStandardFactory.js";
import { EntityFactory } from "../EntityFactory.js";
import { Gossiper } from "../Gossiper.js";
import { Blockchain } from "./Blockchain.js";
import { Entity } from "../Entity.js";
import { Reference } from "../Reference.js";
import { AssetSolverFactory } from "./AssetSolvers/AssetSolverFactory.js";
import { LocalSolver } from "./AssetSolvers/LocalSolver.js";
import { KusamaBlockchain } from "./Substrate/Kusama/KusamaBlockchain";
import { RmrkContractStandard } from "./Interfaces/RmrkContractStandard.js";
var CSCanonizeManager = /** @class */ (function () {
    function CSCanonizeManager(options, sandra) {
        if (sandra === void 0) { sandra = new SandraManager(); }
        this.loadedBlockchains = [];
        this.sandra = sandra;
        this.assetCollectionFactory = new AssetCollectionFactory(sandra);
        this.assetFactory = new AssetFactory(sandra);
        this.tokenFactory = new BlockchainTokenFactory(this);
        this.contractStandardFactory = new ContractStandardFactory(sandra);
        this.assetSolverFactory = new AssetSolverFactory(this);
        this.localSolver = new LocalSolver(this);
        this.activeBlockchainFactory = new EntityFactory('activeBlockchain', 'activeBlockchainFile', this.sandra, this.sandra.get('blockchain'));
        this.apiConnector = (options === null || options === void 0 ? void 0 : options.connector) ? options.connector : undefined;
    }
    CSCanonizeManager.prototype.createCollection = function (collectionInterface, solver) {
        var assetSolver = solver ? solver : this.localSolver;
        var collection = new AssetCollection(this.assetCollectionFactory, collectionInterface, this.sandra);
        collection.joinEntity(AssetSolverFactory.COLLECTION_JOIN_VERB, assetSolver, this.sandra);
        return new AssetCollection(this.assetCollectionFactory, collectionInterface, this.sandra);
    };
    CSCanonizeManager.prototype.createAsset = function (assetInterface) {
        return new Asset(this.assetFactory, assetInterface, this.sandra);
    };
    CSCanonizeManager.prototype.getLocalSolver = function () {
        return this.localSolver;
    };
    CSCanonizeManager.prototype.getAssetFactory = function () {
        return this.assetFactory;
    };
    CSCanonizeManager.prototype.getContractStandardFactory = function () {
        return this.contractStandardFactory;
    };
    CSCanonizeManager.prototype.getTokenFactory = function () {
        return this.tokenFactory;
    };
    CSCanonizeManager.prototype.getAssetCollectionFactory = function () {
        return this.assetCollectionFactory;
    };
    CSCanonizeManager.prototype.getSandra = function () {
        return this.sandra;
    };
    CSCanonizeManager.prototype.gossipActiveBlockchain = function (apiConnector, flush) {
        return __awaiter(this, void 0, void 0, function () {
            var gossiper, flushCall, _a, gossiper, flushCall, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(apiConnector !== undefined)) return [3 /*break*/, 6];
                        gossiper = new Gossiper(this.activeBlockchainFactory, this.sandra.get('blockchain'));
                        return [4 /*yield*/, flush];
                    case 1:
                        if (!(_c.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, gossiper.flushDatagraph(apiConnector)];
                    case 2:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = null;
                        _c.label = 4;
                    case 4:
                        flushCall = _a;
                        return [4 /*yield*/, gossiper.gossipToUrl(apiConnector)];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6:
                        if (!(this.apiConnector !== undefined)) return [3 /*break*/, 12];
                        gossiper = new Gossiper(this.activeBlockchainFactory, this.sandra.get('blockchain'));
                        return [4 /*yield*/, flush];
                    case 7:
                        if (!(_c.sent())) return [3 /*break*/, 9];
                        return [4 /*yield*/, gossiper.flushDatagraph(this.apiConnector)];
                    case 8:
                        _b = _c.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        _b = null;
                        _c.label = 10;
                    case 10:
                        flushCall = _b;
                        return [4 /*yield*/, gossiper.gossipToUrl(this.apiConnector)];
                    case 11: return [2 /*return*/, _c.sent()];
                    case 12: throw new Error("No API connector set pass it into this function or on the constructor");
                }
            });
        });
    };
    CSCanonizeManager.prototype.flushWithBlockchainSupport = function (blockchains, apiConnector) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockchains.forEach(function (blockchain) {
                            var entity = new Entity(_this.activeBlockchainFactory, [new Reference(_this.sandra.get('blockchain'), blockchain.getName())]);
                            entity.setTriplet('onBlockchain', blockchain.getName(), _this.sandra);
                            _this.activeBlockchainFactory.addOrUpdateEntity(entity);
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.gossipActiveBlockchain(apiConnector, true)];
                }
            });
        });
    };
    CSCanonizeManager.prototype.getAssetSolverFactory = function () {
        return this.assetSolverFactory;
    };
    CSCanonizeManager.prototype.gossipCollection = function (apiConnector) {
        return __awaiter(this, void 0, void 0, function () {
            var gossiper;
            return __generator(this, function (_a) {
                gossiper = new Gossiper(this.assetCollectionFactory);
                return [2 /*return*/, gossiper.gossipToUrl(this.getApiConnector(apiConnector))];
            });
        });
    };
    CSCanonizeManager.prototype.gossipOrbsBindings = function (apiConnector) {
        return __awaiter(this, void 0, void 0, function () {
            var gossiper;
            return __generator(this, function (_a) {
                gossiper = null;
                //if the asset are bound directely to token we are going to dispatch that.
                if (this.tokenFactory.entityArray.length > 0) {
                    console.log("There are token binding so we are publishing token binding");
                    gossiper = new Gossiper(this.tokenFactory);
                }
                else {
                    console.log("No token binding assets may be bound directely to contract");
                    gossiper = new Gossiper(this.assetFactory);
                }
                return [2 /*return*/, gossiper.gossipToUrl(this.getApiConnector(apiConnector))];
            });
        });
    };
    CSCanonizeManager.prototype.gossipBlockchainEvents = function (blockchain, apiConnector) {
        return __awaiter(this, void 0, void 0, function () {
            var gossiper;
            return __generator(this, function (_a) {
                gossiper = new Gossiper(blockchain.eventFactory);
                return [2 /*return*/, gossiper.gossipToUrl(this.getApiConnector(apiConnector))];
            });
        });
    };
    CSCanonizeManager.prototype.getApiConnector = function (apiConnector) {
        if (apiConnector !== undefined) {
            return apiConnector;
        }
        if (this.apiConnector !== undefined) {
            return this.apiConnector;
        }
        throw new Error("No API connector set pass it into this function or on the constructor");
    };
    CSCanonizeManager.prototype.getBlockchainByName = function (name) {
    };
    CSCanonizeManager.prototype.getOrInitBlockchain = function (name) {
        var found = this.loadedBlockchains.find(function (blockchain) { return blockchain.getName() == name; });
        if (found instanceof Blockchain) {
            return found;
        }
        var blockchain = null;
        switch (name) {
            case CompatibleBlockchains.kusama:
                blockchain = new KusamaBlockchain(this.getSandra());
                this.loadedBlockchains.push(blockchain);
                return new KusamaBlockchain(this.getSandra());
        }
        throw new Error("Blockchain not found" + name);
    };
    CSCanonizeManager.prototype.registerCompatibleStandards = function () {
        // add compatible standards here
        var standard = new RmrkContractStandard(this);
        this.contractStandardMap.set(standard.getName(), standard);
        return this.contractStandardMap;
    };
    CSCanonizeManager.prototype.getStandardFromName = function (name) {
        var standard = this.contractStandardMap.get(name);
        if (!standard)
            return null;
        return standard;
    };
    CSCanonizeManager.mintIssuerAddressString = '0x0000000000000000000000000000000000000000';
    return CSCanonizeManager;
}());
export { CSCanonizeManager };
export var CompatibleBlockchains;
(function (CompatibleBlockchains) {
    CompatibleBlockchains["kusama"] = "kusama";
})(CompatibleBlockchains || (CompatibleBlockchains = {}));
//# sourceMappingURL=CSCanonizeManager.js.map