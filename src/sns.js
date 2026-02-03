const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
  // credentials automatically picked from AWS CLI config
});

const sns = new AWS.SNS();

module.exports = sns;
