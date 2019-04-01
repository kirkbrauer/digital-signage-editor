import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import uuid from 'uuid/v4';
var defaultVectorPoint = {
    id: '',
    x: 0,
    y: 0
};
var VectorPoint = /** @class */ (function (_super) {
    tslib_1.__extends(VectorPoint, _super);
    function VectorPoint(props) {
        // Generate a unique UUID for a new vector point.
        return _super.call(this, Object.assign({}, props, { id: (props && props.id) || uuid() })) || this;
    }
    return VectorPoint;
}(Record(defaultVectorPoint)));
export { VectorPoint };
