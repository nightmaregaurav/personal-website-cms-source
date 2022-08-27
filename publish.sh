#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');

const new_version = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf8' })).version;
const commit_message = "Automated: Release V${new_version}";


cp.execSync("mkdir -p destination_repo")
cp.execSync("cp -r target_repo/.git destination_repo/");
cp.execSync("cp -r build/* destination_repo");
cp.execSync("cp -r README.md destination_repo/");
cp.execSync("cp -r LICENSE destination_repo/");
cp.execSync("cd destination_repo && git add --all");
cp.execSync("cd destination_repo && git commit -m '${commit_message}'");
cp.execSync("cd destination_repo && git push");
