'use strict';

const wrap = require('co-express');
const controller = require('./points');

module.exports = {
    earnPoints: wrap(controller.earnPoints),
    checkPoints: wrap(controller.checkPoints)
};
