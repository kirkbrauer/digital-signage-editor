import * as tslib_1 from "tslib";
import React from 'react';
import NodeComponent from './NodeComponent';
import Node from './Node';
var Group = /** @class */ (function (_super) {
    tslib_1.__extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.prototype.renderStaticContent = function () {
        var _this = this;
        return (React.createElement("div", { style: { width: '100%', height: '100%', position: 'relative' } }, this.props.node.nodes.map(function (node) { return (React.createElement(Node, { key: node.id, node: node, inGroup: true, groupPos: _this.props.node.getPosition() })); })));
    };
    return Group;
}(NodeComponent));
export default Group;
