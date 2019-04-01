import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Resizable from 're-resizable';
import Draggable from 'react-draggable';
var NodeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeComponent, _super);
    function NodeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragging = false;
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
    NodeComponent.prototype.onDrag = function (e, data) {
        if (this.props.onChange) {
            this.props.onChange(this.props.node.setX(data.x).setY(data.y));
        }
    };
    NodeComponent.prototype.onResize = function (e, dir, ref, delta) {
        if (this.props.onChange) {
            var newNode = this.props.node;
            // Calculate the position delta since the last resize
            var deltaX = ref.clientWidth - this.props.node.getWidth();
            var deltaY = ref.clientHeight - this.props.node.getHeight();
            // Calculate the new positions
            var xPos = this.props.node.getX() - deltaX;
            var yPos = this.props.node.getY() - deltaY;
            // Set the new position based on resize direction
            if (dir === 'top' || dir === 'left' || dir === 'topLeft') {
                newNode = newNode.setX(xPos).setY(yPos);
            }
            else if (dir === 'topRight') {
                newNode = newNode.setY(yPos);
            }
            else if (dir === 'bottomLeft') {
                newNode = newNode.setX(xPos);
            }
            newNode = newNode.setWidth(ref.clientWidth);
            newNode = newNode.setHeight(ref.clientHeight);
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
            boxShadow: '0 0 0 1px white'
        };
        if (this.props.inGroup) {
            return (React.createElement("div", { style: {
                    transform: "translate(" + (node.getX() - this.props.groupX) + "px, " + (node.getY() - this.props.groupY) + "px)",
                    height: node.getHeight(),
                    width: node.getWidth(),
                    position: 'absolute'
                } }, this.renderStaticContent()));
        }
        if (this.props.editing) {
            return (React.createElement("div", { style: {
                    transform: "translate(" + node.getX() + "px, " + node.getY() + "px)",
                    height: node.getHeight(),
                    width: node.getWidth(),
                    position: 'absolute',
                    boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
                } }, this.renderEditableContent()));
        }
        return (React.createElement("div", { onDoubleClick: function () {
                if (_this.props.onStartEditing) {
                    _this.props.onStartEditing();
                }
            }, style: {
                cursor: 'move'
            } },
            React.createElement(Draggable, { position: {
                    x: node.getX(),
                    y: node.getY()
                }, onStart: function () {
                    if (_this.props.onSelect)
                        _this.props.onSelect();
                }, onDrag: function (e) {
                    _this.dragging = true;
                    e.stopPropagation();
                }, onStop: function (e, data) {
                    _this.dragging = false;
                    e.stopPropagation();
                    _this.onDrag(e, data);
                    if (_this.props.onSelect)
                        _this.props.onSelect();
                } },
                React.createElement(Resizable, { style: {
                        position: 'absolute'
                    }, onClick: function (e) { return _this.onSelect(e); }, size: { width: node.getWidth(), height: node.getHeight() }, enable: {
                        top: this.props.selected,
                        right: this.props.selected,
                        bottom: this.props.selected,
                        left: this.props.selected,
                        topRight: this.props.selected,
                        bottomRight: this.props.selected,
                        bottomLeft: this.props.selected,
                        topLeft: this.props.selected
                    }, onResizeStart: function (e) {
                        e.stopPropagation();
                        if (_this.props.onSelect)
                            _this.props.onSelect();
                    }, onResize: function (e, direction, ref, d) {
                        e.stopPropagation();
                        _this.onResize(e, direction, ref, d);
                    }, onResizeStop: function (e) {
                        e.stopPropagation();
                    }, handleStyles: this.props.selected ? {
                        top: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)' }),
                        left: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)' }),
                        right: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)' }),
                        bottom: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)' }),
                        topLeft: tslib_1.__assign({ top: -5, left: -5 }, resizeHandleStyle),
                        topRight: tslib_1.__assign({ top: -5, right: -5 }, resizeHandleStyle),
                        bottomLeft: tslib_1.__assign({ bottom: -5, left: -5 }, resizeHandleStyle),
                        bottomRight: tslib_1.__assign({ bottom: -5, right: -5 }, resizeHandleStyle)
                    } : undefined, handleWrapperStyle: this.props.selected ? {
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px',
                        top: '-100%'
                    } : undefined }, this.renderStaticContent()))));
    };
    return NodeComponent;
}(Component));
export default NodeComponent;
