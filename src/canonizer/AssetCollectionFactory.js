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
exports.AssetCollectionFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var AssetCollectionFactory = /** @class */ (function (_super) {
    __extends(AssetCollectionFactory, _super);
    function AssetCollectionFactory(sandra) {
        var _this = _super.call(this, 'assetCollection', 'assetCollectionFile', sandra) || this;
        _this.is_a = 'assetCollection';
        _this.contained_in_file = 'assetCollectionFile';
        _this.id = 'collectionId';
        _this.updateOnExistingRef = sandra.get(_this.id);
        return _this;
    }
    AssetCollectionFactory.COLLECTION_ID = 'collectionId';
    AssetCollectionFactory.IMAGE_EXTENSION = 'imageExtension';
    AssetCollectionFactory.MAIN_IMAGE = 'imageUrl';
    AssetCollectionFactory.MAIN_NAME = 'name';
    AssetCollectionFactory.DESCRIPTION = 'descriptiopn';
    AssetCollectionFactory.COLLECTION_OWNER = 'owner';
    return AssetCollectionFactory;
}(EntityFactory_js_1.EntityFactory));
exports.AssetCollectionFactory = AssetCollectionFactory;
