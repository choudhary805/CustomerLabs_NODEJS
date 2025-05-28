const Destination = require('../models/Destination');
const Account = require('../models/Account');
const { validateDestinationData } = require('../utils/validators');

class DestinationService {
  async createDestination(destinationData) {
    // Validate input data
    const { error } = validateDestinationData(destinationData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Verify account exists
    const accountExists = await Account.findByAccountId(destinationData.account_id);
    if (!accountExists) {
      throw new Error('Account not found');
    }

    // Create new destination
    return await Destination.create(destinationData);
  }

  async getDestination(destinationId) {
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      throw new Error('Destination not found');
    }
    return destination;
  }

  async getAccountDestinations(accountId) {
    // Verify account exists
    const accountExists = await Account.findByAccountId(accountId);
    if (!accountExists) {
      throw new Error('Account not found');
    }

    return await Destination.findByAccountId(accountId);
  }

  async updateDestination(destinationId, updateData) {
    // Validate update data
    const { error } = validateDestinationData(updateData, true);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const result = await Destination.update(destinationId, updateData);
    if (result.changes === 0) {
      throw new Error('Destination not found');
    }
    return await this.getDestination(destinationId);
  }

  async deleteDestination(destinationId) {
    const result = await Destination.delete(destinationId);
    if (result.changes === 0) {
      throw new Error('Destination not found');
    }
    return { success: true };
  }
}

module.exports = new DestinationService();