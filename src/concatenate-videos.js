const ffmpeg = require('fluent-ffmpeg');
const ora = require('ora');

function concatenateVideos(firstVideo, secondVideo) {
  const spinner = ora(`Concatenating videos: ${firstVideo} && ${secondVideo}`).start();

  const begin = Date.now();

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(firstVideo)
      .input(secondVideo)
      .complexFilter(['hstack'])
      .on('progress', (progress) => {
        spinner.info(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on('error', (err) => {
        spinner.fail(`video merging is failed with: ${err.message}`);
        reject(err);
      })
      .on('end', () => {
        spinner.succeed(`merged output.mp4 is created in ${(Date.now() - begin)}ms`);
        spinner.stop();
        resolve();
      })
      .save('output.mp4');
  });
}
module.exports = concatenateVideos;