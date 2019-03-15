import * as tslib_1 from "tslib";
import { Immutable } from './Immutable';
/**
 * Abstract class defining the attributes of a sizeable object.
 */
var Sizeable = /** @class */ (function (_super) {
    tslib_1.__extends(Sizeable, _super);
    function Sizeable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the x position.
     */
    Sizeable.prototype.getXPos = function () {
        return this.getPosition().x;
    };
    /**
     * Returns the y position.
     */
    Sizeable.prototype.getYPos = function () {
        return this.getPosition().y;
    };
    /**
     * Calculates the position of a sizeable based on the positions of child sizeables.
     * @param children The children to include in the position.
     */
    Sizeable.prototype.calculatePosition = function (children) {
        // Get the min x and y values
        var minX = children[0].getXPos();
        var minY = children[0].getYPos();
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child.getXPos() < minX) {
                minX = child.getXPos();
            }
            if (child.getYPos() < minY) {
                minY = child.getYPos();
            }
        }
        return {
            x: minX,
            y: minY
        };
    };
    /**
     * Calculates the height of a sizeable based on the heights and positions of child sizeables.
     * @param children The children to include in the height.
     */
    Sizeable.prototype.calculateHeight = function (children) {
        // Find the maximum y positions of the children
        var maxY = children[0].getYPos() + children[0].getHeight();
        for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
            var child = children_2[_i];
            if (child.getYPos() + child.getHeight() > maxY) {
                maxY = child.getYPos() + child.getHeight();
            }
        }
        // Return the max y minus the min y
        return maxY - this.getYPos();
    };
    /**
     * Calculates the width of a sizeable based on the widths and positions of child sizeables.
     * @param children The children to include in the width.
     */
    Sizeable.prototype.calculateWidth = function (children) {
        // Find the maximum x positions of the children
        var maxX = children[0].getXPos() + children[0].getWidth();
        for (var _i = 0, children_3 = children; _i < children_3.length; _i++) {
            var child = children_3[_i];
            if (child.getXPos() + child.getWidth() > maxX) {
                maxX = child.getXPos() + child.getWidth();
            }
        }
        // Return the max y minus the min y
        return maxX - this.getXPos();
    };
    /**
     * Sets the position of each of the children based on the sizeable's new position.
     * @param children The children to update.
     * @param position The new position of the sizeable.
     */
    Sizeable.prototype.setChildPositions = function (children, position) {
        var newChildren = [];
        // Update each of the children
        var deltaX = position.x - this.getXPos();
        var deltaY = position.y - this.getYPos();
        for (var _i = 0, children_4 = children; _i < children_4.length; _i++) {
            var child = children_4[_i];
            newChildren.push(child.setPosition({
                x: child.getXPos() + deltaX,
                y: child.getYPos() + deltaY
            }));
        }
        return newChildren;
    };
    /**
     * Sets the height of each of the children based on the sizeable's new height.
     * @param children The children to update.
     * @param height The new height of the sizeable.
     */
    Sizeable.prototype.setChildHeights = function (children, height) {
        var newChildren = [];
        // Update each of the children
        for (var _i = 0, children_5 = children; _i < children_5.length; _i++) {
            var child = children_5[_i];
            // Calculate the height ratio
            var heightRatio = child.getHeight() / this.getHeight();
            // Calculate the y position ratio relative to the sizeable's position
            var relY = child.getYPos() - this.getYPos();
            // Calculate the ratio of the relative position to the actual height of the sizeable
            var yRatio = relY / this.getHeight();
            // Update the values based on the ratio
            var newNode = child.setHeight(height * heightRatio);
            // Set the position of each child
            newChildren.push(newNode.setPosition({
                x: child.getXPos(),
                y: this.getYPos() + (yRatio * height)
            }));
        }
        return newChildren;
    };
    /**
     * Sets the width of each of the children based on the sizeable's new width.
     * @param children The children to update.
     * @param width The new width of the sizeable.
     */
    Sizeable.prototype.setChildWidths = function (children, width) {
        var newChildren = [];
        // Update each of the children
        for (var _i = 0, children_6 = children; _i < children_6.length; _i++) {
            var child = children_6[_i];
            // Calculate the width ratio
            var widthRatio = child.getWidth() / this.getWidth();
            // Calculate the x position ratio relative to the sizeable's position
            var relX = child.getXPos() - this.getXPos();
            // Calculate the ratio of the relative position to the actual width of the sizeable
            var xRatio = relX / this.getWidth();
            // Update the values based on the ratio
            var newNode = child.setWidth(width * widthRatio);
            // Set the position of each child
            newChildren.push(newNode.setPosition({
                x: this.getXPos() + (xRatio * width),
                y: child.getYPos()
            }));
        }
        return newChildren;
    };
    return Sizeable;
}(Immutable));
export { Sizeable };
