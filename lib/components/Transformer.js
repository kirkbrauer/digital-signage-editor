import * as tslib_1 from "tslib";
import React, { Component } from 'react';
export var ResizeDirection;
(function (ResizeDirection) {
    ResizeDirection["TOP"] = "TOP";
    ResizeDirection["RIGHT"] = "RIGHT";
    ResizeDirection["BOTTOM"] = "BOTTOM";
    ResizeDirection["LEFT"] = "LEFT";
    ResizeDirection["TOP_RIGHT"] = "TOP_RIGHT";
    ResizeDirection["TOP_LEFT"] = "TOP_LEFT";
    ResizeDirection["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
    ResizeDirection["BOTTOM_LEFT"] = "BOTTOM_LEFT";
})(ResizeDirection || (ResizeDirection = {}));
var Transformer = /** @class */ (function (_super) {
    tslib_1.__extends(Transformer, _super);
    function Transformer(props) {
        var _this = _super.call(this, props) || this;
        _this.mouseDown = false;
        _this.dragging = false;
        _this.resizing = false;
        _this.state = {
            tempPos: null,
            tempSize: null,
            tempRotation: null
        };
        return _this;
    }
    Transformer.prototype.componentWillReceiveProps = function () {
        // Rest the temporary state if new props come along
        this.setState({
            tempPos: null,
            tempSize: null,
            tempRotation: null
        });
    };
    Transformer.prototype.calculatePosition = function (cursorPos, initialPos, cursorStartPos) {
        var deltaX = cursorPos.x - cursorStartPos.x;
        var deltaY = cursorPos.y - cursorStartPos.y;
        return {
            x: initialPos.x + deltaX,
            y: initialPos.y + deltaY
        };
    };
    Transformer.prototype.calculateSize = function (cursorPos, initialSize, cursorStartPos, dir) {
        // Calculate the deltas of the cursor position
        var deltaX = cursorPos.x - cursorStartPos.x;
        var deltaY = cursorPos.y - cursorStartPos.y;
        switch (dir) {
            case ResizeDirection.TOP_LEFT: {
                return {
                    width: initialSize.width - deltaX,
                    height: initialSize.height - deltaY
                };
            }
            case ResizeDirection.TOP: {
                return {
                    width: initialSize.width,
                    height: initialSize.height - deltaY
                };
            }
            case ResizeDirection.TOP_RIGHT: {
                return {
                    width: initialSize.width + deltaX,
                    height: initialSize.height - deltaY
                };
            }
            case ResizeDirection.RIGHT: {
                return {
                    width: initialSize.width + deltaX,
                    height: initialSize.height
                };
            }
            case ResizeDirection.BOTTOM_RIGHT: {
                return {
                    width: initialSize.width + deltaX,
                    height: initialSize.height + deltaY
                };
            }
            case ResizeDirection.BOTTOM: {
                return {
                    width: initialSize.width,
                    height: initialSize.height + deltaY
                };
            }
            case ResizeDirection.BOTTOM_LEFT: {
                return {
                    width: initialSize.width - deltaX,
                    height: initialSize.height + deltaY
                };
            }
            case ResizeDirection.LEFT: {
                return {
                    width: initialSize.width - deltaX,
                    height: initialSize.height
                };
            }
            default: {
                return {
                    width: initialSize.width,
                    height: initialSize.height
                };
            }
        }
    };
    Transformer.prototype.calculateResizePos = function (cursorPos, initialPos, cursorStartPos, dir) {
        switch (dir) {
            case ResizeDirection.TOP_LEFT: {
                return this.calculatePosition(cursorPos, initialPos, cursorStartPos);
            }
            case ResizeDirection.TOP: {
                return this.calculatePosition({ x: cursorStartPos.x, y: cursorPos.y }, initialPos, cursorStartPos);
            }
            case ResizeDirection.TOP_RIGHT: {
                return this.calculatePosition({ x: cursorStartPos.x, y: cursorPos.y }, initialPos, cursorStartPos);
            }
            case ResizeDirection.BOTTOM_LEFT: {
                return this.calculatePosition({ x: cursorPos.x, y: cursorStartPos.y }, initialPos, cursorStartPos);
            }
            case ResizeDirection.LEFT: {
                return this.calculatePosition({ x: cursorPos.x, y: cursorStartPos.y }, initialPos, cursorStartPos);
            }
            default: return initialPos;
        }
    };
    Transformer.prototype.onStartDrag = function (e) {
        var _this = this;
        // Stop event propagation
        e.stopPropagation();
        e.preventDefault();
        this.mouseDown = true;
        // Set the intial position of the transformer
        var initialPos = {
            x: this.props.position.x,
            y: this.props.position.y
        };
        // Set the start position of the cursor
        var cursorStartPos = {
            x: e.screenX,
            y: e.screenY
        };
        // Calculates the position by adding the cursor delta to the initial position
        var onMouseMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Make sure that the mouse is down
            if (!_this.mouseDown)
                return;
            // Trigger the on drag start if dragging hasn't started
            if (!_this.dragging) {
                _this.props.onDragStart && _this.props.onDragStart(e, initialPos);
                _this.dragging = true;
            }
            // Calculate the new position
            var newPosition = _this.calculatePosition({ x: e.screenX, y: e.screenY }, initialPos, cursorStartPos);
            // Update the temporary state
            _this.setState({ tempPos: newPosition });
            // Call the onDrag callback
            _this.props.onDrag && _this.props.onDrag(e, newPosition);
        };
        var onMouseUp = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Remove the event listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            // Return if the mouse isn't down
            if (!_this.mouseDown || !_this.dragging)
                return;
            _this.dragging = false;
            // Call the onDragStop callback
            _this.props.onDragStop && _this.props.onDragStop(e, _this.state.tempPos || initialPos);
        };
        // Add the drag event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    Transformer.prototype.onStartResize = function (e, dir) {
        var _this = this;
        // Stop event propagation
        e.stopPropagation();
        e.preventDefault();
        this.mouseDown = true;
        // Set the start position of the cursor
        var cursorStartPos = {
            x: e.screenX,
            y: e.screenY
        };
        // Set the initial position of the transformer
        var initialPos = {
            x: this.props.position.x,
            y: this.props.position.y
        };
        // Set the initial size of the transformer
        var initialSize = {
            width: this.props.size.width,
            height: this.props.size.height
        };
        var onMouseMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Make sure that the mouse is down
            if (!_this.mouseDown)
                return;
            // Trigger the on drag start if dragging hasn't started
            if (!_this.resizing) {
                _this.props.onResizeStart && _this.props.onResizeStart(e, initialSize, initialPos, dir);
                _this.resizing = true;
            }
            // Calculate the new size
            var newSize = _this.calculateSize({ x: e.screenX, y: e.screenY }, initialSize, cursorStartPos, dir);
            // Calculate the new position
            var newPos = _this.calculateResizePos({ x: e.screenX, y: e.screenY }, initialPos, cursorStartPos, dir);
            // Only allow updates if the size is above the minimum
            if (newSize.width > 20 && newSize.height > 20) {
                // Update the temporary state
                _this.setState({ tempSize: newSize, tempPos: newPos });
                // Call the onResize callback
                _this.props.onResize && _this.props.onResize(e, newSize, newPos, dir);
            }
        };
        var onMouseUp = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Remove the event listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            // Return if the mouse isn't down
            if (!_this.mouseDown || !_this.resizing)
                return;
            _this.resizing = false;
            // Call the onResizeStop callback
            _this.props.onResizeStop && _this.props.onResizeStop(e, _this.state.tempSize || initialSize, _this.state.tempPos || initialPos, dir);
        };
        // Add the drag event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    Transformer.prototype.render = function () {
        var _this = this;
        var _a = this.props, position = _a.position, rotation = _a.rotation, size = _a.size;
        var resizeHandleStyle = {
            height: 9,
            width: 9,
            backgroundColor: 'blue',
            borderRadius: '50%',
            boxShadow: '0 0 0 1px white',
            position: 'absolute'
        };
        return (React.createElement("div", { style: {
                cursor: !this.props.disabled ? 'move' : undefined,
                transform: "translate(" + (this.state.tempPos ? this.state.tempPos.x : position.x) + "px, " + (this.state.tempPos ? this.state.tempPos.y : position.y) + "px) rotate(" + rotation + "deg)",
                height: this.state.tempSize ? this.state.tempSize.height : size.height,
                width: this.state.tempSize ? this.state.tempSize.width : size.width,
                transformOrigin: 'top left',
                position: 'absolute'
            }, onMouseDown: function (e) { return _this.onStartDrag(e); }, onClick: function (e) { _this.props.onClick && _this.props.onClick(e); } },
            this.props.children,
            !this.props.disabled && (React.createElement(React.Fragment, null,
                React.createElement("div", { style: {
                        height: '100%',
                        width: '100%',
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
                    } }),
                React.createElement("div", { id: "top-left", style: tslib_1.__assign({}, resizeHandleStyle, { top: -5, left: -5, cursor: 'nw-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.TOP_LEFT); } }),
                React.createElement("div", { id: "top", style: tslib_1.__assign({}, resizeHandleStyle, { top: -5, left: 'calc(50% - 4.5px)', cursor: 'n-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.TOP); } }),
                React.createElement("div", { id: "top-right", style: tslib_1.__assign({}, resizeHandleStyle, { top: -5, right: -5, cursor: 'ne-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.TOP_RIGHT); } }),
                React.createElement("div", { id: "right", style: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)', right: -5, cursor: 'e-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.RIGHT); } }),
                React.createElement("div", { id: "bottom-right", style: tslib_1.__assign({}, resizeHandleStyle, { bottom: -5, right: -5, cursor: 'se-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.BOTTOM_RIGHT); } }),
                React.createElement("div", { id: "bottom", style: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)', bottom: -5, cursor: 's-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.BOTTOM); } }),
                React.createElement("div", { id: "bottom-left", style: tslib_1.__assign({}, resizeHandleStyle, { bottom: -5, left: -5, cursor: 'sw-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.BOTTOM_LEFT); } }),
                React.createElement("div", { id: "left", style: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)', left: -5, cursor: 'w-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.LEFT); } })))));
    };
    return Transformer;
}(Component));
export default Transformer;
