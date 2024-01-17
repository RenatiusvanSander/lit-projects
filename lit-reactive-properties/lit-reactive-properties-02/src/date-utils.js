"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localDateFromUTC = exports.isSameDate = void 0;
/**
 * Returns true if the two dates represent the same
 * year, month, and day.
 */
function isSameDate(date1, date2) {
    return (date1 === null || date1 === void 0 ? void 0 : date1.toLocaleDateString()) === (date2 === null || date2 === void 0 ? void 0 : date2.toLocaleDateString());
}
exports.isSameDate = isSameDate;
/**
 * Returns a Date object that displays the correct year, month, and day
 * in the local time zone, given a UTC Date object as returned by input type="date".
 */
function localDateFromUTC(utcDate) {
    return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
}
exports.localDateFromUTC = localDateFromUTC;
