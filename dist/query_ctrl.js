///<reference path="../headers/common.d.ts" />
System.register(['lodash', './sdk/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1;
    var MetaQueriesQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            MetaQueriesQueryCtrl = (function (_super) {
                __extends(MetaQueriesQueryCtrl, _super);
                /** @ngInject **/
                function MetaQueriesQueryCtrl($scope, $injector, $q) {
                    var _this = this;
                    _super.call(this, $scope, $injector);
                    this.queryTypeValidators = {
                        "TimeShift": this.validateTimeShiftQuery.bind(this),
                        "MovingAverage": this.validateMovingAverageQuery.bind(this)
                    };
                    this.defaultQueryType = "TimeShift";
                    this.defaultPeriods = 7;
                    if (!this.target.queryType) {
                        this.target.queryType = this.defaultQueryType;
                    }
                    this.queryTypes = lodash_1["default"].keys(this.queryTypeValidators);
                    this.errors = this.validateTarget();
                    if (!this.target.periods) {
                        this.clearPeriods();
                    }
                    this.getQueryLetters = function (query, callback) {
                        return _this.datasource.getTargets()
                            .then(function (targets) {
                            callback(targets.map(function (item) {
                                return item.refId;
                            }));
                        });
                    };
                }
                MetaQueriesQueryCtrl.prototype.targetBlur = function () {
                    this.errors = this.validateTarget();
                    this.refresh();
                };
                MetaQueriesQueryCtrl.prototype.clearPeriods = function () {
                    this.target.periods = this.defaultPeriods;
                    this.targetBlur();
                };
                // isValidQuery(type) {
                //   return _.has(this.filterValidators, type);
                // }
                MetaQueriesQueryCtrl.prototype.isValidQueryType = function (type) {
                    return lodash_1["default"].has(this.queryTypeValidators, type);
                };
                MetaQueriesQueryCtrl.prototype.validateMovingAverageQuery = function (target, errs) {
                    if (!target.periods) {
                        errs.periods = "Must list specify the period for moving average";
                        return false;
                    }
                    var intPeriods = parseInt(target.periods);
                    if (isNaN(intPeriods)) {
                        errs.periods = "Periods must be an integer";
                        return false;
                    }
                    return true;
                };
                MetaQueriesQueryCtrl.prototype.validateTimeShiftQuery = function (target, errs) {
                    if (!target.periods) {
                        errs.periods = "Must list specify the period for moving average";
                        return false;
                    }
                    var intPeriods = parseInt(target.periods);
                    if (isNaN(intPeriods)) {
                        errs.periods = "Periods must be an integer";
                        return false;
                    }
                    return true;
                };
                MetaQueriesQueryCtrl.prototype.validateTarget = function () {
                    var errs = {};
                    if (!this.target.queryType) {
                        errs.queryType = "You must supply a query type.";
                    }
                    else if (!this.isValidQueryType(this.target.queryType)) {
                        errs.queryType = "Unknown query type: " + this.target.queryType + ".";
                    }
                    else {
                        this.queryTypeValidators[this.target.queryType](this.target, errs);
                    }
                    if (this.query) {
                    }
                    return errs;
                };
                MetaQueriesQueryCtrl.templateUrl = 'partials/query.editor.html';
                return MetaQueriesQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("MetaQueriesQueryCtrl", MetaQueriesQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map