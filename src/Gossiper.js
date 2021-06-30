"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gossiper = void 0;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class Gossiper {
    constructor(entityFactory, updateOnReference) {
        this.showAllTriplets = false;
        //taking factory default if not set
        if (!updateOnReference)
            updateOnReference = entityFactory.updateOnExistingRef;
        this.entityFactory = entityFactory;
        this.updateOnReference = updateOnReference;
        this.joinFactoryGossip = [];
    }
    static gossipFactory(entityFactory, updateOnRefrenceConcept) {
        return new Gossiper(entityFactory, updateOnRefrenceConcept);
    }
    exposeGossip(isFinalFactory = true) {
        let how = this.entityFactory.refMap;
        let refMap = {};
        //Iterate over map entries
        // @ts-ignore
        for (let [key, value] of how) {
            refMap[key] = value;
        }
        // @ts-ignore
        for (let entry of this.entityFactory.refMap.entries()) {
            // refMap[entry[0]] = entry[1];
            //console.log(entry);
        }
        let joinedFactoryGossip = [];
        this.entityFactory.joinedFactory.forEach(joinFactory => {
            if (joinFactory.entityFactory !== this.entityFactory) {
                let joinedGossip = new Gossiper(joinFactory.entityFactory, joinFactory.createOnRef);
                joinedFactoryGossip.push(joinedGossip.exposeGossip(false));
            }
        });
        let entityArray = [];
        this.entityFactory.entityArray.forEach(r => {
            entityArray.push(this.gossipEntity(r));
        });
        let myData = {
            gossiper: {
                updateOnReferenceShortname: this.updateOnReference.shortname,
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
    }
    gossipEntity(entity) {
        let myData = {
            id: entity.id,
            subjectUnid: entity.subjectConcept.unid,
            referenceArray: entity.referenceArray
        };
        for (let triplet of entity.subjectConcept.triplets) {
            if (!myData.triplets)
                myData.triplets = {};
            if (!myData.triplets[triplet[0].shortname])
                myData.triplets[triplet[0].shortname] = [];
            triplet[1].forEach(element => {
                myData.triplets[triplet[0].shortname].push(element.unid);
            });
        }
        //check triplet references
        for (let tripletRef of entity.subjectConcept.tripletsReferences) {
            if (!myData.tripletsReferences)
                myData.tripletsReferences = {};
            if (!myData.tripletsReferences[tripletRef[0].shortname])
                myData.tripletsReferences[tripletRef[0].shortname] = [];
            //simplyfy reference
            tripletRef[1].forEach(element => {
                //simplify reference for display
                let simpleReference = this.simplifyReference(element.refs);
                myData.tripletsReferences[tripletRef[0].shortname].push({
                    targetUnid: element.concept.unid,
                    refs: simpleReference
                });
            });
        }
        return myData;
    }
    joinFactoryGossiper(gossiper) {
        this.joinFactoryGossip.push(gossiper);
    }
    buildShortNameDictionary(sandra) {
        let dictionnary = {};
        sandra.conceptList.forEach(element => {
            dictionnary[element.unid] = element.shortname;
        });
        return dictionnary;
    }
    simplifyReference(ref) {
        let simpleRefArray = [];
        ref.forEach(ref => {
            simpleRefArray.push({ conceptUnid: ref.concept.unid, value: ref.value });
        });
        return simpleRefArray;
    }
    async gossipToUrl(connector, flush) {
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            let flushData = '';
            if (flush)
                flushData = '&flush=true';
            xmlhttp.open("POST", connector.gossipUrl + '?jwt=' + connector.jwt + flushData);
            console.log(connector.gossipUrl + '?jwt=' + connector.jwt + flushData);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(JSON.stringify(this.exposeGossip(true)));
            //console.log(JSON.stringify(this.exposeGossip(true)));
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let response = this.responseText;
                    resolve(response);
                }
                else if (this.readyState == 4)
                    reject('Bad request :' + this.status);
            };
        });
    }
    async flushDatagraph(connector) {
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            let flushData = '&flush=true';
            xmlhttp.open("POST", connector.gossipUrl + '?jwt=' + connector.jwt + flushData);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let response = this.responseText;
                    resolve(response);
                }
                else if (this.readyState == 4)
                    reject('Bad request :' + this.status);
            };
        });
    }
    async listenFromRemote(connector) {
        const xmlhttp = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xmlhttp.open("GET", connector.gossipUrl + '?jwt=' + connector.jwt);
        });
    }
}
exports.Gossiper = Gossiper;
//# sourceMappingURL=Gossiper.js.map