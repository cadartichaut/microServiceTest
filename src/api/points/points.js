'use strict';

/* eslint-disable require-yield */
let Fidelity = require('../../model/fidelity');

/**
 * Hello
 * @param {Object} req the request
 * @param {Object} res the response
 * @returns {Object} earnPoints response
 */
function* earnPoints(req, res) {
    const userId = req.swagger.params.userId.raw;
    const value = req.swagger.params.points.raw;

    Fidelity.findOne({'userId': userId}, function (err, fidelity) {
            if (err) {
                res.send(err);
            }
            if (fidelity) {
                Object.assign(fidelity, {userId: userId, points: fidelity.points + parseInt(value)}).save((err, fid) => {
                    if (err) res.send(err);
                    res.json({message: 'Fidelity updated!', fid});
                });
            }

            else {
                let newFidelity = new Fidelity({userId: userId, points: value});
                newFidelity.save((err, fidelity) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        return res.send({message: `User with id ${userId} earned ${value} points`}, fidelity);
                    }
                });
            }
        }
    );
}

function* checkPoints(req, res) {
    const userId = req.swagger.params.userId.raw;

    Fidelity.findOne({'userId': userId}, function (err, fidelity) {
        if (err) {
            res.send(err);
        }

        if (fidelity)
            res.json({message: `User with id ${userId} has ${fidelity.points} points`});
        else
            res.send(`User with id ${userId} doesn't exist`)
    })
}

module.exports = {earnPoints, checkPoints};
