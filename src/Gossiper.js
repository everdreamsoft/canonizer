"use strict";
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
exports.__esModule = true;
exports.Gossiper = void 0;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Gossiper = /** @class */ (function () {
    function Gossiper(entityFactory, updateOnReference) {
        this.showAllTriplets = false;
        //taking factory default if not set
        if (!updateOnReference)
            updateOnReference = entityFactory.updateOnExistingRef;
        this.entityFactory = entityFactory;
        this.updateOnReference = updateOnReference;
        this.joinFactoryGossip = [];
    }
    Gossiper.gossipFactory = function (entityFactory, updateOnRefrenceConcept) {
        return new Gossiper(entityFactory, updateOnRefrenceConcept);
    };
    Gossiper.prototype.exposeGossip = function (isFinalFactory) {
        var _this = this;
        if (isFinalFactory === void 0) { isFinalFactory = true; }
        var how = this.entityFactory.refMap;
        var refMap = {};
        //Iterate over map entries
        // @ts-ignore
        for (var _i = 0, how_1 = how; _i < how_1.length; _i++) {
            var _a = how_1[_i], key = _a[0], value = _a[1];
            refMap[key] = value;
        }
        // @ts-ignore
        for (var _b = 0, _c = this.entityFactory.refMap.entries(); _b < _c.length; _b++) {
            var entry = _c[_b];
            // refMap[entry[0]] = entry[1];
            //console.log(entry);
        }
        var joinedFactoryGossip = [];
        this.entityFactory.joinedFactory.forEach(function (joinFactory) {
            if (joinFactory.entityFactory !== _this.entityFactory) {
                var joinedGossip = new Gossiper(joinFactory.entityFactory, joinFactory.createOnRef);
                joinedFactoryGossip.push(joinedGossip.exposeGossip(false));
            }
        });
        var entityArray = [];
        this.entityFactory.entityArray.forEach(function (r) {
            entityArray.push(_this.gossipEntity(r));
        });
        var myData = {
            gossiper: {
                updateOnReferenceShortname: this.updateOnReference.shortname
            },
            'entityFactory': {
                'is_a': this.entityFactory.is_a,
                'contained_in_file': this.entityFactory.contained_in_file,
                'entityArray': entityArray,
                'refMap': refMap,
                'joinedFactory': joinedFactoryGossip
            }
        };
        if (isFinalFactory) {
            myData.gossiper.shortNameDictionary = this.buildShortNameDictionary(this.entityFactory.sandraManager);
        }
        return myData;
    };
    Gossiper.prototype.gossipEntity = function (entity) {
        var _this = this;
        var myData = {
            id: entity.id,
            subjectUnid: entity.subjectConcept.unid,
            referenceArray: entity.referenceArray
        };
        var _loop_1 = function (triplet) {
            if (!myData.triplets)
                myData.triplets = {};
            if (!myData.triplets[triplet[0].shortname])
                myData.triplets[triplet[0].shortname] = [];
            triplet[1].forEach(function (element) {
                myData.triplets[triplet[0].shortname].push(element.unid);
            });
        };
        for (var _i = 0, _a = entity.subjectConcept.triplets; _i < _a.length; _i++) {
            var triplet = _a[_i];
            _loop_1(triplet);
        }
        var _loop_2 = function (tripletRef) {
            if (!myData.tripletsReferences)
                myData.tripletsReferences = {};
            if (!myData.tripletsReferences[tripletRef[0].shortname])
                myData.tripletsReferences[tripletRef[0].shortname] = [];
            //simplyfy reference
            tripletRef[1].forEach(function (element) {
                //simplify reference for display
                var simpleReference = _this.simplifyReference(element.refs);
                myData.tripletsReferences[tripletRef[0].shortname].push({
                    targetUnid: element.concept.unid,
                    refs: simpleReference
                });
            });
        };
        //check triplet references
        for (var _b = 0, _c = entity.subjectConcept.tripletsReferences; _b < _c.length; _b++) {
            var tripletRef = _c[_b];
            _loop_2(tripletRef);
        }
        return myData;
    };
    Gossiper.prototype.joinFactoryGossiper = function (gossiper) {
        this.joinFactoryGossip.push(gossiper);
    };
    Gossiper.prototype.buildShortNameDictionary = function (sandra) {
        var dictionnary = {};
        sandra.conceptList.forEach(function (element) {
            dictionnary[element.unid] = element.shortname;
        });
        return dictionnary;
    };
    Gossiper.prototype.simplifyReference = function (ref) {
        var simpleRefArray = [];
        ref.forEach(function (ref) {
            simpleRefArray.push({ conceptUnid: ref.concept.unid, value: ref.value });
        });
        return simpleRefArray;
    };
    Gossiper.prototype.gossipToUrl = function (connector, flush) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xmlhttp = new XMLHttpRequest();
                        var flushData = '';
                        if (flush)
                            flushData = '&flush=true';
                        xmlhttp.open("POST", connector.gossipUrl + '?jwt=' + connector.jwt + flushData);
                        //console.log(connector.gossipUrl + '?jwt=' + connector.jwt + flushData);
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(JSON.stringify(_this.exposeGossip(true)));
                        //console.log(JSON.stringify(this.exposeGossip(true)));
                        xmlhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var response = this.responseText;
                                resolve(response);
                            }
                            else if (this.readyState == 4)
                                reject('Bad request :' + this.status);
                        };
                    })];
            });
        });
    };
    Gossiper.prototype.flushDatagraph = function (connector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xmlhttp = new XMLHttpRequest();
                        var flushData = '&flush=true';
                        xmlhttp.open("POST", connector.gossipUrl + '?jwt=' + connector.jwt + flushData);
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send();
                        xmlhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var response = this.responseText;
                                resolve(response);
                            }
                            else if (this.readyState == 4)
                                reject('Bad request :' + this.status);
                        };
                    })];
            });
        });
    };
    Gossiper.prototype.listenFromRemote = function (connector) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlhttp;
            return __generator(this, function (_a) {
                xmlhttp = new XMLHttpRequest();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        xmlhttp.open("GET", connector.gossipUrl + '?jwt=' + connector.jwt);
                    })];
            });
        });
    };
    return Gossiper;
}());
exports.Gossiper = Gossiper;
