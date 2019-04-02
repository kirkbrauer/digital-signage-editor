import * as tslib_1 from "tslib";
/**
 * Defines a record whose size and position can be determined.
 */
var Sizeable = /** @class */ (function () {
    function Sizeable() {
    }
    /**
     * Calculates the x position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    Sizeable.calculateX = function (sizeables) {
        var e_1, _a;
        // Get the min x values
        var minX = sizeables.get(0).getX();
        try {
            for (var sizeables_1 = tslib_1.__values(sizeables), sizeables_1_1 = sizeables_1.next(); !sizeables_1_1.done; sizeables_1_1 = sizeables_1.next()) {
                var sizeable = sizeables_1_1.value;
                if (sizeable.getX() < minX) {
                    minX = sizeable.getX();
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
        return minX;
    };
    /**
     * Calculates the y position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    Sizeable.calculateY = function (sizeables) {
        var e_2, _a;
        // Get the min y values
        var minY = sizeables.get(0).getY();
        try {
            for (var sizeables_2 = tslib_1.__values(sizeables), sizeables_2_1 = sizeables_2.next(); !sizeables_2_1.done; sizeables_2_1 = sizeables_2.next()) {
                var sizeable = sizeables_2_1.value;
                if (sizeable.getY() < minY) {
                    minY = sizeable.getY();
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
        return minY;
    };
    /**
     * Calculates the width of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     * @param parentX The x position of the parent sizeable.
     */
    Sizeable.calculateWidth = function (sizeables, parentX) {
        var e_3, _a;
        // Find the maximum x positions of the sizeables
        var maxX = sizeables.get(0).getX() + sizeables.get(0).getWidth();
        try {
            for (var sizeables_3 = tslib_1.__values(sizeables), sizeables_3_1 = sizeables_3.next(); !sizeables_3_1.done; sizeables_3_1 = sizeables_3.next()) {
                var sizeable = sizeables_3_1.value;
                if (sizeable.getX() + sizeable.getWidth() > maxX) {
                    maxX = sizeable.getX() + sizeable.getWidth();
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (sizeables_3_1 && !sizeables_3_1.done && (_a = sizeables_3.return)) _a.call(sizeables_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // Return the max x minus the min x
        return maxX - parentX;
    };
    /**
     * Calculates the height of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     * @param parentY The y position of the parent sizeable.
     */
    Sizeable.calculateHeight = function (sizeables, parentY) {
        var e_4, _a;
        // Find the maximum y positions of the sizeables
        var maxY = sizeables.get(0).getY() + sizeables.get(0).getHeight();
        try {
            for (var sizeables_4 = tslib_1.__values(sizeables), sizeables_4_1 = sizeables_4.next(); !sizeables_4_1.done; sizeables_4_1 = sizeables_4.next()) {
                var sizeable = sizeables_4_1.value;
                if (sizeable.getY() + sizeable.getHeight() > maxY) {
                    maxY = sizeable.getY() + sizeable.getHeight();
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (sizeables_4_1 && !sizeables_4_1.done && (_a = sizeables_4.return)) _a.call(sizeables_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // Return the max x minus the min x
        return maxY - parentY;
    };
    /**
     * Sets the x positions of sizeables based on the the computed x position of the node.
     * @param sizeables The sizeables to update.
     * @param parentX The x position of the parent sizeable.
     * @param x The new x position of the parent.
     */
    Sizeable.setSizeableXPositions = function (sizeables, parentX, x) {
        return sizeables.map(function (sizeable) {
            // Calculate the offset between the sizeable position and the node position
            var offset = sizeable.getX() - parentX;
            // Set the node x to the new position + the offset
            return sizeable.setX(x + offset);
        });
    };
    /**
     * Sets the y positions of sizeables based on the the computed y position of the node.
     * @param sizeables The sizeables to update.
     * @param parentY The x position of the parent sizeable.
     * @param y The new y position of the parent.
     */
    Sizeable.setSizeableYPositions = function (sizeables, parentY, y) {
        return sizeables.map(function (sizeable) {
            // Calculate the offset between the sizeable position and the node position
            var offset = sizeable.getY() - parentY;
            // Set the node y to the new position + the offset
            return sizeable.setY(y + offset);
        });
    };
    /**
     * Sets the widths of sizeables based on the the computed width of the node.
     * @param sizeables The sizeables to update.
     * @param parentX The x position of the parent sizeable.
     * @param parentWidth The width of the parent sizeable.
     * @param width The new width of the parent.
     */
    Sizeable.setSizeableWidths = function (sizeables, parentX, parentWidth, width) {
        return sizeables.map(function (sizeable) {
            // Calculate the ratio of the width of the sizeable to the node's width
            var widthRatio = sizeable.getWidth() / parentWidth;
            // Calculate the offset between the sizeable's position and the node's position
            var offset = sizeable.getX() - parentX;
            // Calculate the ratio of the offset to the actual width of the node
            var posRatio = offset / parentWidth;
            // Set the x position and width of the node
            return sizeable.setX(parentX + (posRatio * width)).setWidth(widthRatio * width);
        });
    };
    /**
     * Sets the heights of sizeables based on the the computed height of the node.
     * @param sizeables The sizeables to update.
     * @param parentY The y position of the parent sizeable.
     * @param parentHeight The height of the parent sizeable.
     * @param height The new height of the parent.
     */
    Sizeable.setSizeableHeights = function (sizeables, parentY, parentHeight, width) {
        return sizeables.map(function (sizeable) {
            // Calculate the ratio of the height of the sizeable to the node's height
            var heightRatio = sizeable.getHeight() / parentHeight;
            // Calculate the offset between the sizeable's position and the node's position
            var offset = sizeable.getY() - parentY;
            // Calculate the ratio of the offset to the actual height of the node
            var posRatio = offset / parentHeight;
            // Set the y position and height of the node
            return sizeable.setY(parentY + (posRatio * width)).setHeight(heightRatio * width);
        });
    };
    return Sizeable;
}());
export { Sizeable };
