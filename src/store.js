const dynamoDb = require("./dynamodb");

const TABLE_NAME = "ApiEndpoints";


module.exports = {
  async add(endpoint) {
    await dynamoDb.put({
      TableName: TABLE_NAME,
      Item: endpoint
    }).promise();
  },

  async getAll() {
    const result = await dynamoDb.scan({
      TableName: TABLE_NAME
    }).promise();

    return result.Items || [];
  },

  async update(id, updates) {
    const updateExp = [];
    const expValues = {};

    for (const key in updates) {
      updateExp.push(`${key} = :${key}`);
      expValues[`:${key}`] = updates[key];
    }

    await dynamoDb.update({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "SET " + updateExp.join(", "),
      ExpressionAttributeValues: expValues
    }).promise();
  }
};
