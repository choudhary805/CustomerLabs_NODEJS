const { v4: uuidv4 } = require('uuid');

const generateSecretToken = () => {
  return uuidv4().replace(/-/g, '');
};

module.exports = {
  generateSecretToken
};