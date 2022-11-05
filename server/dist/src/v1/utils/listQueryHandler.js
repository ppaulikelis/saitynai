"use strict";
exports.__esModule = true;
exports.handleListQuery = void 0;
function handleListQuery(page, count) {
    var maxTake = 50;
    var skip;
    var take;
    if (isNaN(count) || count < 1 || count > maxTake) {
        take = maxTake;
    }
    else {
        take = count;
    }
    if (isNaN(page) || page < 1) {
        skip = 0;
    }
    else {
        skip = (page - 1) * take;
    }
    return { skip: skip, take: take };
}
exports.handleListQuery = handleListQuery;
//# sourceMappingURL=listQueryHandler.js.map