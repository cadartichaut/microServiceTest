'use strict';

/* eslint-disable require-yield */

/**
 * Hello
 * @param {Object} req the request
 * @param {Object} res the response
 * @returns {Object} hello response
 */
function* earnPoints(req, res) {
  return res.send({
      lol: `User with id ${req.swagger.params.userId.raw} earned ${req.swagger.params.points.raw} points`
  });
}

module.exports = { earnPoints };
