import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Resizable from 're-resizable';
import Draggable from 'react-draggable';
import { Sizeable } from '../model/immutable';
var Selection = /** @class */ (function (_super) {
    tslib_1.__extends(Selection, _super);
    function Selection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selection.prototype.onDrag = function (e, data) {
        if (this.props.onChange) {
            var oldX = Sizeable.calculateX(this.props.nodes);
            var oldY = Sizeable.calculateY(this.props.nodes);
            this.props.onChange(Sizeable.setSizeableXPositions(Sizeable.setSizeableYPositions(this.props.nodes, oldY, data.y), oldX, data.x));
        }
    };
    Selection.prototype.onResize = function (e, dir, ref, delta) {
        if (this.props.onChange) {
            var oldX = Sizeable.calculateX(this.props.nodes);
            var oldY = Sizeable.calculateY(this.props.nodes);
            var oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
            var oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);
            var newNodes = this.props.nodes;
            // Calculate the position delta since the last resize
            var deltaX = ref.clientWidth - oldWidth;
            var deltaY = ref.clientHeight - oldHeight;
            // Calculate the new positions
            var xPos = oldX - deltaX;
            var yPos = oldY - deltaY;
            // Set the new position based on resize direction
            if (dir === 'top' || dir === 'left' || dir === 'topLeft') {
                newNodes = Sizeable.setSizeableXPositions(Sizeable.setSizeableYPositions(this.props.nodes, oldY, yPos), oldX, xPos);
                // Set the widths and heights of the selected nodes
                newNodes = Sizeable.setSizeableWidths(newNodes, xPos, oldWidth, ref.clientWidth);
                newNodes = Sizeable.setSizeableHeights(newNodes, yPos, oldHeight, ref.clientHeight);
            }
            else if (dir === 'topRight') {
                newNodes = Sizeable.setSizeableYPositions(this.props.nodes, oldY, yPos);
                // Set the widths and heights of the selected nodes
                newNodes = Sizeable.setSizeableWidths(newNodes, oldX, oldWidth, ref.clientWidth);
                newNodes = Sizeable.setSizeableHeights(newNodes, yPos, oldHeight, ref.clientHeight);
            }
            else if (dir === 'bottomLeft') {
                newNodes = Sizeable.setSizeableXPositions(this.props.nodes, oldX, xPos);
                // Set the widths and heights of the selected nodes
                newNodes = Sizeable.setSizeableWidths(newNodes, xPos, oldWidth, ref.clientWidth);
                newNodes = Sizeable.setSizeableHeights(newNodes, oldY, oldHeight, ref.clientHeight);
            }
            else {
                // Set the widths and heights of the selected nodes
                newNodes = Sizeable.setSizeableWidths(newNodes, oldX, oldWidth, ref.clientWidth);
                newNodes = Sizeable.setSizeableHeights(newNodes, oldY, oldHeight, ref.clientHeight);
            }
            this.props.onChange(newNodes);
        }
    };
    Selection.prototype.render = function () {
        var _this = this;
        var nodes = this.props.nodes;
        var xPos = Sizeable.calculateX(nodes);
        var yPos = Sizeable.calculateY(nodes);
        var width = Sizeable.calculateWidth(nodes, xPos);
        var height = Sizeable.calculateHeight(nodes, yPos);
        var resizeHandleStyle = {
            height: 9,
            width: 9,
            backgroundColor: 'blue',
            borderRadius: '50%',
            boxShadow: '0 0 0 1px white'
        };
        return (React.createElement("div", { style: { cursor: 'move' } },
            React.createElement(Draggable, { position: {
                    x: xPos,
                    y: yPos
                }, onDrag: function (e, data) {
                    e.stopPropagation();
                    _this.onDrag(e, data);
                }, onStop: function (e) {
                    e.stopPropagation();
                } },
                React.createElement(Resizable, { style: {
                        position: 'absolute'
                    }, size: { width: width, height: height }, enable: {
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true
                    }, onResizeStart: function (e) {
                        e.stopPropagation();
                    }, onResize: function (e, direction, ref, d) {
                        e.stopPropagation();
                        _this.onResize(e, direction, ref, d);
                    }, onResizeStop: function (e) {
                        e.stopPropagation();
                    }, handleStyles: {
                        top: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)' }),
                        left: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)' }),
                        right: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)' }),
                        bottom: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)' }),
                        topLeft: tslib_1.__assign({ top: -5, left: -5 }, resizeHandleStyle),
                        topRight: tslib_1.__assign({ top: -5, right: -5 }, resizeHandleStyle),
                        bottomLeft: tslib_1.__assign({ bottom: -5, left: -5 }, resizeHandleStyle),
                        bottomRight: tslib_1.__assign({ bottom: -5, right: -5 }, resizeHandleStyle)
                    }, handleWrapperStyle: {
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
                    } }))));
    };
    return Selection;
}(Component));
export default Selection;
