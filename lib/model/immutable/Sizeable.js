"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BoundingBox_1 = require("./BoundingBox");
var __1 = require("../");
/**
 * Defines a record whose size and position can be determined.
 */
var Sizeable = /** @class */ (function () {
    function Sizeable() {
    }
    /**
     * Calculates the position of a list of sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    Sizeable.calculatePosition = function (sizeables) {
        var e_1, _a;
        // Return an empty Vector if the list is empty
        if (sizeables.isEmpty())
            return new __1.Vector();
        // Get the position of the first sizeable
        var sizeableZeroPos = sizeables.get(0).getPosition();
        // Get the initial values
        var minX = sizeableZeroPos.x;
        var minY = sizeableZeroPos.y;
        try {
            for (var sizeables_1 = tslib_1.__values(sizeables), sizeables_1_1 = sizeables_1.next(); !sizeables_1_1.done; sizeables_1_1 = sizeables_1.next()) {
                var sizeable = sizeables_1_1.value;
                var boundingBox = sizeable.getBoundingBox();
                if (boundingBox.position.x < minX) {
                    minX = boundingBox.position.x;
                }
                if (boundingBox.position.y < minY) {
                    minY = boundingBox.position.y;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sizeables_1_1 && !sizeables_1_1.done && (_a = sizeables_1.return)) _a.call(sizeables_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new __1.Vector({
            x: minX,
            y: minY
        });
    };
    /**
     * Calculates the size of a list of sizeables.
     * @param sizeables The sizeables to base the size calculation.
     */
    Sizeable.calculateSize = function (sizeables) {
        var e_2, _a;
        // Return an empty Size if the list is empty
        if (sizeables.isEmpty())
            return new __1.Size();
        // Find the maximum x and y positions of the sizeables
        var sizeableZeroBoundingBox = sizeables.get(0).getBoundingBox();
        // Get the maximum bounding box points
        var maxX = sizeableZeroBoundingBox.getMaxX();
        var maxY = sizeableZeroBoundingBox.getMaxY();
        // Calculate the minumum position
        var minPos = Sizeable.calculatePosition(sizeables);
        try {
            // Find the max and min points
            for (var sizeables_2 = tslib_1.__values(sizeables), sizeables_2_1 = sizeables_2.next(); !sizeables_2_1.done; sizeables_2_1 = sizeables_2.next()) {
                var sizeable = sizeables_2_1.value;
                var boundingBox = sizeable.getBoundingBox();
                if (boundingBox.getMaxX() > maxX) {
                    maxX = boundingBox.getMaxX();
                }
                if (boundingBox.getMaxY() > maxY) {
                    maxY = boundingBox.getMaxY();
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (sizeables_2_1 && !sizeables_2_1.done && (_a = sizeables_2.return)) _a.call(sizeables_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // Return the max minus the min
        return new __1.Size({
            width: maxX - minPos.x,
            height: maxY - minPos.y
        });
    };
    /**
     * Calculates the bounding box of a sizeable.
     * @param sizeables The sizeables to base the bounding box calculation.
     */
    Sizeable.calculateBoundingBox = function (sizeables) {
        return new BoundingBox_1.BoundingBox({
            position: Sizeable.calculatePosition(sizeables),
            size: Sizeable.calculateSize(sizeables)
        });
    };
    /**
     * Sets the positions of a list of sizeables inside a prent sizeable.
     * @param sizeables The list of sizeables to update.
     * @param position The new position of the parent.
     */
    Sizeable.setSizeablePositions = function (sizeables, position) {
        // Calculate the parent sizeable position
        var parentPosition = Sizeable.calculatePosition(sizeables);
        return sizeables.map(function (sizeable) {
            var sizeablePosition = sizeable.getPosition();
            // Calculate the offset between the sizeable position and the sizeable position
            var offsetX = sizeablePosition.x - parentPosition.x;
            var offsetY = sizeablePosition.y - parentPosition.y;
            // Set the sizeable position to the new position + the offset
            return sizeable.setPosition(new __1.Vector({
                x: position.x + offsetX,
                y: position.y + offsetY
            }));
        });
    };
    /**
     * Sets the sizes of sizeables based on the computed side of the parent sizeable.
     * @param sizeables A list of sizeables to update
     * @param parentPosition The position of the parent sizeable.
     * @param parentSize The size of the parent sizeable.
     * @param size The new size of the parent sizeable.
     */
    Sizeable.setSizeableSizes = function (sizeables, size) {
        var parentSize = Sizeable.calculateSize(sizeables);
        var parentPosition = Sizeable.calculatePosition(sizeables);
        return sizeables.map(function (sizeable) {
            var sizeableSize = sizeable.getSize();
            var sizeablePos = sizeable.getPosition();
            // Calculate the ratio of the height of the sizeable to the sizeable's height
            var widthRatio = sizeableSize.width / parentSize.width;
            var heightRatio = sizeableSize.height / parentSize.height;
            // Calculate the offset between the sizeable's position and the sizeable's position
            var offsetX = sizeablePos.x - parentPosition.x;
            var offsetY = sizeablePos.y - parentPosition.y;
            // Calculate the ratio of the offset to the actual height of the sizeable
            var xPosRatio = offsetX / parentSize.width;
            var yPosRatio = offsetY / parentSize.height;
            // Set the position and size of the sizeable
            return sizeable.setPosition(new __1.Vector({
                x: parentPosition.x + (xPosRatio * size.width),
                y: parentPosition.y + (yPosRatio * size.height)
            })).setSize(new __1.Size({
                width: widthRatio * size.width,
                height: heightRatio * size.height
            }));
        });
    };
    return Sizeable;
}());
exports.Sizeable = Sizeable;
