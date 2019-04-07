import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Sizeable } from '../model/immutable';
import Transformer from './Transformer';
var Selection = /** @class */ (function (_super) {
    tslib_1.__extends(Selection, _super);
    function Selection(props) {
        var _this = _super.call(this, props) || this;
        var position = {
            x: Sizeable.calculateX(props.nodes),
            y: Sizeable.calculateY(props.nodes)
        };
        var size = {
            width: Sizeable.calculateWidth(props.nodes, position.x),
            height: Sizeable.calculateHeight(props.nodes, position.y)
        };
        _this.state = {
            position: position,
            size: size
        };
        return _this;
    }
    Selection.prototype.componentWillReceiveProps = function (props) {
        var position = {
            x: Sizeable.calculateX(props.nodes),
            y: Sizeable.calculateY(props.nodes)
        };
        var size = {
            width: Sizeable.calculateWidth(props.nodes, position.x),
            height: Sizeable.calculateHeight(props.nodes, position.y)
        };
        this.setState({ position: position, size: size });
    };
    Selection.prototype.onDrag = function (position) {
        this.setState({ position: position });
        if (this.props.onChange) {
            var oldX = Sizeable.calculateX(this.props.nodes);
            var oldY = Sizeable.calculateY(this.props.nodes);
            this.props.onChange(Sizeable.setSizeableXPositions(Sizeable.setSizeableYPositions(this.props.nodes, oldY, position.y), oldX, position.x));
        }
    };
    Selection.prototype.onResize = function (size, position) {
        this.setState({ size: size, position: position });
        if (this.props.onChange) {
            var oldX = Sizeable.calculateX(this.props.nodes);
            var oldY = Sizeable.calculateY(this.props.nodes);
            var oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
            var oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);
            this.props.onChange(Sizeable.setSizeableWidths(Sizeable.setSizeableHeights(Sizeable.setSizeableXPositions(Sizeable.setSizeableYPositions(this.props.nodes, oldY, position.y), oldX, position.x), oldY, oldHeight, size.height), oldX, oldWidth, size.width));
        }
    };
    Selection.prototype.render = function () {
        var _this = this;
        return (React.createElement(Transformer, { position: this.state.position, size: this.state.size, rotation: 0, onDrag: function (e, pos) { return _this.onDrag(pos); }, onResize: function (e, size, pos) { return _this.onResize(size, pos); } }));
    };
    return Selection;
}(Component));
export default Selection;
