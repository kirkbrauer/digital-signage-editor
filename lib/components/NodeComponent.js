import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Transformer from './Transformer';
var NodeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeComponent, _super);
    function NodeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragging = false;
        _this.resizing = false;
        _this.rotating = false;
        return _this;
    }
    NodeComponent.prototype.renderEditableContent = function () {
        return this.renderStaticContent();
    };
    NodeComponent.prototype.onSelect = function (e) {
        if (this.props.onSelect) {
            this.props.onSelect();
        }
    };
    NodeComponent.prototype.onDrag = function (pos) {
        if (this.props.onChange) {
            this.props.onChange(this.props.node.setPosition(pos));
        }
    };
    NodeComponent.prototype.onResize = function (size, pos) {
        if (this.props.onChange) {
            this.props.onChange(this.props.node.setPosition(pos).setSize(size));
        }
    };
    NodeComponent.prototype.onRotate = function (angle) {
        console.log(angle);
        if (this.props.onChange) {
            this.props.onChange(this.props.node.set('rotation', angle));
        }
    };
    NodeComponent.prototype.render = function () {
        var _this = this;
        var node = this.props.node;
        return (React.createElement(Transformer, { disabled: !this.props.selected || this.props.inGroup, position: node.getPosition(), size: node.getSize(), rotation: node.rotation, disableRotation: true, onDrag: function () {
                _this.dragging = true;
                if (_this.props.onSelect && !_this.props.selected)
                    _this.props.onSelect();
            }, onDragStop: function (e, pos) {
                _this.dragging = false;
                if (_this.props.onSelect)
                    _this.props.onSelect();
                _this.onDrag(pos);
            }, onClick: function (e) {
                _this.onSelect(e);
            }, onResize: function () {
                _this.resizing = true;
            }, onResizeStop: function (e, size, pos) {
                _this.resizing = false;
                _this.onResize(size, pos);
            }, onRotate: function () {
                _this.rotating = true;
            }, onRotateStop: function (e, angle) {
                _this.rotating = false;
                _this.onRotate(angle);
            } }, this.renderStaticContent()));
    };
    return NodeComponent;
}(Component));
export default NodeComponent;
