"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AssetFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var AssetFactory = /** @class */ (function (_super) {
    __extends(AssetFactory, _super);
    function AssetFactory(sandra) {
        var _this = _super.call(this, 'blockchainAsset', 'blockchainAssetFile', sandra) || this;
        _this.is_a = 'blockchainizableAsset';
        _this.contained_in_file = 'blockchainizableAssets';
        _this.updateOnExistingRef = sandra.get(AssetFactory.ID);
        return _this;
    }
    AssetFactory.ID = 'assetId';
    AssetFactory.imageUrl = 'imgUrl';
    AssetFactory.metaDataUrl = 'metaDataUrl';
    AssetFactory.tokenJoinVerb = 'bindToContract';
    AssetFactory.collectionJoinVerb = 'bindToCollection';
    AssetFactory.description = 'description';
    AssetFactory.ASSET_NAME = 'name';
    AssetFactory.ASSET_EMOTE = 'emote_'; // add unicode of emote
    return AssetFactory;
}(EntityFactory_js_1.EntityFactory));
exports.AssetFactory = AssetFactory;
