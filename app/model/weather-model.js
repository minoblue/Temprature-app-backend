const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
   country: {
       type: String,
       required: [true, 'country is required'],
       maxlength: 100
   },
   temprature: {
       type: Number,
       default: 0,
       required: [true, 'Temprature is required'],
   },
   user: {
       type: Schema.Types.ObjectId,
       ref: 'Users',
       required: [true, 'user is required']
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

module.exports = mongoose.model('country_weather', weatherSchema);
