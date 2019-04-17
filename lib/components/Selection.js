"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var immutable_1 = require("../model/immutable");
var Transformer_1 = tslib_1.__importDefault(require("./Transformer"));
var Selection = /** @class */ (function (_super) {
    tslib_1.__extends(Selection, _super);
    function Selection(props) {
        var _this = _super.call(this, props) || this;
        var position = immutable_1.Sizeable.calculatePosition(props.nodes);
        var size = immutable_1.Sizeable.calculateSize(props.nodes);
        _this.state = {
            position: position,
            size: size
        };
        return _this;
    }
    Selection.prototype.componentWillReceiveProps = function (props) {
        var position = immutable_1.Sizeable.calculatePosition(props.nodes);
        var size = immutable_1.Sizeable.calculateSize(props.nodes);
        this.setState({ position: position, size: size });
    };
    Selection.prototype.onDrag = function (position) {
        this.setState({ position: position });
        if (this.props.onChange) {
            this.props.onChange(immutable_1.Sizeable.setSizeablePositions(this.props.nodes, position));
        }
    };
    Selection.prototype.onResize = function (size, position) {
        this.setState({ size: size, position: position });
        if (this.props.onChange) {
            /*const oldX = Sizeable.calculateX(this.props.nodes);
            const oldY = Sizeable.calculateY(this.props.nodes);
            const oldWidth = Sizeable.calculateWidth(this.props.nodes, oldX);
            const oldHeight = Sizeable.calculateHeight(this.props.nodes, oldY);*/
            this.props.onChange(immutable_1.Sizeable.setSizeableSizes(immutable_1.Sizeable.setSizeablePositions(this.props.nodes, position), size));
        }
    };
    Selection.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(Transformer_1.default, { position: this.state.position, size: this.state.size, rotation: 0, disableRotation: true, onDrag: function (e, pos) { return _this.onDrag(pos); }, onResize: function (e, size, pos) { return _this.onResize(size, pos); } }));
    };
    return Selection;
}(react_1.Component));
exports.default = Selection;
