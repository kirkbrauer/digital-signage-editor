import * as tslib_1 from "tslib";
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
/**
 * A paint fill for a shape or line.
 */
var Paint = /** @class */ (function () {
    function Paint(config) {
        this.visible = config.visible === undefined ? true : config.visible;
        this.opacity = config.opacity || 1.0;
        this.color = config.color || null;
        this.gradientType = config.gradientType || null;
        this.gradientAngle = config.gradientAngle || null;
        this.gradientStops = config.gradientStops || [];
        this.scaleMode = config.scaleMode || null;
        this.repeatMode = config.repeatMode || null;
        this.imageUrl = config.imageUrl || null;
    }
    Paint.prototype.isVisible = function () {
        return this.visible;
    };
    Paint.prototype.show = function () {
        return new Paint(tslib_1.__assign({}, this.toJS(), { visible: true }));
    };
    Paint.prototype.hide = function () {
        return new Paint(tslib_1.__assign({}, this.toJS(), { visible: false }));
    };
    Paint.prototype.getOpacity = function () {
        return this.opacity;
    };
    Paint.prototype.setOpacity = function (opacity) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { opacity: opacity }));
    };
    Paint.prototype.getColor = function () {
        return this.color;
    };
    Paint.prototype.setColor = function (color) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { color: color }));
    };
    Paint.prototype.getGradientType = function () {
        return this.gradientType;
    };
    Paint.prototype.setGradientType = function (gradientType) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { gradientType: gradientType }));
    };
    Paint.prototype.getGradientAngle = function () {
        return this.gradientAngle;
    };
    Paint.prototype.setGradientAngle = function (gradientAngle) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { gradientAngle: gradientAngle }));
    };
    Paint.prototype.getGradientStops = function () {
        return this.gradientStops;
    };
    Paint.prototype.setGradientStops = function (gradientStops) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { gradientStops: gradientStops }));
    };
    Paint.prototype.getScaleMode = function () {
        return this.scaleMode;
    };
    Paint.prototype.setScaleMode = function (scaleMode) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { scaleMode: scaleMode }));
    };
    Paint.prototype.getRepeatMode = function () {
        return this.repeatMode;
    };
    Paint.prototype.setRepeatMode = function (repeatMode) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { repeatMode: repeatMode }));
    };
    Paint.prototype.getImageURL = function () {
        return this.imageUrl;
    };
    Paint.prototype.setImageURL = function (imageUrl) {
        return new Paint(tslib_1.__assign({}, this.toJS(), { imageUrl: imageUrl }));
    };
    Paint.prototype.toJS = function () {
        return {
            visible: this.visible,
            opacity: this.opacity,
            color: this.color,
            gradientType: this.gradientType,
            gradientAngle: this.gradientAngle,
            gradientStops: this.gradientStops,
            scaleMode: this.scaleMode,
            repeatMode: this.repeatMode,
            imageUrl: this.imageUrl
        };
    };
    return Paint;
}());
export { Paint };
