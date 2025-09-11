
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const Video = require('./models/Video');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<USER>:<PASS>@cluster0.xxxxxx.mongodb.net/learnoverse?retryWrites=true&w=majority';
const YT_API_KEY = process.env.YT_API_KEY || '<YOUR_YT_API_KEY>';
const PORT = process.env.PORT || 5000;

async function start() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
  const app = express();
  app.use(cors());
  app.use(express.json());


  app.get('/api/videos', async (req, res) => {
    try {
      const docs = await Video.find({}).lean();
      const ids = docs.map(d => d.videoId).filter(Boolean);
      if (!ids.length) return res.json([]);

    
      const idsParam = ids.join(',');
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${idsParam}&key=${YT_API_KEY}`;
      const ytResp = await axios.get(url);
      const items = ytResp.data.items || [];

      
      const map = {};
      items.forEach(item => {
        map[item.id] = {
          id: item.id,
          title: item.snippet?.title || '',
          channelTitle: item.snippet?.channelTitle || '',
          thumbnails: item.snippet?.thumbnails || {},
          duration: parseISODuration(item.contentDetails?.duration || '')
        };
      });

      // respond in DB order (so UI order matches DB order)
      const enriched = ids.map(id => map[id] || { id, title: '', channelTitle: '', thumbnails: {}, duration: '' });
      res.json(enriched);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.listen(PORT, () => console.log(`Server listening ${PORT}`));
}
start().catch(err => {
  console.error('Startup error', err);
  process.exit(1);
});

function parseISODuration(iso) {
  
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '0:00';
  const hours = parseInt(m[1]||0, 10);
  const minutes = parseInt(m[2]||0, 10);
  const seconds = parseInt(m[3]||0, 10);
  const total = hours*3600 + minutes*60 + seconds;
  const hh = Math.floor(total/3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  if (hh > 0) return `${hh}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  return `${mm}:${String(ss).padStart(2,'0')}`;
}
