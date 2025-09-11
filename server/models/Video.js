const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true }
});
module.exports = mongoose.model('Video', schema);
