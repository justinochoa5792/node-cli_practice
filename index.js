#!/usr/bin/env node

const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const path = require("path");

// EITHER
// ERR=== an error obj which means something is wrong
// or
// ERR === null which means everything is ok

// ****Option 1******
fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const allStats = Array(filenames.length).fill(null);

  for (let filename of filenames) {
    const index = filenames.indexOf(filename);

    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }

      allStats[index] = stats;

      const ready = allStats.every((stats) => {
        return stats;
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile());
        });
      }
    });
  }
});

// *****Option 2*****

// Method #2
const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }
});

// Method #1
const lstat = (filename) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filename, (err, stats) => {
      if (err) {
        reject(err);
      }

      resolve(stats);
    });
  });
};

// **** Option 3 ****
const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.blue(filenames[index]));
    }
  }
});
