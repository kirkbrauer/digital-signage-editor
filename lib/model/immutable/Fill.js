import * as tslib_1 from "tslib";
import { Record } from 'immutable';
import { Color } from './Color';
import { StrokeAlign } from './Node';
/**
 * Defines image scale modes.
 */
export var ImageScaleMode;
(function (ImageScaleMode) {
    ImageScaleMode["FILL"] = "FILL";
    ImageScaleMode["FIT"] = "FIT";
    ImageScaleMode["REPEAT"] = "REPEAR";
    ImageScaleMode["STRETCH"] = "STRETCH";
})(ImageScaleMode || (ImageScaleMode = {}));
/**
 * Defines image repeat modes.
 */
export var ImageRepeatMode;
(function (ImageRepeatMode) {
    ImageRepeatMode["REPEAT"] = "REPEAT";
    ImageRepeatMode["REPEAT_X"] = "REPEAT_X";
    ImageRepeatMode["REPEAT_Y"] = "REPEAT_Y";
})(ImageRepeatMode || (ImageRepeatMode = {}));
/**
 * Defines gradient types.
 */
export var GradientType;
(function (GradientType) {
    GradientType["LINEAR"] = "LINEAR";
    GradientType["RADIAL"] = "RADIAL";
})(GradientType || (GradientType = {}));
var defaultFill = {
    visible: true,
    opacity: 1.0,
    color: new Color(),
    gradientType: null,
    gradientAngle: null,
    gradientStops: null,
    scaleMode: null,
    repeatMode: null,
    imageUrl: null
};
var Fill = /** @class */ (function (_super) {
    tslib_1.__extends(Fill, _super);
    function Fill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fill.prototype.getGradientTypeCSSString = function () {
        switch (this.gradientType) {
            case GradientType.LINEAR: return 'linear-gradient';
            case GradientType.RADIAL: return 'radial-gradient';
            default: return 'linear-gradient';
        }
    };
    Fill.prototype.getGradientCSSString = function () {
        var e_1, _a;
        var stops = [];
        // Set the gradient angle
        var angle = this.gradientType === GradientType.RADIAL ? 'circle' : (this.gradientAngle || 0);
        try {
            // Generate the gradient stops
            for (var _b = tslib_1.__values(this.gradientStops || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var stop_1 = _c.value;
                stops.push(stop_1.color.toString(this.opacity || 1) + " " + stop_1.position * 100 + "%");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Return the gradient sting
        return this.getGradientTypeCSSString() + "(" + angle + "deg, " + stops.join(',') + ")";
    };
    Fill.prototype.getScaleModeCSSString = function () {
        switch (this.scaleMode) {
            case ImageScaleMode.FIT: return 'contain';
            case ImageScaleMode.FILL: return 'cover';
            case ImageScaleMode.STRETCH: return '100% 100%';
            default: return undefined;
        }
    };
    Fill.prototype.getRepeatModeString = function () {
        switch (this.repeatMode) {
            case ImageRepeatMode.REPEAT: return 'repeat';
            case ImageRepeatMode.REPEAT_X: return 'repeat-x';
            case ImageRepeatMode.REPEAT_Y: return 'repeat-y';
            default: return 'no-repeat';
        }
    };
    Fill.prototype.toStrokeCSS = function (strokeWeight, strokeAlign) {
        if (strokeWeight) {
            if (this.visible) {
                if (this.color) {
                    switch (strokeAlign) {
                        case StrokeAlign.OUTSIDE: return {
                            boxShadow: "0px 0px 0px " + strokeWeight + "px " + this.color.toString(this.opacity)
                        };
                        case StrokeAlign.INSIDE: return {
                            boxShadow: "inset 0px 0px 0px " + strokeWeight + "px " + this.color.toString(this.opacity)
                        };
                        default: return {
                            borderColor: this.color.toString(this.opacity),
                            borderStyle: 'solid',
                            borderWidth: strokeWeight
                        };
                    }
                }
            }
        }
        return {};
    };
    Fill.prototype.toFillCSS = function () {
        if (this.visible) {
            if (this.imageUrl) {
                return {
                    backgroundColor: "rgba(255,255,255," + this.opacity + ")",
                    backgroundImage: "url(" + this.imageUrl + ")",
                    backgroundSize: this.getScaleModeCSSString(),
                    backgroundPosition: 'center',
                    backgroundRepeat: this.scaleMode === ImageScaleMode.REPEAT ? this.getRepeatModeString() : 'no-repeat'
                };
            }
            if (this.gradientType) {
                return {
                    backgroundImage: this.getGradientCSSString()
                };
            }
            if (this.color) {
                return {
                    backgroundColor: this.color.toString(this.opacity)
                };
            }
        }
        return {};
    };
    return Fill;
}(Record(defaultFill)));
export { Fill };
