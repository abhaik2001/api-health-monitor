const axios = require("axios");
const store = require("./store");
const logger = require("./logger");

const sns = require("./sns");

const MAX_RETRIES = 3;
const TIMEOUT_MS = 3000;

const TOPIC_ARN = "arn:aws:sns:us-east-1:968062515441:api-health-alerts";

async function sendAlert(endpoint, from, to) {
  const message = `
API Health Alert 🚨

URL: ${endpoint.url}
Previous State: ${from}
Current State: ${to}
Time: ${new Date().toISOString()}
`;

  await sns
    .publish({
      TopicArn: TOPIC_ARN,
      Subject: `API Health Change: ${to}`,
      Message: message,
    })
    .promise();
}

async function checkOnce(endpoint) {
  const response = await axios.get(endpoint.url, {
    timeout: TIMEOUT_MS,
  });

  return response.status === endpoint.expectedStatus ? "HEALTHY" : "UNHEALTHY";
}

async function checkHealthWithRetry(endpoint) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      logger.info("Health check attempt", {
        url: endpoint.url,
        attempt,
      });

      return await checkOnce(endpoint);
    } catch (err) {
      logger.warn("Health check failed", {
        url: endpoint.url,
        attempt,
        error: err.message,
      });

      if (attempt === MAX_RETRIES) {
        return "UNHEALTHY";
      }
    }
  }
}

async function runChecks() {
  const endpoints = await store.getAll();

  for (const endpoint of endpoints) {
    const previousState = endpoint.lastState;
    const newState = await checkHealthWithRetry(endpoint);

    if (previousState !== newState) {
      logger.warn("Health state changed", {
        url: endpoint.url,
        from: previousState,
        to: newState,
      });

      await sendAlert(endpoint, previousState, newState);
      await store.update(endpoint.id, { lastState: newState });
    } else {
      logger.info("Health state unchanged", {
        url: endpoint.url,
        state: newState,
      });
    }
  }
}

module.exports = runChecks;
