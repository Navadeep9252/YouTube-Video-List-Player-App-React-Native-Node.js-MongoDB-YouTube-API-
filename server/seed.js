
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Sanny:navadeep2@cluster0.q579w4x.mongodb.net/youtube_app?retryWrites=true&w=majority'; // replace & include in code/README per assignment


const videoIds = [
  'dQw4w9WgXcQ', 
  'jNQXAC9IVRw', 
  'oHg5SJYRHA0', 
  'YQHsXMglC9A', 
  '9bZkp7q19f0', 
  'OPf0YbXqDm0', 
  'kJQP7kiw5Fk', 
  'CduA0TULnow', 
  'FlsCjmMhFmw', 
  'L_jWHffIx5E' 
];

const videoSchema = new mongoose.Schema({ videoId: String });
const Video = mongoose.model('Video', videoSchema);

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Video.deleteMany({});
    await Video.insertMany(videoIds.map(id => ({ videoId: id })));
    console.log('Seeded', videoIds.length, 'videos');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

run();
