'use strict';

const wrap = require('co-express');
const controller = require('./fidelity');

module.exports = {
    fidelitySpend: wrap(controller.earnPoints),
    checkProfile: wrap(controller.checkProfile)
};
