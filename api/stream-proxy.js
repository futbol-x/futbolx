const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const streamUrl = 'https://epltv1.github.io/tsn1.m3u8';
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
