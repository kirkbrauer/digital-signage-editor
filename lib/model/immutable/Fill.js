"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var Color_1 = require("./Color");
var raw_1 = require("../raw");
var ColorStop_1 = require("./ColorStop");
var raw_2 = require("../raw");
exports.defaultFill = {
    visible: true,
    opacity: 1.0,
    color: new Color_1.Color(),
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
            case raw_2.GradientType.LINEAR: return 'linear-gradient';
            case raw_2.GradientType.RADIAL: return 'radial-gradient';
            default: return 'linear-gradient';
        }
    };
    Fill.prototype.getGradientCSSString = function () {
        var e_1, _a;
        var stops = [];
        // Set the gradient angle
        var angle = this.gradientType === raw_2.GradientType.RADIAL ? 'circle' : (this.gradientAngle || 0) + "deg";
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
        return this.getGradientTypeCSSString() + "(" + angle + ", " + stops.join(', ') + ")";
    };
    Fill.prototype.getScaleModeCSSString = function () {
        switch (this.scaleMode) {
            case raw_2.ImageScaleMode.FIT: return 'contain';
            case raw_2.ImageScaleMode.FILL: return 'cover';
            case raw_2.ImageScaleMode.STRETCH: return '100% 100%';
            default: return undefined;
        }
    };
    Fill.prototype.getRepeatModeCSSString = function () {
        switch (this.repeatMode) {
            case raw_2.ImageRepeatMode.REPEAT: return 'repeat';
            case raw_2.ImageRepeatMode.REPEAT_X: return 'repeat-x';
            case raw_2.ImageRepeatMode.REPEAT_Y: return 'repeat-y';
            default: return 'no-repeat';
        }
    };
    Fill.prototype.toStrokeCSS = function (strokeWeight, strokeAlign) {
        if (strokeWeight) {
            if (this.visible) {
                switch (strokeAlign) {
                    case raw_1.StrokeAlign.OUTSIDE: return {
                        boxShadow: "0px 0px 0px " + strokeWeight + "px " + this.color.toString(this.opacity)
                    };
                    case raw_1.StrokeAlign.INSIDE: return {
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
                    backgroundRepeat: this.getRepeatModeCSSString()
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
    Fill.prototype.toRaw = function () {
        return {
            visible: this.visible,
            opacity: this.opacity,
            color: this.color.toRaw(),
            gradientType: this.gradientType,
            gradientAngle: this.gradientAngle,
            gradientStops: this.gradientStops ? this.gradientStops.map(function (gradientStop) { return gradientStop.toRaw(); }).toArray() : null,
            scaleMode: this.scaleMode,
            repeatMode: this.repeatMode,
            imageUrl: this.imageUrl
        };
    };
    Fill.fromRaw = function (raw) {
        return new Fill({
            visible: raw.visible,
            opacity: raw.opacity,
            color: Color_1.Color.fromRaw(raw.color),
            gradientType: raw.gradientType,
            gradientAngle: raw.gradientAngle,
            gradientStops: raw.gradientStops ? immutable_1.List(raw.gradientStops.map(function (gradientStop) { return ColorStop_1.ColorStop.fromRaw(gradientStop); })) : null,
            scaleMode: raw.scaleMode,
            repeatMode: raw.repeatMode,
            imageUrl: raw.imageUrl
        });
    };
    return Fill;
}(immutable_1.Record(exports.defaultFill)));
exports.Fill = Fill;
