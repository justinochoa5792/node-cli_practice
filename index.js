#!/usr/bin/env node

const fs = require("fs");

fs.readdir(process.cwd(), (err, filenames) => {
  // EITHER
  // ERR=== an error obj which means something is wrong
  // or
  // ERR === null which means everything is ok
  if (err) {
    console.log(err);
  }
  console.log(filenames);
});
