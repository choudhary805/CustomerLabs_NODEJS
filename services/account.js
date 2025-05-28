const Account = require('../models/Account');
const { validateAccountData } = require('../utils/validators');

class AccountService {
  async createAccount(accountData) {
    // Validate input data
    const { error } = validateAccountData(accountData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Check if email already exists
    const existingAccount = await Account.findByEmail(accountData.email);
    if (existingAccount) {
      throw new Error('Email already in use');
    }

    // Create new account
    return await Account.create(accountData);
  }

  async getAccount(accountId) {
    const account = await Account.findByAccountId(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  async updateAccount(accountId, updateData) {
    // Validate update data
    const { error } = validateAccountData(updateData, true);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const result = await Account.update(accountId, updateData);
    if (result.changes === 0) {
      throw new Error('Account not found');
    }
    return await this.getAccount(accountId);
  }

  async deleteAccount(accountId) {
    const result = await Account.delete(accountId);
    if (result.changes === 0) {
      throw new Error('Account not found');
    }
    return { success: true };
  }

  async getAccountByToken(token) {
    const account = await Account.findByToken(token);
    if (!account) {
      throw new Error('Invalid token');
    }
    return account;
  }
}

module.exports = new AccountService();