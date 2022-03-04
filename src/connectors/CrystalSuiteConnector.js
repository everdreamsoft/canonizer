"use strict";
exports.__esModule = true;
exports.CrystalSuiteConnector = void 0;
var CrystalSuiteConnector = /** @class */ (function () {
    function CrystalSuiteConnector(url, env) {
        this.factoryHeaderPath = 'admin/dbview/headers/';
        this.viewPath = 'alex/getViews/?json=1';
        this.gossipPath = 'alex/gossip/';
        this.url = url;
        this.env = env;
    }
    CrystalSuiteConnector.prototype.gossip = function (gossiper) {
        var _this = this;
        return new Promise(function (res) {
            $.ajax(_this.url
                + _this.gossipPath, {
                data: JSON.stringify(gossiper.exposeGossip()),
                dataType: 'json',
                type: 'POST'
            })
                .done(function (data) {
            }).then(function (data) {
                console.log("gossip result");
                console.log(data);
            });
        });
    };
    return CrystalSuiteConnector;
}());
exports.CrystalSuiteConnector = CrystalSuiteConnector;
