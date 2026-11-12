// Runs on every Vercel deploy. Looks inside public/photos and public/music
// and writes public/site.json, so photo and song file names never matter.
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, 'public');
const list = (dir, re) => {
  try { return fs.readdirSync(path.join(pub, dir)).filter((f) => re.test(f)); }
  catch (e) { return []; }
};

const photos = list('photos', /\.(jpe?g|png|webp|gif|avif)$/i)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
const music = list('music', /\.(mp3|m4a|aac|ogg|wav)$/i).sort()[0] || null;

fs.writeFileSync(path.join(pub, 'site.json'), JSON.stringify({ photos, music }));
console.log('site.json written: ' + photos.length + ' photos, music: ' + (music || 'none'));
