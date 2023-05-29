const crypto = require("crypto");

const isSafeEqual = (a, b) => {
    if (a === undefined && a === b) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    if (a === null && a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (String(a).length !== String(b).length) {
        return false;
    }
    return timingSafeEquals(a, b);
};

const timingSafeEquals = (a, b) => {
    if (typeof crypto.timingSafeEqual === 'function') {
        const buffA = Buffer.isBuffer(a) ? a : Buffer.from(a, 'utf8');
        const buffB = Buffer.isBuffer(b) ? a : Buffer.from(b, 'utf8');
        return crypto.timingSafeEqual(buffA, buffB);
    }
    return a === b;
};

module.exports = {
    isSafeEqual,
    timingSafeEquals,
};