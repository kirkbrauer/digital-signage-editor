"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var immutable_1 = require("../model/immutable");
var ResizeDirection;
(function (ResizeDirection) {
    ResizeDirection["TOP"] = "TOP";
    ResizeDirection["RIGHT"] = "RIGHT";
    ResizeDirection["BOTTOM"] = "BOTTOM";
    ResizeDirection["LEFT"] = "LEFT";
    ResizeDirection["TOP_RIGHT"] = "TOP_RIGHT";
    ResizeDirection["TOP_LEFT"] = "TOP_LEFT";
    ResizeDirection["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
    ResizeDirection["BOTTOM_LEFT"] = "BOTTOM_LEFT";
})(ResizeDirection = exports.ResizeDirection || (exports.ResizeDirection = {}));
var Transformer = /** @class */ (function (_super) {
    tslib_1.__extends(Transformer, _super);
    function Transformer(props) {
        var _this = _super.call(this, props) || this;
        _this.mouseDown = false;
        _this.dragging = false;
        _this.resizing = false;
        _this.rotating = false;
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
    /**
     * Returns the center position of the transformer.
     */
    Transformer.prototype.getCenterPosition = function () {
        return new immutable_1.Vector({
            x: this.props.position.x + this.props.size.width / 2,
            y: this.props.position.y + this.props.size.height / 2,
        });
    };
    /**
     * Returns the angle based on the cursor start position and the end position.
     * @param pos1 The start position of the cursor.
     * @param pos2 The end position of the cursor.
     */
    Transformer.prototype.calculateAngle = function (pos1, pos2) {
        var dot = pos1.x * pos1.x + pos1.y * pos2.y;
        var det = pos1.x * pos1.y - pos1.y * pos2.x;
        // Convert the angle into degrees
        var angle = Math.atan2(det, dot) / Math.PI * 180;
        // Return the normalized angle
        return (angle + 360) % 360;
    };
    Transformer.prototype.calculatePosition = function (cursorPos, initialPos, cursorStartPos) {
        var deltaX = cursorPos.x - cursorStartPos.x;
        var deltaY = cursorPos.y - cursorStartPos.y;
        return new immutable_1.Vector({
            x: initialPos.x + deltaX,
            y: initialPos.y + deltaY
        });
    };
    Transformer.prototype.calculateSize = function (cursorPos, initialSize, cursorStartPos, dir) {
        // Calculate the deltas of the cursor position
        var deltaX = cursorPos.x - cursorStartPos.x;
        var deltaY = cursorPos.y - cursorStartPos.y;
        switch (dir) {
            case ResizeDirection.TOP_LEFT: {
                return new immutable_1.Size({
                    width: initialSize.width - deltaX,
                    height: initialSize.height - deltaY
                });
            }
            case ResizeDirection.TOP: {
                return new immutable_1.Size({
                    width: initialSize.width,
                    height: initialSize.height - deltaY
                });
            }
            case ResizeDirection.TOP_RIGHT: {
                return new immutable_1.Size({
                    width: initialSize.width + deltaX,
                    height: initialSize.height - deltaY
                });
            }
            case ResizeDirection.RIGHT: {
                return new immutable_1.Size({
                    width: initialSize.width + deltaX,
                    height: initialSize.height
                });
            }
            case ResizeDirection.BOTTOM_RIGHT: {
                return new immutable_1.Size({
                    width: initialSize.width + deltaX,
                    height: initialSize.height + deltaY
                });
            }
            case ResizeDirection.BOTTOM: {
                return new immutable_1.Size({
                    width: initialSize.width,
                    height: initialSize.height + deltaY
                });
            }
            case ResizeDirection.BOTTOM_LEFT: {
                return new immutable_1.Size({
                    width: initialSize.width - deltaX,
                    height: initialSize.height + deltaY
                });
            }
            case ResizeDirection.LEFT: {
                return new immutable_1.Size({
                    width: initialSize.width - deltaX,
                    height: initialSize.height
                });
            }
            default: {
                return new immutable_1.Size({
                    width: initialSize.width,
                    height: initialSize.height
                });
            }
        }
    };
    Transformer.prototype.calculateResizePos = function (cursorPos, initialPos, cursorStartPos, dir) {
        switch (dir) {
            case ResizeDirection.TOP_LEFT: {
                return this.calculatePosition(cursorPos, initialPos, cursorStartPos);
            }
            case ResizeDirection.TOP: {
                return this.calculatePosition(new immutable_1.Vector({ x: cursorStartPos.x, y: cursorPos.y }), initialPos, cursorStartPos);
            }
            case ResizeDirection.TOP_RIGHT: {
                return this.calculatePosition(new immutable_1.Vector({ x: cursorStartPos.x, y: cursorPos.y }), initialPos, cursorStartPos);
            }
            case ResizeDirection.BOTTOM_LEFT: {
                return this.calculatePosition(new immutable_1.Vector({ x: cursorPos.x, y: cursorStartPos.y }), initialPos, cursorStartPos);
            }
            case ResizeDirection.LEFT: {
                return this.calculatePosition(new immutable_1.Vector({ x: cursorPos.x, y: cursorStartPos.y }), initialPos, cursorStartPos);
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
        var initialPos = new immutable_1.Vector({
            x: this.props.position.x,
            y: this.props.position.y
        });
        // Set the start position of the cursor
        var cursorStartPos = new immutable_1.Vector({
            x: e.screenX,
            y: e.screenY
        });
        // Call onDragStart callback
        this.props.onDragStart && this.props.onDragStart(e.nativeEvent, initialPos);
        // Calculates the position by adding the cursor delta to the initial position
        var onMouseMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Make sure that the mouse is down
            if (!_this.mouseDown)
                return;
            // Trigger the on drag start if dragging hasn't started
            if (!_this.dragging) {
                _this.dragging = true;
            }
            // Calculate the new position
            var newPos = _this.calculatePosition(new immutable_1.Vector({ x: e.screenX, y: e.screenY }), initialPos, cursorStartPos);
            // Update the temporary state
            _this.setState({
                tempPos: new immutable_1.Vector({
                    x: newPos.x > 0 ? newPos.x : 0,
                    y: newPos.y > 0 ? newPos.y : 0
                })
            });
            // Call the onDrag callback
            _this.props.onDrag && _this.props.onDrag(e, newPos);
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
        var cursorStartPos = new immutable_1.Vector({
            x: e.screenX,
            y: e.screenY
        });
        // Set the initial position of the transformer
        var initialPos = new immutable_1.Vector({
            x: this.props.position.x,
            y: this.props.position.y
        });
        // Set the initial size of the transformer
        var initialSize = new immutable_1.Size({
            width: this.props.size.width,
            height: this.props.size.height
        });
        // Call onResizeStart callback
        this.props.onResizeStart && this.props.onResizeStart(e.nativeEvent, initialSize, initialPos, dir);
        var onMouseMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Make sure that the mouse is down
            if (!_this.mouseDown)
                return;
            // Trigger the on drag start if dragging hasn't started
            if (!_this.resizing) {
                _this.resizing = true;
            }
            // Calculate the new size
            var newSize = _this.calculateSize(new immutable_1.Vector({ x: e.screenX, y: e.screenY }), initialSize, cursorStartPos, dir);
            // Calculate the new position
            var newPos = _this.calculateResizePos(new immutable_1.Vector({ x: e.screenX, y: e.screenY }), initialPos, cursorStartPos, dir);
            // Update the temporary state
            _this.setState({
                tempSize: new immutable_1.Size({
                    width: newSize.width > 20 ? newSize.width : 20,
                    height: newSize.height > 20 ? newSize.height : 20
                }),
                tempPos: new immutable_1.Vector({
                    x: newPos.x > 0 ? newPos.x : 0,
                    y: newPos.y > 0 ? newPos.y : 0
                })
            });
            // Call the onResize callback
            _this.props.onResize && _this.props.onResize(e, newSize, newPos, dir);
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
    Transformer.prototype.onStartRotate = function (e) {
        var _this = this;
        // Only activate on left click drag
        if (e.button !== 0)
            return;
        // Stop event propagation
        e.stopPropagation();
        e.preventDefault();
        this.mouseDown = true;
        // Calculate the center position
        var center = this.getCenterPosition();
        // Create a start position
        var start = new immutable_1.Vector({
            x: e.clientX - center.x,
            y: e.clientY - center.y
        });
        var initialRotation = this.props.rotation;
        // Call the onRotateStart
        this.props.onRotateStart && this.props.onRotateStart(e.nativeEvent, this.props.rotation);
        var onMouseMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Make sure that the mouse is down
            if (!_this.mouseDown)
                return;
            // Trigger the on drag start if dragging hasn't started
            if (!_this.rotating) {
                _this.rotating = true;
            }
            // Create a rotation vector
            var rotate = new immutable_1.Vector({
                x: e.clientX - center.x,
                y: e.clientY - center.y
            });
            // Calculate the new angle
            var angle = ((_this.calculateAngle(start, rotate) + initialRotation) + 360) % 360;
            // Update the temporary state
            _this.setState({
                tempRotation: angle
            });
            // Call the onRotate callback
            _this.props.onRotate && _this.props.onRotate(e, angle);
        };
        var onMouseUp = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Remove the event listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            // Return if the mouse isn't down
            if (!_this.mouseDown || !_this.rotating)
                return;
            _this.rotating = false;
            // Call the onRotateStop callback
            _this.props.onRotateStop && _this.props.onRotateStop(e, _this.state.tempRotation || initialRotation);
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
        return (react_1.default.createElement("div", { style: {
                cursor: !this.props.disabled ? 'move' : undefined,
                transform: "translate(" + (this.state.tempPos ? this.state.tempPos.x : position.x) + "px, " + (this.state.tempPos ? this.state.tempPos.y : position.y) + "px) rotate(" + (this.state.tempRotation || rotation) + "deg)",
                height: this.state.tempSize ? this.state.tempSize.height : size.height,
                width: this.state.tempSize ? this.state.tempSize.width : size.width,
                transformOrigin: 'top left',
                position: 'absolute'
            }, onMouseDown: function (e) {
                !_this.props.disableDrag && _this.onStartDrag(e);
            }, onClick: function (e) { _this.props.onClick && _this.props.onClick(e); } },
            this.props.children,
            !this.props.disabled && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        height: '100%',
                        width: '100%',
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        boxShadow: 'blue 0 0 0 1px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
                    } }),
                !this.props.disableRotation && (react_1.default.createElement("div", { style: {
                        top: -25,
                        position: 'absolute',
                        left: 'calc(50% - 4.5px)'
                    } },
                    react_1.default.createElement("div", { id: "rotate-line", style: {
                            height: 20,
                            width: 0,
                            top: 2,
                            transform: 'translateX(4.5px)',
                            position: 'absolute',
                            boxShadow: 'blue 0 0 0 0.5px, rgba(0, 0, 255, 0.8) 0 0 1px 1px, rgba(0, 0, 255, 0.8) inset 0 0 1px 1px'
                        } }),
                    react_1.default.createElement("div", { id: "rotate", style: tslib_1.__assign({}, resizeHandleStyle, { cursor: 'crosshair', top: 0, left: 0 }), onMouseDown: function (e) { return _this.onStartRotate(e); } }))),
                !this.props.disableResize && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { id: "top-left", style: tslib_1.__assign({}, resizeHandleStyle, { top: -5, left: -5, cursor: 'nw-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.TOP_LEFT); } }),
                    react_1.default.createElement("div", { id: "top", style: tslib_1.__assign({}, resizeHandleStyle, { top: -5, left: 'calc(50% - 4.5px)', cursor: 'n-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.TOP); } }),
                    react_1.default.createElement("div", { id: "top-right", style: tslib_1.__assign({}, resizeHandleStyle, { top: -5, right: -5, cursor: 'ne-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.TOP_RIGHT); } }),
                    react_1.default.createElement("div", { id: "right", style: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)', right: -5, cursor: 'e-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.RIGHT); } }),
                    react_1.default.createElement("div", { id: "bottom-right", style: tslib_1.__assign({}, resizeHandleStyle, { bottom: -5, right: -5, cursor: 'se-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.BOTTOM_RIGHT); } }),
                    react_1.default.createElement("div", { id: "bottom", style: tslib_1.__assign({}, resizeHandleStyle, { left: 'calc(50% - 4.5px)', bottom: -5, cursor: 's-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.BOTTOM); } }),
                    react_1.default.createElement("div", { id: "bottom-left", style: tslib_1.__assign({}, resizeHandleStyle, { bottom: -5, left: -5, cursor: 'sw-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.BOTTOM_LEFT); } }),
                    react_1.default.createElement("div", { id: "left", style: tslib_1.__assign({}, resizeHandleStyle, { top: 'calc(50% - 4.5px)', left: -5, cursor: 'w-resize' }), onMouseDown: function (e) { return _this.onStartResize(e, ResizeDirection.LEFT); } })))))));
    };
    return Transformer;
}(react_1.Component));
exports.default = Transformer;
