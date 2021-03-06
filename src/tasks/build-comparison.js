const generateFolders = require('./generate-folders');
const collectTraceData = require('./collect-trace-data');
const extractImages = require('./extract-images');
const combine = require('./combine');

/**
 * @param {string[]} urls - list of urls to trace
 * @param {Object} options - cli options
 * @returns {Promise<Promise[]>} - set of conversion processes
 */
async function buildComparison(urls, options) {
  // TODO curry actions with options argument
  const task = await generateFolders(urls);
  return collectTraceData(task, options)
    .then(traceResults => extractImages(traceResults, options))
    .then(screenshotResults => combine(screenshotResults, options))
    .then(() => task);
}

module.exports = buildComparison;
