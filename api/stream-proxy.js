const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const streamUrl = 'http://31.220.3.103:2095/play/live.php?mac=00:1A:79:E7:32:0C&stream=47798&extension=m3u8';
    const response = await axios.get(streamUrl, { responseType: 'stream' });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching stream:', error.message);
    res.status(500).json({ error: 'Failed to fetch stream' });
  }
};
