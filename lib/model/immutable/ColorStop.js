import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { Color } from './Color';
var defaultColorStop = {
    position: 0,
    color: new Color()
};
var ColorStop = /** @class */ (function (_super) {
    tslib_1.__extends(ColorStop, _super);
    function ColorStop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ColorStop;
}(Record(defaultColorStop)));
export { ColorStop };
