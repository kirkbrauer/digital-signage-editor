"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var v4_1 = tslib_1.__importDefault(require("uuid/v4"));
var Vector_1 = require("./Vector");
exports.defaultVectorPoint = {
    id: '',
    position: new Vector_1.Vector(),
    ctrlPointsLocked: true,
    ctrlPoint1: null,
    ctrlPoint2: null
};
var VectorPoint = /** @class */ (function (_super) {
    tslib_1.__extends(VectorPoint, _super);
    function VectorPoint(props) {
        // Generate a unique UUID for a new vector point.
        return _super.call(this, Object.assign({}, props, { id: (props && props.id) || v4_1.default() })) || this;
    }
    VectorPoint.prototype.toRaw = function () {
        return {
            id: this.id,
            position: this.position.toRaw(),
            ctrlPointsLocked: this.ctrlPointsLocked,
            ctrlPoint1: this.ctrlPoint1 ? this.ctrlPoint1.toRaw() : null,
            ctrlPoint2: this.ctrlPoint2 ? this.ctrlPoint2.toRaw() : null
        };
    };
    VectorPoint.fromRaw = function (raw) {
        return new VectorPoint({
            id: raw.id,
            position: Vector_1.Vector.fromRaw(raw.position),
            ctrlPointsLocked: raw.ctrlPointsLocked,
            ctrlPoint1: raw.ctrlPoint1 ? Vector_1.Vector.fromRaw(raw.ctrlPoint1) : null,
            ctrlPoint2: raw.ctrlPoint2 ? Vector_1.Vector.fromRaw(raw.ctrlPoint2) : null
        });
    };
    return VectorPoint;
}(immutable_1.Record(exports.defaultVectorPoint)));
exports.VectorPoint = VectorPoint;
