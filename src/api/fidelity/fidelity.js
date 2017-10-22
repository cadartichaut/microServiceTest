'use strict';

/* eslint-disable require-yield */

let Fidelity = require('../../model/fidelity');
let loyaltyStatus = require('./loyalityStatus');
/**
 * Hello
 * @param {Object} req the request
 * @param {Object} res the response
 * @returns {Object} earnPoints response
 */
function* earnPoints(req, res) {
    const userId = req.swagger.params.userId.raw;
    const value = req.body.price;
    const newTripCount = req.body.isTrip ? 1 : 0;

    Fidelity.findOne({'userId': userId}, function (err, fidelity) {
            if (err) {
                res.send(err);
            }

            if (fidelity) {
                Object.assign(fidelity, {
                    userId: userId,
                    points: loyaltyStatus.updatePointsByStatus(fidelity.loyaltyStatus, fidelity.points, parseInt(value)),
                    trips: fidelity.trips + newTripCount,
                    loyaltyStatus: loyaltyStatus.updateLoyaltyStatus(fidelity.loyaltyStatus, fidelity.trips + newTripCount)})

                .save((err, fid) => {
                    if (err) res.send(err);
                    res.json({message: 'Fidelity updated!', fid});
                });
            }

            else {
                let newFidelity = new Fidelity({
                    userId: userId,
                    points: value,
                    trips: newTripCount,
                    loyaltyStatus: loyaltyStatus.getNewLoyaltyStatus()
                });

                newFidelity.save((err, fid) => {
                    if (err) {
                        res.send(err)
                    }
                    res.json({message: 'Fidelity created!', fid});
                });
            }
        }
    );
}

function* checkProfile(req, res) {
    const userId = req.swagger.params.userId.raw;

    Fidelity.findOne({'userId': userId}, function (err, fidelity) {
        if (err) {
            res.send(err);
        }

        if (fidelity)
            res.json({
                userId: fidelity.userId,
                fidelityPoints : fidelity.points,
                tripCount: fidelity.trips,
                remainingTripsUntilNextStatus: loyaltyStatus.getRemainingTripsUntilNext(fidelity.loyaltyStatus, fidelity.trips),
                currentStatus: loyaltyStatus.getCurrentStatus(fidelity.loyaltyStatus)});
        else
            res.send(`User with id ${userId} doesn't exist`)
    })
}

module.exports = {earnPoints, checkProfile};
