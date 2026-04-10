const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    reel: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Reel',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('like', likesSchema);