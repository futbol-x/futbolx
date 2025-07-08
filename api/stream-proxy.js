const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Get the stream ID from the URL path (e.g., /stream/175 -> id=175)
    const streamId = req.query.id || req.path.split('/').pop();
    if (!streamId) {
      return res.status(400).json({ error: 'Missing stream ID' });
    }

    // Map stream IDs to M3U8 URLs
    const streamMap = {
      '47798': 'http://31.220.3.103:2095/play/live.php?mac=00:1A:79:E7:32:0C&stream=47798&extension=m3u8',
      '175': 'https://epltv1.github.io/tsn1.m3u8',
      '17518': 'https://1rinij81ehes2uswech6drot7durixl2r0.rtgjmfvikmgtgrvkpbg.shop/hN9eS4rZ1wM7fC3vJ0aX8pG2yQ5bUi/720p.m3u8',
      'test': 'https://test-streams.mux.dev/test_001/stream.m3u8' // Public test stream
    };

    const streamUrl = streamMap[streamId];
    if (!streamUrl) {
      return res.status(404).json({ error: `No stream found for ID ${streamId}` });
    }

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
