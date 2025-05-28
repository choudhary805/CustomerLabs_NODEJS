const dataHandlerService = require('../services/dataHandler');

exports.handleIncomingData = async (req, res) => {
  try {
    // Validate content type
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({ error: 'Invalid Data' });
    }

    // Process data
    const token = req.headers['cl-x-token'];
    const result = await dataHandlerService.processIncomingData(token, req.body);
    
    res.json(result);
  } catch (error) {
    switch (error.message) {
      case 'Un Authenticate':
        res.status(401).json({ error: error.message });
        break;
      case 'Invalid Data':
        res.status(400).json({ error: error.message });
        break;
      default:
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};