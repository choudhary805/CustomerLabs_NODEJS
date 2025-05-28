const Account = require('../models/Account');
const Destination = require('../models/Destination');
const axios = require('axios');

class DataHandlerService {
  async processIncomingData(token, data) {
    // Validate token exists
    if (!token) {
      throw new Error('Un Authenticate');
    }

    // Get account by token
    const account = await Account.findByToken(token);
    if (!account) {
      throw new Error('Un Authenticate');
    }

    // Get all destinations for account
    const destinations = await Destination.findByAccountId(account.account_id);

    // Forward data to all destinations
    const forwardingResults = await Promise.all(
      destinations.map(destination => this.forwardToDestination(destination, data))
    );

    return {
      success: true,
      forwardedTo: forwardingResults.filter(r => r.success).length,
      totalDestinations: destinations.length
    };
  }

  async forwardToDestination(destination, data) {
    try {
      const config = {
        url: destination.url,
        method: destination.http_method.toLowerCase(),
        headers: destination.headers,
        timeout: 5000
      };

      // Handle different HTTP methods
      if (config.method === 'get') {
        config.params = data;
      } else {
        config.data = data;
      }

      await axios(config);
      return { success: true, destination: destination.url };
    } catch (error) {
      console.error(`Forwarding failed to ${destination.url}:`, error.message);
      return { 
        success: false, 
        destination: destination.url,
        error: error.message 
      };
    }
  }
}

module.exports = new DataHandlerService();