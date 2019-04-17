"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("./immutable");
function convertToRaw(document) {
    return document.toRaw();
}
exports.convertToRaw = convertToRaw;
function convertFromRaw(rawDocument) {
    return immutable_1.Document.fromRaw(rawDocument);
}
exports.convertFromRaw = convertFromRaw;
