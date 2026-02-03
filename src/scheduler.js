const cron = require("node-cron");
const runChecks = require("./checker");

cron.schedule("*/1 * * * *", () => {
  console.log("Running health checks...");
  runChecks();
});
