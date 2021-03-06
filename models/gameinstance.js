var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const {DateTime} = require("luxon");

var GameInstanceSchema = new Schema(
    {
        game: { type: Schema.Types.ObjectId, ref: 'Game', required: true},
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
        due_back: {type: Date, default: Date.now}
    }
);

GameInstanceSchema
.virtual('url')
.get( function () {
    return '/catalog/gameinstance/' + this._id;
});

GameInstanceSchema
.virtual('due_back_formatted')
.get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});


module.exports = mongoose.model('GameInstance', GameInstanceSchema);