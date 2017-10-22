let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FidelitySchema = new Schema(
    {
        userId: {type: Number, required: true},
        points: {type: Number, required: true},
        trips: {type: Number, required: true},
        loyaltyStatus: {type: String, required: true},
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
FidelitySchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('fidelity', FidelitySchema);