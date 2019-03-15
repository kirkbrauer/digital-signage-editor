import * as tslib_1 from "tslib";
import { Immutable } from './Immutable';
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
 * A fill for a shape or line.
 */
var Fill = /** @class */ (function (_super) {
    tslib_1.__extends(Fill, _super);
    function Fill(config) {
        var _this = _super.call(this) || this;
        _this.visible = config.visible === undefined ? true : config.visible;
        _this.opacity = config.opacity || 1.0;
        _this.color = config.color || null;
        _this.gradientType = config.gradientType || null;
        _this.gradientAngle = config.gradientAngle || null;
        _this.gradientStops = config.gradientStops || [];
        _this.scaleMode = config.scaleMode || null;
        _this.repeatMode = config.repeatMode || null;
        _this.imageUrl = config.imageUrl || null;
        return _this;
    }
    /**
     * Returns true of the fill is visible.
     */
    Fill.prototype.isVisible = function () {
        return this.visible;
    };
    Fill.prototype.show = function () {
        return new this.constructor(tslib_1.__assign({}, this.toJS(), { visible: true }));
    };
    Fill.prototype.hide = function () {
        return new this.constructor(tslib_1.__assign({}, this.toJS(), { visible: false }));
    };
    /**
     * Returns the opacity.
     */
    Fill.prototype.getOpacity = function () {
        return this.opacity;
    };
    /**
     * Sets the opacity.
     * @param opacity The new opacity of the fill.
     */
    Fill.prototype.setOpacity = function (opacity) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { opacity: opacity }));
    };
    /**
     * Returns the color.
     */
    Fill.prototype.getColor = function () {
        return this.color;
    };
    /**
     * Sets the color.
     * @param color The new color of the fill.
     */
    Fill.prototype.setColor = function (color) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { color: color }));
    };
    /**
     * Returns the gradient type.
     */
    Fill.prototype.getGradientType = function () {
        return this.gradientType;
    };
    /**
     * Sets the gradient type.
     * @param gradientType The new gradient type of the fill.
     */
    Fill.prototype.setGradientType = function (gradientType) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { gradientType: gradientType }));
    };
    /**
     * Returns the gradient angle.
     */
    Fill.prototype.getGradientAngle = function () {
        return this.gradientAngle;
    };
    /**
     * Sets the gradient angle.
     * @param gradientAngle The new gradient angle of the fill.
     */
    Fill.prototype.setGradientAngle = function (gradientAngle) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { gradientAngle: gradientAngle }));
    };
    /**
     * Returns the gradient stops.
     */
    Fill.prototype.getGradientStops = function () {
        return this.gradientStops;
    };
    /**
     * Sets the gradient stops.
     * @param gradientStops The new gradient stops.
     */
    Fill.prototype.setGradientStops = function (gradientStops) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { gradientStops: gradientStops }));
    };
    /**
     * Updates a gradient stop.
     * @param index The index to update the gradient stop at.
     * @param gradientStops The new gradient stop.
     */
    Fill.prototype.updateGradientStop = function (index, gradientStop) {
        this.gradientStops[index] = gradientStop;
        return new Fill(tslib_1.__assign({}, this.toJS(), { gradientStops: this.gradientStops }));
    };
    /**
     * Adds a new gradient stop.
     * @param gradientStop The new gradient stops.
     */
    Fill.prototype.addGradientStop = function (gradientStop) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { gradientStops: this.gradientStops.concat([gradientStop]) }));
    };
    /**
     * Removes a gradient stop by index.
     * @param index The gradient stop index.
     */
    Fill.prototype.removeGradientStop = function (index) {
        // Remove the gradient stop
        this.gradientStops.splice(index, 1);
        return new Fill(tslib_1.__assign({}, this.toJS(), { gradientStops: this.gradientStops }));
    };
    /**
     * Returns the image scale mode.
     */
    Fill.prototype.getScaleMode = function () {
        return this.scaleMode;
    };
    /**
     * Sets the image scale mode.
     * @param scaleMode The new image scale mode.
     */
    Fill.prototype.setScaleMode = function (scaleMode) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { scaleMode: scaleMode }));
    };
    /**
     * Returns the image repeat mode.
     */
    Fill.prototype.getRepeatMode = function () {
        return this.repeatMode;
    };
    /**
     * Sets the image repeat mode.
     * @param repeatMode The new image repeat mode.
     */
    Fill.prototype.setRepeatMode = function (repeatMode) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { repeatMode: repeatMode }));
    };
    /**
     * Returns the image URL.
     */
    Fill.prototype.getImageURL = function () {
        return this.imageUrl;
    };
    /**
     * Sets the image URL.
     * @param imageUrl The new image url.
     */
    Fill.prototype.setImageURL = function (imageUrl) {
        return new Fill(tslib_1.__assign({}, this.toJS(), { imageUrl: imageUrl }));
    };
    Fill.prototype.toJS = function () {
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
    Fill.prototype.toRaw = function () { };
    return Fill;
}(Immutable));
export { Fill };
