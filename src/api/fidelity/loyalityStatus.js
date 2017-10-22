const StatusEnum = {
    BRONZE: 0,
    SILVER: 1,
    GOLD: 2,
    PLATINUM: 3,
    properties: {
        0: {name: "bronze", minTrips: 1, multiply: 1},
        1: {name: "silver", minTrips: 3, multiply: 3},
        2: {name: "gold", minTrips: 5, multiply: 5},
        3: {name: "platinum", minTrips: 10, multiply: 10}
    }
};

function updateLoyaltyStatus(currentLoyaltyStatus, trips){
    if(StatusEnum.properties[currentLoyaltyStatus + 1 ]!== undefined){
        if(StatusEnum.properties[currentLoyaltyStatus + 1].minTrips === trips)
            return currentLoyaltyStatus + 1;
    }
    return currentLoyaltyStatus;
}

function getNewLoyaltyStatus(){
    return StatusEnum.BRONZE;
}

function getRemainingTripsUntilNext(currentLoyaltyStatus, trips) {
    if (StatusEnum.properties[currentLoyaltyStatus + 1] !== undefined) {
        return StatusEnum.properties[currentLoyaltyStatus + 1].minTrips - trips;
    }
    return 'Already at maximum status !'
}

function getCurrentStatus(current){
    return StatusEnum.properties[current].name;
}

function updatePointsByStatus(currentLoyaltyStatus, currentPoints, pricePaid){
    return currentPoints + StatusEnum.properties[currentLoyaltyStatus].multiply * Math.round(pricePaid);
}

module.exports = {
    getCurrentStatus: getCurrentStatus,
    getRemainingTripsUntilNext: getRemainingTripsUntilNext,
    getNewLoyaltyStatus: getNewLoyaltyStatus,
    updateLoyaltyStatus: updateLoyaltyStatus,
    updatePointsByStatus : updatePointsByStatus
};