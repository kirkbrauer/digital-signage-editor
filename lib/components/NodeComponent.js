import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { GradientType, ImageScaleMode, ImageRepeatMode, StrokeAlign } from '../model/immutable';
import { Rnd } from 'react-rnd';
import OutsideClickHandler from 'react-outside-click-handler';
var NodeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeComponent, _super);
    function NodeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeComponent.prototype.getGradientTypeString = function (gradientType) {
        switch (gradientType) {
            case GradientType.LINEAR: return 'linear-gradient';
            case GradientType.RADIAL: return 'radial-gradient';
            default: return 'linear-gradient';
        }
    };
    NodeComponent.prototype.getGradientString = function (gradientStops, gradientAngle, gradientType, fillOpacity) {
        var stops = [];
        // Set the gradient angle
        var angle = gradientType === GradientType.RADIAL ? 'circle' : gradientAngle || 0;
        // Generate the gradient stops
        for (var _i = 0, gradientStops_1 = gradientStops; _i < gradientStops_1.length; _i++) {
            var stop_1 = gradientStops_1[_i];
            stops.push(stop_1.color.toString(fillOpacity) + " " + stop_1.position * 100 + "%");
        }
        // Return the gradient sting
        return this.getGradientTypeString(gradientType || GradientType.LINEAR) + "(" + angle + "deg, " + stops.join(',') + ")";
    };
    NodeComponent.prototype.getScaleModeString = function (scaleMode) {
        switch (scaleMode) {
            case ImageScaleMode.FIT: return 'contain';
            case ImageScaleMode.FILL: return 'cover';
            case ImageScaleMode.STRETCH: return '100% 100%';
            default: return undefined;
        }
    };
    NodeComponent.prototype.getRepeatModeString = function (repeatMode) {
        switch (repeatMode) {
            case ImageRepeatMode.REPEAT: return 'repeat';
            case ImageRepeatMode.REPEAT_X: return 'repeat-x';
            case ImageRepeatMode.REPEAT_Y: return 'repeat-y';
            default: return 'no-repeat';
        }
    };
    NodeComponent.prototype.getFillStyle = function (fill) {
        if (fill) {
            if (fill.isVisible()) {
                if (fill.getImageURL()) {
                    return {
                        backgroundColor: "rgba(255,255,255," + fill.getOpacity() + ")",
                        backgroundImage: "url(" + fill.getImageURL() + ")",
                        backgroundSize: this.getScaleModeString(fill.getScaleMode()),
                        backgroundPosition: 'center',
                        backgroundRepeat: fill.getScaleMode() === ImageScaleMode.REPEAT ? this.getRepeatModeString(fill.getRepeatMode()) : 'no-repeat'
                    };
                }
                if (fill.getGradientStops().length > 0) {
                    return {
                        backgroundImage: this.getGradientString(fill.getGradientStops(), fill.getGradientAngle(), fill.getGradientType(), fill.getOpacity())
                    };
                }
                if (fill.getColor()) {
                    return {
                        backgroundColor: fill.getColor().toString(fill.getOpacity())
                    };
                }
            }
        }
        return {
            backgroundColor: 'rgba(0,0,0,0)'
        };
    };
    NodeComponent.prototype.getStrokeStyle = function (stroke, weight, align) {
        if (stroke && weight) {
            if (stroke.isVisible()) {
                if (stroke.getColor()) {
                    switch (align) {
                        case StrokeAlign.OUTSIDE: return {
                            boxShadow: "0px 0px 0px " + weight + "px " + stroke.getColor().toString(stroke.getOpacity())
                        };
                        case StrokeAlign.INSIDE: return {
                            boxShadow: "inset 0px 0px 0px " + weight + "px " + stroke.getColor().toString(stroke.getOpacity())
                        };
                        default: return {
                            borderColor: stroke.getColor().toString(stroke.getOpacity()),
                            borderStyle: 'solid',
                            borderWidth: weight
                        };
                    }
                }
            }
        }
        return {};
    };
    NodeComponent.prototype.onSelect = function (e) {
        if (this.props.selected) {
            e.persist();
        }
        else if (this.props.onSelect) {
            e.preventDefault();
            this.props.onSelect();
        }
    };
    NodeComponent.prototype.onDragStop = function (e, data) {
        if (this.props.onChange) {
            this.props.onChange(this.props.node.setPosition({
                x: data.x,
                y: data.y
            }));
        }
    };
    NodeComponent.prototype.onResize = function (e, dir, ref, delta, position) {
        if (this.props.onChange) {
            var newNode = this.props.node;
            newNode = newNode.setWidth(ref.clientWidth);
            newNode = newNode.setHeight(ref.clientHeight);
            newNode = newNode.setPosition(position);
            this.props.onChange(newNode);
        }
    };
    NodeComponent.prototype.render = function () {
        var _this = this;
        var node = this.props.node;
        var resizeHandleStyle = {
            height: 9,
            width: 9,
            backgroundColor: 'blue',
            borderRadius: '50%',
            boxShadow: '0 0 0 1px white',
            zIndex: 1000
        };
        var divStyle = {
            opacity: node.isVisible() ? node.getOpacity() : 0,
            zIndex: node.getZIndex(),
            cursor: !this.props.selected ? 'default' : 'move',
        };
        if (!this.props.inGroup) {
            return (React.createElement(OutsideClickHandler, { onOutsideClick: function () {
                    if (_this.props.selected) {
                        if (_this.props.onDeselect) {
                            _this.props.onDeselect();
                        }
                    }
                } },
                React.createElement(Rnd, { style: divStyle, enableResizing: {
                        bottom: this.props.selected,
                        bottomLeft: this.props.selected,
                        bottomRight: this.props.selected,
                        left: this.props.selected,
                        right: this.props.selected,
                        top: this.props.selected,
                        topLeft: this.props.selected,
                        topRight: this.props.selected
                    }, onClick: function (e) { return _this.onSelect(e); }, disableDragging: !this.props.selected, size: { width: node.getWidth(), height: node.getHeight() }, lockAspectRatio: node.shouldPreserveRatio(), position: node.getPosition(), onDragStop: function (e, d) { return _this.onDragStop(e, d); }, onResize: function (e, direction, ref, delta, position) { return _this.onResize(e, direction, ref, delta, position); }, resizeHandleStyles: this.props.selected ? {
                        top: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)' }),
                        left: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)' }),
                        right: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)' }),
                        bottom: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)' }),
                        topLeft: tslib_1.__assign({ top: -5, left: -5 }, resizeHandleStyle),
                        topRight: tslib_1.__assign({ top: -5, right: -5 }, resizeHandleStyle),
                        bottomLeft: tslib_1.__assign({ bottom: -5, left: -5 }, resizeHandleStyle),
                        bottomRight: tslib_1.__assign({ bottom: -5, right: -5 }, resizeHandleStyle)
                    } : undefined, resizeHandleWrapperStyle: this.props.selected ? {
                        zIndex: 1000,
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px',
                        top: '-100%'
                    } : undefined }, this.renderContent())));
        }
        return (React.createElement("div", { style: tslib_1.__assign({}, divStyle, { transform: "translate(" + (node.getXPos() - this.props.groupPosition.x) + "px, " + (node.getYPos() - this.props.groupPosition.y) + "px)", height: node.getHeight(), width: node.getWidth(), position: 'absolute' }) }, this.renderContent()));
    };
    return NodeComponent;
}(Component));
export default NodeComponent;
