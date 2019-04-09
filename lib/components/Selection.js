import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Sizeable } from '../model/immutable';
import Transformer from './Transformer';
var Selection = /** @class */ (function (_super) {
    tslib_1.__extends(Selection, _super);
    function Selection(props) {
        var _this = _super.call(this, props) || this;
        var position = Sizeable.calculatePosition(props.nodes);
        var size = Sizeable.calculateSize(props.nodes);
        _this.state = {
            position: position,
            size: size
        };
        return _this;
    }
    Selection.prototype.componentWillReceiveProps = function (props) {
        var position = Sizeable.calculatePosition(props.nodes);
        var size = Sizeable.calculateSize(props.nodes);
        this.setState({ position: position, size: size });
    };
    Selection.prototype.onDrag = function (position) {
        this.setState({ position: position });
        if (this.props.onChange) {
            this.props.onChange(Sizeable.setSizeablePositions(this.props.nodes, position));
        }
    };
    Selection.prototype.onResize = function (size, position) {
        this.setState({ size: size, position: position });
        if (this.props.onChange) {
            /*const oldX = Sizeable.calculateX(this.props.nodes);
            const oldY = Sizeable.calculateY(this.props.nodes);
            const oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
            const oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);*/
            this.props.onChange(Sizeable.setSizeableSizes(Sizeable.setSizeablePositions(this.props.nodes, position), size));
        }
    };
    Selection.prototype.render = function () {
        var _this = this;
        return (React.createElement(Transformer, { position: this.state.position, size: this.state.size, rotation: 0, disableRotation: true, onDrag: function (e, pos) { return _this.onDrag(pos); }, onResize: function (e, size, pos) { return _this.onResize(size, pos); } }));
    };
    return Selection;
}(Component));
export default Selection;
